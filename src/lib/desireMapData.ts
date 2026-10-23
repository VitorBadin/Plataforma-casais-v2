export const DESIRE_MAP_META = {
  id: 'mapa-do-desejo',
  quiz_id: 'quiz-mapa-do-desejo',
  titulo: 'Mapa do Desejo do Casal',
  subtitulo: 'Imaginação, Conexão e Intimidade',
  categoria: 'Intimidade & Desejo',
  autoria: 'Desenvolvido pela Psicóloga Elaine Souza',
  crp: 'CRP 06/170248',
  descricao: 'Exercício reflexivo e intimista de 3 seções para despertar a imaginação, aprofundar o significado emocional das vontades e reconstruir a intimidade do casal.',
  citacao: '“O desejo conjugal não é uma engrenagem automática; ele é cultivado por meio da segurança emocional e da imaginação. Este é o primeiro passo para vocês reconstruírem a conexão íntima.”',
  
  orientacoesClinicas: [
    'Este teste deve ser respondido de forma estritamente individual. Reserve um momento de privacidade para preencher as suas respostas.',
    'O foco do exercício é exclusivamente você e o seu parceiro(a).',
    'Não existe resposta certa, errada, boba ou exagerada.',
    'Permita que a sua mente imagine de forma livre, despida de julgamentos, culpas ou cobranças.',
  ],

  fechamentoOrientacoes: 'Lembre-se: o objetivo deste mapa não é impor vontades ao outro, mas descobrir caminhos de prazer, cumplicidade e novas experiências que vocês podem trilhar juntos.',

  observacaoMentora: 'A "Pasta do Casal": Responda ao formulário individualmente. Suas respostas ficarão disponíveis aqui na plataforma, na aba "Meus diagnósticos". Não mostre para o seu parceiro ainda. Nós vamos abrir essas respostas juntos no nosso ritual prático que vou guiar na Semana 8.',

  avisoPrivacidade: 'Suas respostas são confidenciais: ficam visíveis apenas para você e para a profissional responsável pela mentoria.',

  confirmacaoEnvio: 'Suas respostas foram salvas. Você pode revisá-las a qualquer momento na aba Meus diagnósticos. Não compartilhe com seu parceiro(a) por enquanto — vamos abrir essas respostas juntos no ritual da Semana 8.',
};

export const SECTION_1 = {
  id: 1,
  title: 'Seção 1',
  subtitle: 'Questão 01 — O Que Eu Gostaria De Construir Com Você',
  supportText: 'Liste 10 experiências que você tem o desejo de vivenciar de forma compartilhada com o seu parceiro(a). Aproveite para transitar por momentos de descontração, passeios, viagens a sós, jantares fora da rotina, momentos de toque físico ou fantasias que você gostaria que fizessem parte do universo de vocês.',
  itemsCount: 10,
  fieldMaxChars: 500,
  experiences: [
    { key: 'exp_01' as const, label: 'Experiência 01', placeholder: 'Descreva a primeira experiência que gostaria de vivenciar juntos...' },
    { key: 'exp_02' as const, label: 'Experiência 02', placeholder: 'Descreva a segunda experiência...' },
    { key: 'exp_03' as const, label: 'Experiência 03', placeholder: 'Descreva a terceira experiência...' },
    { key: 'exp_04' as const, label: 'Experiência 04', placeholder: 'Descreva a quarta experiência...' },
    { key: 'exp_05' as const, label: 'Experiência 05', placeholder: 'Descreva a quinta experiência...' },
    { key: 'exp_06' as const, label: 'Experiência 06', placeholder: 'Descreva a sexta experiência...' },
    { key: 'exp_07' as const, label: 'Experiência 07', placeholder: 'Descreva a sétima experiência...' },
    { key: 'exp_08' as const, label: 'Experiência 08', placeholder: 'Descreva a oitava experiência...' },
    { key: 'exp_09' as const, label: 'Experiência 09', placeholder: 'Descreva a nona experiência...' },
    { key: 'exp_10' as const, label: 'Experiência 10', placeholder: 'Descreva a décima experiência...' },
  ],
};

export const SECTION_2 = {
  id: 2,
  title: 'Seção 2',
  subtitle: 'O Significado Emocional Do Meu Desejo',
  supportText: 'Toda fantasia ou vontade íntima carrega em sua raiz uma necessidade emocional por trás. Responda com honestidade:',
  questions: [
    {
      key: 'q02_significado' as const,
      number: 'Questão 02',
      prompt: 'O que a realização dessas 10 experiências listadas acima representaria para você, hoje, dentro do seu relacionamento?',
      hint: '(Ex: Sensação de novidade, alívio da rotina de pais, voltar a me sentir desejada, etc.)',
      placeholder: 'Escreva com o coração sobre o que essas experiências significam para você e para o momento do casal...',
      maxChars: 3000,
    },
    {
      key: 'q03_perdido' as const,
      number: 'Questão 03',
      prompt: 'Olhando para a nossa rotina atual, o que você sente que se perdeu pelo caminho e que você gostaria muito de restabelecer na nossa intimidade?',
      hint: '',
      placeholder: 'Reflita sobre o que você sente saudade ou gostaria de resgatar na convivência e intimidade de vocês...',
      maxChars: 3000,
    },
  ],
};

export const SECTION_3 = {
  id: 3,
  title: 'Seção 3',
  subtitle: 'Autopercepção',
  supportText: 'A intimidade conjugal madura é fruto de espaços seguros onde é permitido falar de desejo com respeito mútuo.',
  questions: [
    {
      key: 'q04_autopercepcao' as const,
      number: 'Questão 04',
      prompt: 'O que o preenchimento deste exercício revelou para você a respeito dos seus sentimentos e do momento atual do seu casamento?',
      hint: '',
      placeholder: 'Descreva seus aprendizados, percepções e sensações despertadas durante o preenchimento deste exercício...',
      maxChars: 3000,
    },
  ],
};

export const DESIRE_MAP_SECTIONS = [SECTION_1, SECTION_2, SECTION_3];
