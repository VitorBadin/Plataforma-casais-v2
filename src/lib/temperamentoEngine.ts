// ========================================================
// MOTOR DE CÁLCULO — QUIZ "TESTE DE TEMPERAMENTO"
// Distribui pontos em 4 eixos e determina primário/secundário
// ========================================================

import {
  Temperamento,
  IntensidadeTemperamento,
  OpcaoABCD,
  EscalaBloco2,
  TemperamentoResult,
} from '@/types/temperamentoTypes';

import { TEMPERAMENTO_PERGUNTAS } from './temperamentoData';
import { TEMPERAMENTO_META } from './temperamentoData';

// ----------------------------------------------------------
// CONSTANTES DE MAPEAMENTO
// ----------------------------------------------------------

/** Mapeamento opção A/B/C/D → temperamento (Blocos 1 e 3) */
const OPCAO_PARA_TEMPERAMENTO: Record<OpcaoABCD, Temperamento> = {
  A: 'colerico',
  B: 'sanguineo',
  C: 'melancolico',
  D: 'fleumatico',
};

/** Pontuação da escala do Bloco 2 */
const ESCALA_PONTOS: Record<EscalaBloco2, number> = {
  MUITO: 3,
  MAIS_OU_MENOS: 2,
  NAO: 1,
};

/**
 * Ordem de prioridade para desempate.
 * Critério fixo: Colérico > Sanguíneo > Melancólico > Fleumático.
 * NOTA: Este critério pode ser revisado futuramente.
 */
const PRIORIDADE_DESEMPATE: Temperamento[] = [
  'colerico',
  'sanguineo',
  'melancolico',
  'fleumatico',
];

// ----------------------------------------------------------
// FUNÇÕES AUXILIARES
// ----------------------------------------------------------

/**
 * Determina a intensidade baseada na pontuação total de um temperamento.
 * Escala: 3-7 leve | 8-12 presente | 13-17 forte | 18-20 muito dominante
 */
function classificarIntensidade(pontos: number): IntensidadeTemperamento {
  if (pontos >= 18) return 'Temperamento MUITO dominante';
  if (pontos >= 13) return 'Temperamento forte';
  if (pontos >= 8) return 'Presente e notável';
  return 'Traço leve';
}

/**
 * Ordena os temperamentos por pontuação (desc), usando prioridade fixa para desempate.
 */
function ordenarTemperamentos(
  pontuacoes: Record<Temperamento, number>
): Temperamento[] {
  return PRIORIDADE_DESEMPATE.slice().sort((a, b) => {
    const diff = pontuacoes[b] - pontuacoes[a];
    if (diff !== 0) return diff;
    // Empate: usa índice na lista de prioridade (menor índice = maior prioridade)
    return PRIORIDADE_DESEMPATE.indexOf(a) - PRIORIDADE_DESEMPATE.indexOf(b);
  });
}

// ----------------------------------------------------------
// FUNÇÃO PRINCIPAL
// ----------------------------------------------------------

/**
 * Calcula o resultado do quiz de temperamento a partir das respostas do usuário.
 *
 * @param respostas - Record<number, string> onde a chave é o número da pergunta (1-23)
 *   e o valor é a resposta:
 *   - Blocos 1 e 3: 'A' | 'B' | 'C' | 'D'
 *   - Bloco 2: 'MUITO' | 'MAIS_OU_MENOS' | 'NAO'
 * @param userId - ID do usuário
 * @returns TemperamentoResult com pontuações, primário, secundário e frase-resumo
 */
export function calcularTemperamento(
  respostas: Record<number, string>,
  userId: string
): TemperamentoResult {
  // Inicializa pontuações zeradas
  const pontuacoes: Record<Temperamento, number> = {
    colerico: 0,
    sanguineo: 0,
    melancolico: 0,
    fleumatico: 0,
  };

  // ---- BLOCO 1 (perguntas 1-10): +1 ponto por opção A/B/C/D ----
  for (let q = 1; q <= 10; q++) {
    const resposta = respostas[q] as OpcaoABCD | undefined;
    if (resposta && OPCAO_PARA_TEMPERAMENTO[resposta]) {
      pontuacoes[OPCAO_PARA_TEMPERAMENTO[resposta]] += 1;
    }
  }

  // ---- BLOCO 2 (perguntas 11-22): escala MUITO/MAIS_OU_MENOS/NAO ----
  for (let q = 11; q <= 22; q++) {
    const pergunta = TEMPERAMENTO_PERGUNTAS.find((p) => p.number === q);
    if (!pergunta || !pergunta.temperamentoAlvo) continue;

    const resposta = respostas[q] as EscalaBloco2 | undefined;
    if (resposta && ESCALA_PONTOS[resposta] !== undefined) {
      pontuacoes[pergunta.temperamentoAlvo] += ESCALA_PONTOS[resposta];
    }
  }

  // ---- BLOCO 3 (pergunta 23): +1 ponto direto ----
  const resposta23 = respostas[23] as OpcaoABCD | undefined;
  if (resposta23 && OPCAO_PARA_TEMPERAMENTO[resposta23]) {
    pontuacoes[OPCAO_PARA_TEMPERAMENTO[resposta23]] += 1;
  }

  // ---- DETERMINAR RESULTADO ----
  const ordenados = ordenarTemperamentos(pontuacoes);
  const primario = ordenados[0];
  const secundario = ordenados[1];

  const intensidadePrimario = classificarIntensidade(pontuacoes[primario]);
  const intensidadeSecundario = classificarIntensidade(pontuacoes[secundario]);

  const labelPrimario = TEMPERAMENTO_META[primario].label.toUpperCase();
  const labelSecundario = TEMPERAMENTO_META[secundario].label.toUpperCase();

  const fraseResumo = `Você é um ${labelPrimario} com traço ${labelSecundario}`;

  return {
    id: `temp-result-${Date.now()}`,
    user_id: userId,
    pontuacoes,
    temperamento_primario: primario,
    intensidade_primario: intensidadePrimario,
    temperamento_secundario: secundario,
    intensidade_secundario: intensidadeSecundario,
    frase_resumo: fraseResumo,
    calculado_em: new Date().toISOString(),
  };
}
