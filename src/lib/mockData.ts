import { Profile, Quiz, Question, DiagnosticRule, ResourceItem, UserDiagnostic, Answer } from '@/types/database';

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'prof-1',
    user_id: 'usr-1',
    nome: 'Mariana Silva',
    email: 'mariana@exemplo.com',
    status_acesso: 'ativo',
    role: 'aluno',
    criado_em: '2026-08-15T10:00:00Z',
  },
  {
    id: 'prof-2',
    user_id: 'usr-2',
    nome: 'Carlos Eduardo',
    email: 'carlos@exemplo.com',
    status_acesso: 'ativo',
    role: 'aluno',
    criado_em: '2026-08-18T14:30:00Z',
  },
  {
    id: 'prof-3',
    user_id: 'usr-3',
    nome: 'Fernanda Lima',
    email: 'fernanda@exemplo.com',
    status_acesso: 'pendente',
    role: 'aluno',
    criado_em: '2026-09-01T09:15:00Z',
  },
  {
    id: 'prof-4',
    user_id: 'usr-4',
    nome: 'Lucas Mendes',
    email: 'lucas@exemplo.com',
    status_acesso: 'pendente',
    role: 'aluno',
    criado_em: '2026-09-04T16:20:00Z',
  },
  {
    id: 'prof-admin',
    user_id: 'usr-admin',
    nome: 'Dra. Elaine Souza',
    email: 'elaine@psielainesouza.com.br',
    status_acesso: 'ativo',
    role: 'admin',
    criado_em: '2026-01-01T08:00:00Z',
  },
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-1',
    titulo: 'Mapeamento da Saúde da Comunicação no Relacionamento',
    descricao: 'Identifique os padrões de escuta, reatividade e abertura emocional que impactam o diálogo cotidiano do casal.',
    categoria: 'Comunicação',
    ativo: true,
    criado_em: '2026-08-10T12:00:00Z',
    questions: [
      {
        id: 'q1-1',
        quiz_id: 'quiz-1',
        texto: 'Quando temos uma divergência, sinto que consigo expressar meus sentimentos sem medo de ser julgado(a) ou atacado(a).',
        tipo: 'escala',
        opcoes: [
          { valor: 1, texto: '1 - Raramente / Quase Nunca' },
          { valor: 2, texto: '2 - Pouco frequente' },
          { valor: 3, texto: '3 - Às vezes' },
          { valor: 4, texto: '4 - Na maioria das vezes' },
          { valor: 5, texto: '5 - Quase sempre / Totalmente' },
        ],
        ordem: 1,
      },
      {
        id: 'q1-2',
        quiz_id: 'quiz-1',
        texto: 'Durante momentos de tensão ou discussão, costumamos:',
        tipo: 'multipla_escolha',
        opcoes: [
          { valor: 1, texto: 'Entrar no ciclo de acusação e defesa imediata' },
          { valor: 2, texto: 'Um dos dois se recusa a falar e se isola (silêncio punitivo)' },
          { valor: 3, texto: 'Interromper a conversa para esfriar os ânimos e retomar depois' },
          { valor: 4, texto: 'Escutar atentamente e tentar compreender a perspectiva do outro' },
        ],
        ordem: 2,
      },
      {
        id: 'q1-3',
        quiz_id: 'quiz-1',
        texto: 'Sinto que meu parceiro(a) demonstra interesse real nos meus sentimentos e no meu dia a dia.',
        tipo: 'escala',
        opcoes: [
          { valor: 1, texto: '1 - Raramente' },
          { valor: 2, texto: '2 - Pouco' },
          { valor: 3, texto: '3 - Moderadamente' },
          { valor: 4, texto: '4 - Frequentemente' },
          { valor: 5, texto: '5 - Sempre' },
        ],
        ordem: 3,
      },
      {
        id: 'q1-4',
        quiz_id: 'quiz-1',
        texto: 'Descreva em poucas palavras qual é o maior ruído de comunicação que você percebe hoje entre vocês:',
        tipo: 'texto',
        ordem: 4,
      },
    ],
  },
  {
    id: 'quiz-2',
    titulo: 'Diagnóstico da Intimidade Emocional e Afetividade',
    descricao: 'Avalie a sensação de cumplicidade, carinho diário e conexão profunda no vínculo amoroso.',
    categoria: 'Intimidade & Afeto',
    ativo: true,
    criado_em: '2026-08-12T15:00:00Z',
    questions: [
      {
        id: 'q2-1',
        quiz_id: 'quiz-2',
        texto: 'Com que frequência demonstramos carinho físico e verbal sem necessariamente buscar sexo?',
        tipo: 'escala',
        opcoes: [
          { valor: 1, texto: '1 - Quase nunca' },
          { valor: 2, texto: '2 - Raramente' },
          { valor: 3, texto: '3 - De vez em quando' },
          { valor: 4, texto: '4 - Com boa frequência' },
          { valor: 5, texto: '5 - Diariamente' },
        ],
        ordem: 1,
      },
      {
        id: 'q2-2',
        quiz_id: 'quiz-2',
        texto: 'Sinto que temos momentos a sós de qualidade, sem interferência de telas ou estresse de trabalho.',
        tipo: 'escala',
        opcoes: [
          { valor: 1, texto: '1 - Raramente' },
          { valor: 2, texto: '2 - Pouco' },
          { valor: 3, texto: '3 - Moderado' },
          { valor: 4, texto: '4 - Frequente' },
          { valor: 5, texto: '5 - Excelente' },
        ],
        ordem: 2,
      },
    ],
  },
  {
    id: 'quiz-3',
    titulo: 'Alinhamento de Expectativas e Projeto de Vida',
    descricao: 'Mapeie a sintonia em relação a finanças, divisão de tarefas, planos de futuro e valores fundamentais.',
    categoria: 'Projeto de Vida',
    ativo: true,
    criado_em: '2026-08-20T11:30:00Z',
    questions: [
      {
        id: 'q3-1',
        quiz_id: 'quiz-3',
        texto: 'Nossos planos e objetivos para os próximos 3 a 5 anos estão clareados e alinhados entre nós.',
        tipo: 'escala',
        opcoes: [
          { valor: 1, texto: '1 - Discordo Fortemente' },
          { valor: 3, texto: '3 - Parcialmente' },
          { valor: 5, texto: '5 - Totalmente Alinhados' },
        ],
        ordem: 1,
      },
    ],
  },
];

export const INITIAL_DIAGNOSTIC_RULES: DiagnosticRule[] = [
  {
    id: 'rule-1',
    quiz_id: 'quiz-1',
    min_pontos: 3,
    max_pontos: 7,
    titulo_resultado: 'Comunicação Defensiva ou Sob Sobrecarga Emocional',
    resultado_texto: `Olá! Seu diagnóstico indica que a comunicação atual está passando por um momento de alta reatividade. É comum que, sob estresse ou mágoas acumuladas, as conversas se transformem em um terreno de autodefesa ou silêncio. 

**Recomendações da Psi Elaine Souza:**
- Evite discutir temas profundos quando a bateria emocional estiver baixa.
- Pratique o "Protocolo de Pausa": se a conversa esquentar, estabeleçam uma pausa programada de 20 minutos antes de retomar.
- Consulte o material *"Guia Prático: Desarmando Discussões Destrutivas"* disponível na sua Biblioteca de Materiais.`,
  },
  {
    id: 'rule-2',
    quiz_id: 'quiz-1',
    min_pontos: 8,
    max_pontos: 12,
    titulo_resultado: 'Comunicação Funcional com Pontos de Vulnerabilidade',
    resultado_texto: `Seu diagnóstico demonstra que existe um canal de diálogo aberto, porém ainda há momentos de hesitação ou ruídos na expressão de necessidades mais profundas. Vocês possuem uma boa base, mas podem evoluir de um diálogo funcional para uma conexão empática ainda mais rica.

**Recomendações da Psi Elaine Souza:**
- Experimentem a comunicação não-violenta: foque em dizer "Eu sinto..." em vez de "Você sempre...".
- Dediquem 15 minutos semanais sem telas para checarem como cada um está se sentindo na relação.`,
  },
  {
    id: 'rule-3',
    quiz_id: 'quiz-1',
    min_pontos: 13,
    max_pontos: 20,
    titulo_resultado: 'Alta Conexão e Diálogo Empático',
    resultado_texto: `Parabéns! Suas respostas indicam um nível elevado de segurança emocional e abertura no diálogo. Você percebe o relacionamento como um ambiente seguro para ser quem você é. Continue nutrindo essa escuta generosa e refinando os pequenos detalhes da caminhada a dois!`,
  },
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    titulo: 'Ebook: As 5 Portas da Intimidade Emocional',
    descricao: 'Um guia prático com exercícios diários para resgatar a cumplicidade, a empatia e o carinho no relacionamento.',
    categoria: 'Ebooks',
    arquivo_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    criado_em: '2026-08-01T10:00:00Z',
    tamanho: '2.4 MB',
    visualizado: true,
  },
  {
    id: 'res-2',
    titulo: 'Guia Prático: Desarmando Discussões Destrutivas',
    descricao: 'Aprenda o passo a passo para estancar brigas repetitivas, controlar a reatividade e transformar conflitos em conexão.',
    categoria: 'Guias Práticos',
    arquivo_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    criado_em: '2026-08-10T14:20:00Z',
    tamanho: '1.8 MB',
    visualizado: false,
  },
  {
    id: 'res-3',
    titulo: 'Planner de Encontros e Diálogos do Casal',
    descricao: 'Ferramenta estruturada para planejar momentos a sós de qualidade e conduzir conversas de alinhamento quinzenais.',
    categoria: 'Exercícios & Planners',
    arquivo_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    criado_em: '2026-08-25T09:00:00Z',
    tamanho: '3.1 MB',
    visualizado: false,
  },
];

export const INITIAL_DIAGNOSTICS: UserDiagnostic[] = [
  {
    id: 'diag-1',
    user_id: 'usr-1',
    quiz_id: 'quiz-1',
    pontuacao_total: 10,
    titulo_resultado: 'Comunicação Funcional com Pontos de Vulnerabilidade',
    resultado_texto: 'Seu diagnóstico demonstra que existe um canal de diálogo aberto, porém ainda há momentos de hesitação ou ruídos na expressão de necessidades mais profundas...',
    gerado_em: '2026-08-28T16:00:00Z',
    quiz_titulo: 'Mapeamento da Saúde da Comunicação no Relacionamento',
  },
];

// Helper para gerenciar storage local simulado (para desenvolvimento fluido sem backend)
export const getStoredProfiles = (): Profile[] => {
  if (typeof window === 'undefined') return INITIAL_PROFILES;
  const stored = localStorage.getItem('psi_profiles');
  if (!stored) {
    localStorage.setItem('psi_profiles', JSON.stringify(INITIAL_PROFILES));
    return INITIAL_PROFILES;
  }
  return JSON.parse(stored);
};

export const saveStoredProfiles = (profiles: Profile[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('psi_profiles', JSON.stringify(profiles));
  }
};

export const getStoredQuizzes = (): Quiz[] => {
  if (typeof window === 'undefined') return INITIAL_QUIZZES;
  const stored = localStorage.getItem('psi_quizzes');
  if (!stored) {
    localStorage.setItem('psi_quizzes', JSON.stringify(INITIAL_QUIZZES));
    return INITIAL_QUIZZES;
  }
  return JSON.parse(stored);
};

export const saveStoredQuizzes = (quizzes: Quiz[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('psi_quizzes', JSON.stringify(quizzes));
  }
};
