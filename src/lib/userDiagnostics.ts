import { Profile, UserDiagnostic } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import { IDIOMA_AMOR_META } from '@/lib/idiomaAmorData';
import { TEMPERAMENTO_META } from '@/lib/temperamentoData';
import { IdiomaAmorResult, IdiomaAmor } from '@/types/idiomaAmorTypes';
import { TemperamentoResult, Temperamento } from '@/types/temperamentoTypes';

export interface UserQuizProgress {
  answeredIds: string[];
  diagnostics: UserDiagnostic[];
  idiomaResult: IdiomaAmorResult | null;
  temperamentoResult: TemperamentoResult | null;
}

export async function fetchUserQuizProgress(user: Profile | null): Promise<UserQuizProgress> {
  if (!user) {
    return {
      answeredIds: [],
      diagnostics: [],
      idiomaResult: null,
      temperamentoResult: null,
    };
  }

  const authUserId = user.user_id || user.id;
  const profId = user.id;
  const validIds = Array.from(new Set([authUserId, profId])).filter(Boolean);

  let fetchedIdiomaResult: IdiomaAmorResult | null = null;
  let fetchedTempResult: TemperamentoResult | null = null;
  let fetchedDbDiagnostics: UserDiagnostic[] = [];

  const supabase = createClient();

  if (supabase && validIds.length > 0) {
    try {
      // 1. Busca Teste do Idioma do Amor do Supabase
      const { data: dbIdioma } = await supabase
        .from('quiz_love_language_results')
        .select('*')
        .in('user_id', validIds)
        .order('calculado_em', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (dbIdioma) {
        const prim = (dbIdioma.idioma_primario || 'palavras') as IdiomaAmor;
        const sec = (dbIdioma.idioma_secundario || 'tempo') as IdiomaAmor;
        const pcts = {
          palavras: dbIdioma.palavras_pct ?? 0,
          tempo: dbIdioma.tempo_pct ?? 0,
          presentes: dbIdioma.presentes_pct ?? 0,
          servico: dbIdioma.servico_pct ?? 0,
          toque: dbIdioma.toque_pct ?? 0,
        };

        const distribuicao = (Object.keys(pcts) as IdiomaAmor[])
          .map((key) => ({
            idioma: key,
            label: IDIOMA_AMOR_META[key]?.label || key,
            emoji: IDIOMA_AMOR_META[key]?.emoji || '❤️',
            pontos: Math.round((pcts[key] * 20) / 100),
            percentual: pcts[key],
          }))
          .sort((a, b) => b.percentual - a.percentual);

        const primMeta = IDIOMA_AMOR_META[prim];
        const secMeta = IDIOMA_AMOR_META[sec];

        fetchedIdiomaResult = {
          id: dbIdioma.id,
          user_id: dbIdioma.user_id,
          idioma_primario: prim,
          idioma_secundario: sec,
          percentuais: pcts,
          pontuacoes: {
            palavras: Math.round((pcts.palavras * 20) / 100),
            tempo: Math.round((pcts.tempo * 20) / 100),
            presentes: Math.round((pcts.presentes * 20) / 100),
            servico: Math.round((pcts.servico * 20) / 100),
            toque: Math.round((pcts.toque * 20) / 100),
          },
          distribuicao_ordenada: distribuicao,
          frase_resumo: `Idioma Primário: ${primMeta?.label || prim} (${pcts[prim]}%) e Secundário: ${secMeta?.label || sec} (${pcts[sec]}%)`,
          calculado_em: dbIdioma.calculado_em,
        };
      }

      // 2. Busca Teste de Temperamento do Supabase
      const { data: dbTemp } = await supabase
        .from('quiz_temperamento_results')
        .select('*')
        .in('user_id', validIds)
        .order('calculado_em', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (dbTemp) {
        const prim = (dbTemp.temperamento_primario || 'sanguineo') as Temperamento;
        const sec = (dbTemp.temperamento_secundario || 'colerico') as Temperamento;
        fetchedTempResult = {
          id: dbTemp.id,
          user_id: dbTemp.user_id,
          temperamento_primario: prim,
          intensidade_primario: dbTemp.intensidade_primario || 'Forte',
          temperamento_secundario: sec,
          intensidade_secundario: dbTemp.intensidade_secundario || 'Moderado',
          pontuacoes: {
            colerico: dbTemp.colerico_pontos || 0,
            sanguineo: dbTemp.sanguineo_pontos || 0,
            melancolico: dbTemp.melancolico_pontos || 0,
            fleumatico: dbTemp.fleumatico_pontos || 0,
          },
          frase_resumo: `Temperamento Predominante: ${TEMPERAMENTO_META[prim]?.label || prim}`,
          calculado_em: dbTemp.calculado_em,
        };
      }

      // 3. Busca outros diagnósticos genéricos cadastrados
      const { data: dbDiags } = await supabase
        .from('user_diagnostics')
        .select('*')
        .in('user_id', validIds)
        .order('gerado_em', { ascending: false });

      if (dbDiags && dbDiags.length > 0) {
        fetchedDbDiagnostics = dbDiags as UserDiagnostic[];
      }
    } catch (err) {
      console.warn('Erro ao carregar dados de diagnósticos do Supabase:', err);
    }
  }

  // Fallbacks locais para localStorage caso offline ou recém-salvo
  if (!fetchedIdiomaResult) {
    const storedIdioma =
      localStorage.getItem(`psi_idioma_amor_result_${profId}`) ||
      localStorage.getItem(`psi_idioma_amor_result_${authUserId}`);
    if (storedIdioma) {
      try {
        fetchedIdiomaResult = JSON.parse(storedIdioma);
      } catch {}
    }
  }

  if (!fetchedTempResult) {
    const storedTemp =
      localStorage.getItem(`psi_temperamento_result_${profId}`) ||
      localStorage.getItem(`psi_temperamento_result_${authUserId}`);
    if (storedTemp) {
      try {
        fetchedTempResult = JSON.parse(storedTemp);
      } catch {}
    }
  }

  if (fetchedDbDiagnostics.length === 0) {
    const storedDiags =
      localStorage.getItem(`psi_diagnostics_${profId}`) ||
      localStorage.getItem(`psi_diagnostics_${authUserId}`);
    if (storedDiags) {
      try {
        fetchedDbDiagnostics = JSON.parse(storedDiags);
      } catch {}
    }
  }

  // Constrói diagnósticos virtuais consolidados
  const allDiagnostics: UserDiagnostic[] = [...fetchedDbDiagnostics];

  if (fetchedIdiomaResult && !allDiagnostics.some((d) => d.quiz_id === 'quiz-idioma-amor')) {
    const primMeta = IDIOMA_AMOR_META[fetchedIdiomaResult.idioma_primario] || { label: 'Idioma do Amor' };
    const secMeta = IDIOMA_AMOR_META[fetchedIdiomaResult.idioma_secundario] || { label: 'Secundário' };
    const primPct = fetchedIdiomaResult.percentuais?.[fetchedIdiomaResult.idioma_primario] ?? 0;
    const secPct = fetchedIdiomaResult.percentuais?.[fetchedIdiomaResult.idioma_secundario] ?? 0;

    allDiagnostics.push({
      id: fetchedIdiomaResult.id || `idioma-result-${authUserId}`,
      user_id: authUserId,
      quiz_id: 'quiz-idioma-amor',
      pontuacao_total: primPct,
      titulo_resultado: `${primMeta.label} (${primPct}%)`,
      resultado_texto: `Idioma Primário: ${primMeta.label} (${primPct}%)\nIdioma Secundário: ${secMeta.label} (${secPct}%)`,
      gerado_em: fetchedIdiomaResult.calculado_em || new Date().toISOString(),
      quiz_titulo: 'Seu Idioma do Amor',
    });
  }

  if (fetchedTempResult && !allDiagnostics.some((d) => d.quiz_id === 'quiz-temperamento')) {
    const primMeta = TEMPERAMENTO_META[fetchedTempResult.temperamento_primario] || { label: 'Temperamento' };
    const secMeta = TEMPERAMENTO_META[fetchedTempResult.temperamento_secundario] || { label: 'Secundário' };
    const primPts = fetchedTempResult.pontuacoes?.[fetchedTempResult.temperamento_primario] ?? 0;
    const secPts = fetchedTempResult.pontuacoes?.[fetchedTempResult.temperamento_secundario] ?? 0;

    allDiagnostics.push({
      id: fetchedTempResult.id || `diag-temp-${authUserId}`,
      user_id: authUserId,
      quiz_id: 'quiz-temperamento',
      pontuacao_total: primPts,
      titulo_resultado: fetchedTempResult.frase_resumo || `Temperamento: ${primMeta.label}`,
      resultado_texto: `Temperamento Primário: ${primMeta.label} (${primPts} pts) — ${fetchedTempResult.intensidade_primario}\nTemperamento Secundário: ${secMeta.label} (${secPts} pts) — ${fetchedTempResult.intensidade_secundario}`,
      gerado_em: fetchedTempResult.calculado_em || new Date().toISOString(),
      quiz_titulo: 'Teste de Temperamento',
    });
  }

  // Ordena diagnósticos por data decrescente
  allDiagnostics.sort((a, b) => new Date(b.gerado_em).getTime() - new Date(a.gerado_em).getTime());

  // Constrói lista de IDs respondidos
  const answeredIdsSet = new Set<string>();
  if (fetchedIdiomaResult) answeredIdsSet.add('quiz-idioma-amor');
  if (fetchedTempResult) answeredIdsSet.add('quiz-temperamento');
  allDiagnostics.forEach((d) => {
    if (d.quiz_id) answeredIdsSet.add(d.quiz_id);
  });

  const answeredIds = Array.from(answeredIdsSet);

  // Sincroniza cache no localStorage para persistência local consistente
  try {
    if (fetchedIdiomaResult) {
      localStorage.setItem(`psi_idioma_amor_result_${profId}`, JSON.stringify(fetchedIdiomaResult));
      localStorage.setItem(`psi_idioma_amor_result_${authUserId}`, JSON.stringify(fetchedIdiomaResult));
    }
    if (fetchedTempResult) {
      localStorage.setItem(`psi_temperamento_result_${profId}`, JSON.stringify(fetchedTempResult));
      localStorage.setItem(`psi_temperamento_result_${authUserId}`, JSON.stringify(fetchedTempResult));
    }
    localStorage.setItem(`psi_diagnostics_${profId}`, JSON.stringify(allDiagnostics));
    localStorage.setItem(`psi_diagnostics_${authUserId}`, JSON.stringify(allDiagnostics));
  } catch (err) {
    console.warn('Erro ao gravar localStorage:', err);
  }

  return {
    answeredIds,
    diagnostics: allDiagnostics,
    idiomaResult: fetchedIdiomaResult,
    temperamentoResult: fetchedTempResult,
  };
}
