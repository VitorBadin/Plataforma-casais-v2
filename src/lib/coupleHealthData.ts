import { CoupleHealthPillar, CoupleHealthPillarKey } from '@/types/coupleHealthTypes';

export const COUPLE_HEALTH_META = {
  id: 'mapa-da-saude',
  title: 'Mapa da Saúde do Casal',
  subtitle: 'Protocolo de Alinhamento e Diagnóstico Conjugal',
  author: 'Desenvolvido pela Psicóloga Elaine Souza',
  category: 'Saúde & Alinhamento Conjugal',
  quote:
    'Muitas vezes, a hostilidade em um casamento não nasce da falta de afeto, mas de um desalinhamento de percepção. O Mapa da Saúde Conjugal é uma tomografia visual que revela exatamente onde a engrenagem de vocês precisa de ajuste.',
  instructionsTitle: 'Como Realizar o Diagnóstico:',
  instructions: [
    {
      title: 'Preenchimento Individual',
      text: 'Você e seu parceiro(a) devem preencher as notas de 1 a 10 para cada um dos 8 pilares de forma totalmente individual e silenciosa, sem consultar um ao outro.',
    },
    {
      title: 'Identificando os Gaps',
      text: 'Na nossa aula ao vivo da Semana 6, eu vou te ensinar a analisar as discrepâncias de notas entre vocês. Se um pilar tem uma diferença de nota a partir de 3 pontos (diferença ≥ 3) entre vocês, ali está um ponto cego que precisa de diálogo guiado.',
    },
  ],
  menuAcoesNotice:
    'Ao final do teste há o Menu de Ações que deverá ser seguido de acordo com as orientações contidas nele.',
  privacyText:
    'Suas notas ficam visíveis para você e para a profissional responsável pela mentoria. Se você estiver vinculado(a) a um cônjuge na plataforma, as notas de vocês dois serão comparadas e exibidas para ambos assim que os dois tiverem respondido.',
  scaleMinLabel: 'Precisa de muito ajuste',
  scaleMaxLabel: 'Está muito bem',
  scaleExplanation: 'Nota maior = pilar mais saudável (escala linear de 1 a 10)',
  menuAcoesTitle: 'MENU DE AÇÕES: COMO SUBIR 1 NÍVEL NO SEU MAPA',
  menuAcoesIntro:
    'Se você ou o seu parceiro atribuíram uma nota entre 1 e 6 em algum dos pilares, escolham uma ação abaixo para executar nas próximas duas semanas:',
  blindSpotOrientation:
    'Se um pilar tem uma diferença de nota a partir de 3 pontos (diferença ≥ 3) entre vocês, ali está um ponto cego que precisa de diálogo guiado.',
  noBlindSpotOrientation:
    'Nenhum ponto cego identificado: vocês estão com percepções próximas em todos os pilares.',
};

export const COUPLE_HEALTH_PILLARS: CoupleHealthPillar[] = [
  {
    key: 'p01_financeira',
    number: 1,
    title: 'Estabilidade Financeira',
    shortTitle: 'Finanças',
    actionPlan:
      'Sentem-se para uma conversa de "orçamento aberto". Sem acusações sobre gastos passados, listem as metas financeiras da família para os próximos 6 meses e estabeleçam um teto de despesa mensal combinado para cada um.',
  },
  {
    key: 'p02_rotina',
    number: 2,
    title: 'Parceria na Rotina',
    shortTitle: 'Rotina',
    actionPlan:
      'Mapeiem visualmente quem cuida de qual tarefa na casa. Redistribuam as obrigações para que nenhum dos dois se sinta sobrecarregado ou desempenhando o papel de "gerente" solitário do lar.',
  },
  {
    key: 'p03_familiar',
    number: 3,
    title: 'Alinhamento Familiar',
    shortTitle: 'Família',
    actionPlan:
      'Definam os limites de interferência externa. Entrem em acordo sobre o que não deve ser compartilhado com terceiros (família de origem ou amigos) para blindar a privacidade de vocês. Se tiverem filhos, combinem de apoiar a decisão do outro na frente das crianças.',
  },
  {
    key: 'p04_dialogo',
    number: 4,
    title: 'Diálogo Seguro',
    shortTitle: 'Diálogo',
    actionPlan:
      'Iniciem o ritual de "10 minutos de conexão diária". Durante 5 minutos, um fala livremente sobre suas preocupações ou sentimentos, sem que o outro dê conselhos ou interrompa. Depois, invertam o papel.',
  },
  {
    key: 'p05_tempo',
    number: 5,
    title: 'Tempo de Parceria',
    shortTitle: 'Tempo',
    actionPlan:
      'Bloqueiem um compromisso fixo na agenda da semana de vocês. Duas horas estritamente a sós. Não é necessário gastar muito; o objetivo é resgatar o namoro e falar sobre qualquer assunto que não envolva finanças, filhos ou pendências de casa.',
  },
  {
    key: 'p06_conexao',
    number: 6,
    title: 'Conexão e Intimidade',
    shortTitle: 'Conexão',
    actionPlan:
      'Pratiquem a verbalização da admiração. Digam, no mínimo uma vez ao dia, um ponto positivo específico que vocês apreciam no comportamento, na inteligência ou na postura do outro.',
  },
  {
    key: 'p07_quimica',
    number: 7,
    title: 'Química e Toque',
    shortTitle: 'Química & Toque',
    actionPlan:
      'Reintroduzam o afeto físico espontâneo de transição. Um abraço de 20 segundos ao chegar em casa, um beijo de bom dia mais demorado ou andar de mãos dadas, sem a obrigatoriedade ou pressão de que isso precise terminar em sexo na mesma hora.',
  },
  {
    key: 'p08_valores',
    number: 8,
    title: 'Valores e Visão de Futuro',
    shortTitle: 'Valores & Futuro',
    actionPlan:
      'Escrevam em um papel onde vocês querem estar daqui a 3 e 5 anos, principalmente se estiverem vivenciando o desafio de morar no exterior. Alinhem se o projeto de vida de vocês continua caminhando para a mesma direção de forma confortável para ambos.',
  },
];

export const INITIAL_HEALTH_MAP_FORM_DATA: Record<CoupleHealthPillarKey, number | null> = {
  p01_financeira: null,
  p02_rotina: null,
  p03_familiar: null,
  p04_dialogo: null,
  p05_tempo: null,
  p06_conexao: null,
  p07_quimica: null,
  p08_valores: null,
};
