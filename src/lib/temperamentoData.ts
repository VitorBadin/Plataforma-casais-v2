// ========================================================
// DADOS DO QUIZ "TESTE DE TEMPERAMENTO"
// 23 perguntas em 3 blocos + metadados visuais por temperamento
// ========================================================

import {
  Temperamento,
  TemperamentoPergunta,
  TemperamentoMeta,
} from '@/types/temperamentoTypes';

// ----------------------------------------------------------
// METADADOS VISUAIS POR TEMPERAMENTO
// ----------------------------------------------------------
export const TEMPERAMENTO_META: Record<Temperamento, TemperamentoMeta> = {
  colerico: {
    key: 'colerico',
    label: 'Colérico',
    emoji: '🔥',
    color: '#DC2626',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-orange-500',
    bgLight: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    descricaoCurta:
      'Líder nato, determinado, enérgico. Age com urgência, busca resultados e assume riscos. Valoriza eficiência e não tolera lentidão.',
  },
  sanguineo: {
    key: 'sanguineo',
    label: 'Sanguíneo',
    emoji: '☀️',
    color: '#F59E0B',
    gradientFrom: 'from-yellow-400',
    gradientTo: 'to-amber-500',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    descricaoCurta:
      'Comunicador, entusiasta, social. Traz energia e diversão para o ambiente. Valoriza conexão humana e experiências compartilhadas.',
  },
  melancolico: {
    key: 'melancolico',
    label: 'Melancólico',
    emoji: '🌙',
    color: '#6366F1',
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-purple-500',
    bgLight: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    descricaoCurta:
      'Analítico, sensível, criativo. Busca profundidade e significado. Valoriza qualidade, detalhes e autenticidade emocional.',
  },
  fleumatico: {
    key: 'fleumatico',
    label: 'Fleumático',
    emoji: '🌿',
    color: '#10B981',
    gradientFrom: 'from-emerald-400',
    gradientTo: 'to-teal-500',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    descricaoCurta:
      'Pacífico, confiável, empático. Traz estabilidade e harmonia. Valoriza lealdade, previsibilidade e paz no convívio.',
  },
};

// ----------------------------------------------------------
// PERGUNTAS — BLOCO 1: Seu Instinto Natural ⚡ (1 a 10)
// Múltipla escolha A/B/C/D, uma resposta por pergunta
// ----------------------------------------------------------
const BLOCO_1: TemperamentoPergunta[] = [
  {
    number: 1,
    bloco: 1,
    texto: 'Quando alguém discorda de você, seu impulso é:',
    opcoes: [
      { letra: 'A', texto: 'Defender seu ponto com força até convencê-lo' },
      { letra: 'B', texto: 'Fazer uma piada para descontrair a situação' },
      { letra: 'C', texto: 'Questionar se você realmente estava certo' },
      { letra: 'D', texto: 'Ceder para evitar o conflito' },
    ],
  },
  {
    number: 2,
    bloco: 1,
    texto: 'Quando está entediado, você:',
    opcoes: [
      { letra: 'A', texto: 'Procura um desafio ou atividade competitiva' },
      { letra: 'B', texto: 'Chama amigos ou procura diversão urgente' },
      { letra: 'C', texto: 'Aproveita para organizar, planejar ou estudar algo' },
      { letra: 'D', texto: 'Assiste algo relaxante ou descansa' },
    ],
  },
  {
    number: 3,
    bloco: 1,
    texto: 'Em uma reunião importante, você naturalmente:',
    opcoes: [
      { letra: 'A', texto: 'Toma a frente e lidera a discussão' },
      { letra: 'B', texto: 'Faz o ambiente divertido e leve' },
      { letra: 'C', texto: 'Observa e depois contribui com análise profunda' },
      { letra: 'D', texto: 'Apoia quem está liderando' },
    ],
  },
  {
    number: 4,
    bloco: 1,
    texto: 'Seu maior medo é:',
    opcoes: [
      { letra: 'A', texto: 'Perder o controle ou aparecer fraco' },
      { letra: 'B', texto: 'Ficar sozinho ou ser rejeitado socialmente' },
      { letra: 'C', texto: 'Cometer um erro ou decepcionar alguém' },
      { letra: 'D', texto: 'Não ser aceito ou haver conflito ao seu redor' },
    ],
  },
  {
    number: 5,
    bloco: 1,
    texto: 'Quando toma uma decisão importante, você:',
    opcoes: [
      { letra: 'A', texto: 'Decide rápido e segue em frente' },
      { letra: 'B', texto: 'Pede opinião de vários amigos e depois escolhe' },
      { letra: 'C', texto: 'Pesquisa, analisa e só depois decide' },
      { letra: 'D', texto: 'Pede sugestão a alguém confiável e segue' },
    ],
  },
  {
    number: 6,
    bloco: 1,
    texto: 'Seu tipo de atividade ideal é:',
    opcoes: [
      { letra: 'A', texto: 'Algo que exija liderança e resultados imediatos' },
      { letra: 'B', texto: 'Algo social, divertido e cheio de gente' },
      { letra: 'C', texto: 'Algo que exija criatividade, detalhe ou aprendizado' },
      { letra: 'D', texto: 'Algo tranquilo, previsível e em boa companhia' },
    ],
  },
  {
    number: 7,
    bloco: 1,
    texto: 'Quando algo dá errado, seu primeiro sentimento é:',
    opcoes: [
      { letra: 'A', texto: 'Raiva/frustração (quero resolver AGORA)' },
      { letra: 'B', texto: 'Ansiedade (preciso desabafar com alguém)' },
      { letra: 'C', texto: 'Culpa/preocupação (o que fiz de errado?)' },
      { letra: 'D', texto: 'Calma (vai dar jeito, deixa eu respirar)' },
    ],
  },
  {
    number: 8,
    bloco: 1,
    texto: 'Você se descreve como:',
    opcoes: [
      { letra: 'A', texto: 'Ambicioso, determinado e competitivo' },
      { letra: 'B', texto: 'Espontâneo, divertido e impulsivo' },
      { letra: 'C', texto: 'Sensível, profundo e analítico' },
      { letra: 'D', texto: 'Calmo, paciente e equilibrado' },
    ],
  },
  {
    number: 9,
    bloco: 1,
    texto: 'Sua maior força em um relacionamento é:',
    opcoes: [
      { letra: 'A', texto: 'Tomar iniciativa e proteger quem ama' },
      { letra: 'B', texto: 'Animar, surpreender e trazer diversão' },
      { letra: 'C', texto: 'Ser leal, atento aos detalhes e compreensivo' },
      { letra: 'D', texto: 'Ser paciente, ouvinte e trazer paz' },
    ],
  },
  {
    number: 10,
    bloco: 1,
    texto: 'Se pudesse descrever seu estilo pessoal:',
    opcoes: [
      { letra: 'A', texto: 'Prático, eficiente e direto' },
      { letra: 'B', texto: 'Colorido, variado e sempre novo' },
      { letra: 'C', texto: 'Clássico, bem cuidado e refinado' },
      { letra: 'D', texto: 'Confortável, funcional e acessível' },
    ],
  },
];

// ----------------------------------------------------------
// PERGUNTAS — BLOCO 2: Seu Comportamento Real 🎯 (11 a 22)
// Escala de 3 pontos: MUITO / MAIS OU MENOS / NÃO
// Cada pergunta → temperamento fixo
// ----------------------------------------------------------
const BLOCO_2: TemperamentoPergunta[] = [
  {
    number: 11,
    bloco: 2,
    texto: 'Eu preciso que tudo em casa tenha um lugar específico e fico estressado com bagunça.',
    temperamentoAlvo: 'melancolico',
  },
  {
    number: 12,
    bloco: 2,
    texto: 'Quando prometo algo, eu cumpro mesmo que precise fazer sacrifício.',
    temperamentoAlvo: 'fleumatico',
  },
  {
    number: 13,
    bloco: 2,
    texto: 'Eu mudo de ideia frequentemente e gosto de fazer coisas diferentes todo dia.',
    temperamentoAlvo: 'sanguineo',
  },
  {
    number: 14,
    bloco: 2,
    texto: 'Prefiro resolver problemas na hora, mesmo que rapidamente, do que deixar pendente.',
    temperamentoAlvo: 'colerico',
  },
  {
    number: 15,
    bloco: 2,
    texto: 'Tenho dificuldade em expressar meus sentimentos e necessidades para meu parceiro.',
    temperamentoAlvo: 'fleumatico',
  },
  {
    number: 16,
    bloco: 2,
    texto: 'Quando alguém critica meu trabalho, eu fico remoendo isso por dias.',
    temperamentoAlvo: 'melancolico',
  },
  {
    number: 17,
    bloco: 2,
    texto: 'Eu naturalmente noto erros e imperfeições nas coisas que outras pessoas fazem.',
    temperamentoAlvo: 'melancolico',
  },
  {
    number: 18,
    bloco: 2,
    texto: 'Preciso estar rodeado de pessoas para me sentir bem; ficar sozinho me deixa triste.',
    temperamentoAlvo: 'sanguineo',
  },
  {
    number: 19,
    bloco: 2,
    texto: 'Quando meu parceiro está chateado, meu impulso é tentar resolver o problema dele.',
    temperamentoAlvo: 'colerico',
  },
  {
    number: 20,
    bloco: 2,
    texto: 'Sou paciente e consigo ouvir alguém reclamar sem interromper ou querer consertar.',
    temperamentoAlvo: 'fleumatico',
  },
  {
    number: 21,
    bloco: 2,
    texto: 'Eu esqueci compromissos ou perdi interesse em coisas que antes me animavam muito.',
    temperamentoAlvo: 'sanguineo',
  },
  {
    number: 22,
    bloco: 2,
    texto: 'Quando alguém me contradiz ou questiona minha autoridade, sinto raiva.',
    temperamentoAlvo: 'colerico',
  },
];

// ----------------------------------------------------------
// PERGUNTA — BLOCO 3: Validação Final ✨ (23)
// Múltipla escolha A/B/C/D, usada no cálculo automático
// ----------------------------------------------------------
const BLOCO_3: TemperamentoPergunta[] = [
  {
    number: 23,
    bloco: 3,
    texto: 'Em qual situação você se sente MAIS VOCÊ MESMO?',
    opcoes: [
      { letra: 'A', texto: 'Resolvendo um problema difícil ou tomando uma decisão importante' },
      { letra: 'B', texto: 'Divertindo-se, rindo com amigos e curtindo momentos leves' },
      { letra: 'C', texto: 'Criando algo, analisando detalhes ou aprendendo sobre um tema que gosto' },
      { letra: 'D', texto: 'Apoiando alguém importante, ouvindo atentamente ou mantendo a paz' },
    ],
  },
];

// ----------------------------------------------------------
// EXPORTAÇÕES
// ----------------------------------------------------------

/** Todas as 23 perguntas agrupadas */
export const TEMPERAMENTO_PERGUNTAS: TemperamentoPergunta[] = [
  ...BLOCO_1,
  ...BLOCO_2,
  ...BLOCO_3,
];

/** Informações dos blocos para renderização na UI */
export const BLOCOS_INFO = [
  {
    id: 1,
    titulo: 'Seu Instinto Natural',
    emoji: '⚡',
    instrucao: 'Responda com seu PRIMEIRO INSTINTO, não pense muito.',
    perguntas: BLOCO_1,
  },
  {
    id: 2,
    titulo: 'Seu Comportamento Real',
    emoji: '🎯',
    instrucao: 'Responda de acordo com como REALMENTE você age (não como gostaria de ser).',
    perguntas: BLOCO_2,
  },
  {
    id: 3,
    titulo: 'Validação Final',
    emoji: '✨',
    instrucao: 'Uma última pergunta para confirmar seu perfil.',
    perguntas: BLOCO_3,
  },
];

/** Total de perguntas */
export const TOTAL_PERGUNTAS = TEMPERAMENTO_PERGUNTAS.length; // 23

/** Labels das opções da escala do Bloco 2 */
export const ESCALA_BLOCO2_OPCOES = [
  { key: 'MUITO' as const, label: 'MUITO como eu', pontos: 3 },
  { key: 'MAIS_OU_MENOS' as const, label: 'MAIS OU MENOS como eu', pontos: 2 },
  { key: 'NAO' as const, label: 'NÃO é como eu', pontos: 1 },
];
