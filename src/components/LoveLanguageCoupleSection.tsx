'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { IdiomaAmorResult, IdiomaAmor } from '@/types/idiomaAmorTypes';
import { IDIOMA_AMOR_META } from '@/lib/idiomaAmorData';
import { getLoveLanguageCoupleCombination } from '@/lib/loveLanguageCombinationsData';
import { LoveLanguageCoupleContent } from '@/types/loveLanguageCoupleTypes';
import {
  Heart,
  Users,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Target,
  FileSpreadsheet,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

interface LoveLanguageCoupleSectionProps {
  userPrimaryLanguage?: string;
  className?: string;
}

export default function LoveLanguageCoupleSection({
  userPrimaryLanguage,
  className = '',
}: LoveLanguageCoupleSectionProps) {
  const { user, getSpouse } = useAuth();
  const [spouseResult, setSpouseResult] = useState<IdiomaAmorResult | null>(null);
  const [userResult, setUserResult] = useState<IdiomaAmorResult | null>(null);
  const [combination, setCombination] = useState<LoveLanguageCoupleContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const spouse = user ? getSpouse(user.id) || getSpouse(user.user_id) : null;
  const spouseFirstName = spouse ? spouse.nome.trim().split(' ')[0] : '';

  useEffect(() => {
    let isMounted = true;

    async function loadResults() {
      if (!user) {
        if (isMounted) setIsLoading(false);
        return;
      }

      const activeSpouse = getSpouse(user.id) || getSpouse(user.user_id);
      if (!activeSpouse) {
        if (isMounted) {
          setSpouseResult(null);
          setCombination(null);
          setIsLoading(false);
        }
        return;
      }

      const authUserId = user.user_id || user.id;
      const spouseAuthId = activeSpouse.user_id || activeSpouse.id;
      const spouseProfId = activeSpouse.id;

      // 1. Determina o idioma primário do usuário atual
      let myPrimary = userPrimaryLanguage;
      if (!myPrimary) {
        const myStored =
          localStorage.getItem(`psi_idioma_amor_result_${user.id}`) ||
          localStorage.getItem(`psi_idioma_amor_result_${authUserId}`);
        if (myStored) {
          try {
            const parsed: IdiomaAmorResult = JSON.parse(myStored);
            if (isMounted) setUserResult(parsed);
            myPrimary = parsed.idioma_primario;
          } catch {}
        }
      }

      const supabase = createClient();

      if (!myPrimary && supabase) {
        try {
          const { data: dbUserRes } = await supabase
            .from('quiz_love_language_results')
            .select('*')
            .or(`user_id.eq.${authUserId},user_id.eq.${user.id}`)
            .order('calculado_em', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (dbUserRes) {
            myPrimary = dbUserRes.idioma_primario as IdiomaAmor;
          }
        } catch (err) {
          console.warn('Erro ao carregar idioma do usuário:', err);
        }
      }

      // 2. Busca resultado do cônjuge: Supabase -> LocalStorage
      let foundSpouse: IdiomaAmorResult | null = null;

      if (supabase) {
        try {
          const spouseIds = [spouseAuthId, spouseProfId].filter(Boolean);
          const { data: dbSpouse, error: dbErr } = await supabase
            .from('quiz_love_language_results')
            .select('*')
            .in('user_id', spouseIds)
            .order('calculado_em', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (dbSpouse) {
            foundSpouse = {
              id: dbSpouse.id,
              user_id: dbSpouse.user_id,
              idioma_primario: dbSpouse.idioma_primario as IdiomaAmor,
              idioma_secundario: dbSpouse.idioma_secundario as IdiomaAmor,
              pontuacoes: {
                palavras: dbSpouse.palavras_pct || 0,
                tempo: dbSpouse.tempo_pct || 0,
                presentes: dbSpouse.presentes_pct || 0,
                servico: dbSpouse.servico_pct || 0,
                toque: dbSpouse.toque_pct || 0,
              },
              percentuais: {
                palavras: dbSpouse.palavras_pct || 0,
                tempo: dbSpouse.tempo_pct || 0,
                presentes: dbSpouse.presentes_pct || 0,
                servico: dbSpouse.servico_pct || 0,
                toque: dbSpouse.toque_pct || 0,
              },
              distribuicao_ordenada: [],
              frase_resumo: '',
              calculado_em: dbSpouse.calculado_em,
            };
          }
        } catch (err) {
          console.warn('Erro ao buscar resultado do cônjuge no Supabase:', err);
        }
      }

      // Fallback para LocalStorage se não encontrou no Supabase
      if (!foundSpouse) {
        const storedSpouseResult =
          localStorage.getItem(`psi_idioma_amor_result_${spouseProfId}`) ||
          localStorage.getItem(`psi_idioma_amor_result_${spouseAuthId}`);

        if (storedSpouseResult) {
          try {
            foundSpouse = JSON.parse(storedSpouseResult);
          } catch {}
        }
      }

      if (isMounted) {
        setSpouseResult(foundSpouse);

        if (foundSpouse && myPrimary) {
          const combo = getLoveLanguageCoupleCombination(
            myPrimary,
            foundSpouse.idioma_primario,
            activeSpouse.nome
          );
          setCombination(combo);
        } else {
          setCombination(null);
        }
        setIsLoading(false);
      }
    }

    loadResults();

    return () => {
      isMounted = false;
    };
  }, [user, getSpouse, userPrimaryLanguage]);

  // Se não tem cônjuge vinculado: não exibe nada
  if (!spouse) {
    return null;
  }

  // Se cônjuge ainda não respondeu o teste
  if (!spouseResult || !combination) {
    return (
      <div className={`p-6 sm:p-8 rounded-3xl bg-pink-50/60 border border-pink-200 text-center space-y-3 ${className}`}>
        <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-pink-200 flex items-center justify-center text-pink-600 mx-auto">
          <Clock className="w-6 h-6 animate-pulse" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-warm-900 font-heading">
          Aguardando {spouseFirstName}
        </h3>
        <p className="text-xs sm:text-sm text-warm-700 max-w-md mx-auto leading-relaxed">
          Esperando <strong>{spouseFirstName}</strong> responder o quiz <em>Seu Idioma do Amor</em> para mostrar aqui como vocês se completam.
        </p>
      </div>
    );
  }

  // Helper para renderizar tabelas simples em markdown
  const renderMarkdownTable = (markdown: string) => {
    const lines = markdown.split('\n').filter((l) => l.includes('|'));
    if (lines.length < 2) {
      return <p className="whitespace-pre-line text-xs leading-relaxed">{markdown}</p>;
    }

    const headers = lines[0]
      .split('|')
      .map((h) => h.trim().replace(/\*\*/g, ''))
      .filter((h) => h.length > 0);

    const rows = lines.slice(2).map((row) =>
      row
        .split('|')
        .map((cell) => cell.trim().replace(/\*\*/g, ''))
        .filter((cell) => cell.length > 0)
    );

    return (
      <div className="overflow-x-auto rounded-2xl border border-warm-200 bg-white">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-pink-50/80 border-b border-warm-200 text-warm-900 font-bold">
              {headers.map((h, i) => (
                <th key={i} className="p-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-100">
            {rows.map((r, ri) => (
              <tr key={ri} className="hover:bg-rose-50/40 transition-colors">
                {r.map((c, ci) => (
                  <td key={ci} className={`p-3 text-warm-800 ${ci === 0 ? 'font-bold text-warm-900' : ''}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Helper para renderizar listas e parágrafos formatados
  const renderFormattedSection = (text: string) => {
    // Remove cabeçalhos duplicados do texto original se houver
    const cleanText = text
      .replace(/^(REFLEXÃO RELACIONAL|AÇÕES CONCRETAS PARA O CASAL|DESAFIO PRINCIPAL|PONTO FORTE DO CASAL|MAPA DE COMPATIBILIDADE|[A-ZÀ-Ú\s]+)(\*{2})?\s*\n*/i, '')
      .replace(/\*\*Nível:\*\*\s*[^\n]+\n*/i, '')
      .trim();

    const paragraphs = cleanText.split('\n\n');

    return (
      <div className="space-y-3 text-xs sm:text-sm text-warm-800 leading-relaxed">
        {paragraphs.map((p, idx) => {
          const lines = p.split('\n');

          // Se for lista com ✓
          if (lines.some((l) => l.trim().startsWith('✓'))) {
            return (
              <div key={idx} className="space-y-2">
                {lines.map((l, li) => {
                  const item = l.replace(/^✓\s*/, '').trim();
                  if (!item) return null;
                  return (
                    <div key={li} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-emerald-950">{item}</span>
                    </div>
                  );
                })}
              </div>
            );
          }

          // Se for lista com ✗
          if (lines.some((l) => l.trim().startsWith('✗') || l.trim().startsWith('- '))) {
            return (
              <div key={idx} className="space-y-2">
                {lines.map((l, li) => {
                  const isCheck = l.trim().startsWith('✗');
                  const item = l.replace(/^[✗\-]\s*/, '').replace(/\*\*/g, '').trim();
                  if (!item) return null;
                  return (
                    <div
                      key={li}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${
                        isCheck
                          ? 'bg-rose-50/70 border-rose-200 text-rose-950 font-semibold'
                          : 'bg-warm-50/60 border-warm-200 text-warm-800 ml-4 font-normal'
                      }`}
                    >
                      {isCheck && <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            );
          }

          // Se for bloco de Ações concretas
          if (p.includes('**AÇÃO') || p.includes('AÇÃO ')) {
            return (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-pink-200 shadow-2xs space-y-2">
                {lines.map((l, li) => {
                  const lineClean = l.replace(/\*\*/g, '').trim();
                  const isActionTitle = lineClean.startsWith('AÇÃO') || lineClean.startsWith('Ação');
                  if (!lineClean) return null;
                  return (
                    <p
                      key={li}
                      className={
                        isActionTitle
                          ? 'font-bold text-pink-700 text-sm flex items-center gap-1.5'
                          : 'text-xs text-warm-800'
                      }
                    >
                      {isActionTitle && <Target className="w-4 h-4 text-pink-600" />}
                      {lineClean}
                    </p>
                  );
                })}
              </div>
            );
          }

          // Parágrafo comum com negrito parseado
          return (
            <p key={idx} className="whitespace-pre-line leading-relaxed font-medium">
              {p.replace(/\*\*/g, '')}
            </p>
          );
        })}
      </div>
    );
  };

  // Badge de compatibilidade estilizado
  const getCompatibilityBadge = (nivel: string) => {
    const isMuitoAlta = nivel.toLowerCase().includes('muito alta');
    const isAlta = nivel.toLowerCase().includes('alta') && !isMuitoAlta;

    let badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
    if (isMuitoAlta) {
      badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
    } else if (isAlta) {
      badgeColor = 'bg-pink-100 text-pink-900 border-pink-300';
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs ${badgeColor}`}>
        <Sparkles className="w-3.5 h-3.5" />
        <span>{nivel.replace(/\*\*/g, '').replace('Nível:', '').trim()}</span>
      </span>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* ============================================================ */}
      {/* CARTÃO PRINCIPAL DA DINÂMICA DO CASAL */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft relative overflow-hidden space-y-8">
        {/* Topo da Seção */}
        <div className="border-b border-brand-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-[10px] font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-pink-600" />
              <span>Dinâmica Conjugal & Compatibilidade</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
              Você e {spouseFirstName}
            </h2>
            <p className="text-xs text-warm-700">
              Análise personalizada da combinação entre a sua linguagem primária e a de {spouseFirstName}.
            </p>
          </div>

          <div className="shrink-0 self-start sm:self-auto">
            {getCompatibilityBadge(combination.nivel_compatibilidade)}
          </div>
        </div>

        {/* 1. Nível e Mapa de Compatibilidade */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-pink-50/80 via-rose-50/50 to-purple-50/80 border border-pink-200 space-y-3">
          <div className="flex items-center gap-2 text-pink-700 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Mapa de Compatibilidade</span>
          </div>
          {renderFormattedSection(combination.mapa_compatibilidade)}
        </div>

        {/* 2. Ponto Forte do Casal */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-warm-200">
            <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <h3 className="text-base sm:text-lg font-bold text-warm-900 font-heading">
              Pontos Fortes do Casal
            </h3>
          </div>
          {renderFormattedSection(combination.ponto_forte)}
        </div>

        {/* 3. Desafio Principal */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-warm-200">
            <div className="w-7 h-7 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
              ✗
            </div>
            <h3 className="text-base sm:text-lg font-bold text-warm-900 font-heading">
              Desafio Principal & Pontos de Atenção
            </h3>
          </div>
          {renderFormattedSection(combination.desafio_principal)}
        </div>

        {/* 4. Reflexão Relacional */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-warm-200">
            <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
              ?
            </div>
            <h3 className="text-base sm:text-lg font-bold text-warm-900 font-heading">
              Reflexão Relacional para o Casal
            </h3>
          </div>
          <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-3">
            {renderFormattedSection(combination.reflexao_relacional)}
          </div>
        </div>

        {/* 5. Ações Concretas para o Casal */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-warm-200">
            <div className="w-7 h-7 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs">
              ⚡
            </div>
            <h3 className="text-base sm:text-lg font-bold text-warm-900 font-heading">
              Ações Concretas para o Casal
            </h3>
          </div>
          <div className="space-y-3">
            {renderFormattedSection(combination.acoes_concretas)}
          </div>
        </div>

        {/* 6. Resumo */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-warm-200">
            <div className="w-7 h-7 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
              📋
            </div>
            <h3 className="text-base sm:text-lg font-bold text-warm-900 font-heading">
              Resumo desta Combinação
            </h3>
          </div>
          {renderMarkdownTable(combination.resumo)}
        </div>
      </div>
    </div>
  );
}
