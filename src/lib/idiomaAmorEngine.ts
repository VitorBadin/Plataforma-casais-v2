// ========================================================
// MOTOR DE CÁLCULO — QUIZ "SEU IDIOMA DO AMOR"
// Calcula pontuações, percentuais, primário e secundário
// ========================================================

import {
  IdiomaAmor,
  OpcaoABCDE,
  IdiomaAmorResult,
} from '@/types/idiomaAmorTypes';
import {
  IDIOMA_AMOR_META,
  OPCAO_PARA_IDIOMA,
  TOTAL_PERGUNTAS_IDIOMA_AMOR,
} from './idiomaAmorData';

/**
 * Ordem de prioridade fixa para desempate entre idiomas.
 * Critério documentado:
 * Palavras de Afirmação > Tempo de Qualidade > Atos de Serviço > Toque Físico > Receber Presentes
 */
export const PRIORIDADE_DESEMPATE_IDIOMA_AMOR: IdiomaAmor[] = [
  'palavras',
  'tempo',
  'servico',
  'toque',
  'presentes',
];

/**
 * Ordena os 5 idiomas por pontuação/percentual decrescente,
 * aplicando a prioridade de desempate caso as pontuações sejam iguais.
 */
export function ordenarIdiomasPorPontuacao(
  pontuacoes: Record<IdiomaAmor, number>
): IdiomaAmor[] {
  return PRIORIDADE_DESEMPATE_IDIOMA_AMOR.slice().sort((a, b) => {
    const diff = pontuacoes[b] - pontuacoes[a];
    if (diff !== 0) return diff;
    // Empate: menor índice na lista de prioridade = maior prioridade
    return (
      PRIORIDADE_DESEMPATE_IDIOMA_AMOR.indexOf(a) -
      PRIORIDADE_DESEMPATE_IDIOMA_AMOR.indexOf(b)
    );
  });
}

/**
 * Calcula o resultado completo do quiz "Seu Idioma do Amor".
 *
 * @param respostas Record<number, OpcaoABCDE> com as respostas das perguntas 1 a 20.
 * @param userId ID do usuário respondente.
 * @returns IdiomaAmorResult com pontuações, percentuais, primário, secundário e distribuição.
 */
export function calcularIdiomaAmor(
  respostas: Record<number, string>,
  userId: string
): IdiomaAmorResult {
  const pontuacoes: Record<IdiomaAmor, number> = {
    palavras: 0,
    tempo: 0,
    presentes: 0,
    servico: 0,
    toque: 0,
  };

  // Soma 1 ponto para cada cenário respondido
  for (let q = 1; q <= TOTAL_PERGUNTAS_IDIOMA_AMOR; q++) {
    const opcao = respostas[q] as OpcaoABCDE | undefined;
    if (opcao && OPCAO_PARA_IDIOMA[opcao]) {
      const idioma = OPCAO_PARA_IDIOMA[opcao];
      pontuacoes[idioma] += 1;
    }
  }

  // Cálculo dos percentuais (cada ponto em 20 vale exatamente 5%)
  const percentuais: Record<IdiomaAmor, number> = {
    palavras: Math.round((pontuacoes.palavras / TOTAL_PERGUNTAS_IDIOMA_AMOR) * 100),
    tempo: Math.round((pontuacoes.tempo / TOTAL_PERGUNTAS_IDIOMA_AMOR) * 100),
    presentes: Math.round((pontuacoes.presentes / TOTAL_PERGUNTAS_IDIOMA_AMOR) * 100),
    servico: Math.round((pontuacoes.servico / TOTAL_PERGUNTAS_IDIOMA_AMOR) * 100),
    toque: Math.round((pontuacoes.toque / TOTAL_PERGUNTAS_IDIOMA_AMOR) * 100),
  };

  // Ordenação com critério de desempate
  const ordenados = ordenarIdiomasPorPontuacao(pontuacoes);
  const primario = ordenados[0];
  const secundario = ordenados[1];

  const distribuicaoOrdenada = ordenados.map((idKey) => ({
    idioma: idKey,
    label: IDIOMA_AMOR_META[idKey].label,
    emoji: IDIOMA_AMOR_META[idKey].emoji,
    pontos: pontuacoes[idKey],
    percentual: percentuais[idKey],
  }));

  const labelPrimario = IDIOMA_AMOR_META[primario].label;
  const pctPrimario = percentuais[primario];
  const labelSecundario = IDIOMA_AMOR_META[secundario].label;
  const pctSecundario = percentuais[secundario];

  const fraseResumo = `Seu idioma primário é ${labelPrimario} (${pctPrimario}%) com segundo destaque em ${labelSecundario} (${pctSecundario}%)`;

  return {
    id: `idioma-result-${Date.now()}`,
    user_id: userId,
    pontuacoes,
    percentuais,
    idioma_primario: primario,
    idioma_secundario: secundario,
    distribuicao_ordenada: distribuicaoOrdenada,
    frase_resumo: fraseResumo,
    calculado_em: new Date().toISOString(),
  };
}
