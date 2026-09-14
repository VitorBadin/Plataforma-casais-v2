// ========================================================
// DADOS DO QUIZ "SEU IDIOMA DO AMOR"
// 20 cenários + metadados visuais por idioma do amor
// ========================================================

import {
  IdiomaAmor,
  IdiomaAmorMeta,
  IdiomaAmorPergunta,
  OpcaoABCDE,
} from '@/types/idiomaAmorTypes';

export const TOTAL_PERGUNTAS_IDIOMA_AMOR = 20;

export const INTRODUCAO_IDIOMA_AMOR =
  'Você está prestes a descobrir seu principal Idioma do Amor - a forma como você melhor sente e expressa amor em seu relacionamento. Leia cada cenário com atenção e escolha a opção que MAIS se parece com você. Não existem respostas certas ou erradas. Seja honesto(a) consigo mesmo(a)!';

// ----------------------------------------------------------
// METADADOS VISUAIS POR IDIOMA DO AMOR
// ----------------------------------------------------------
export const IDIOMA_AMOR_META: Record<IdiomaAmor, IdiomaAmorMeta> = {
  palavras: {
    key: 'palavras',
    label: 'Palavras de Afirmação',
    emoji: '💬',
    color: '#8B5CF6', // Roxo / Violeta
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-indigo-500',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    descricaoCurta:
      'Expressa e recebe amor por meio de elogios sinceros, palavras de encorajamento, apreço e reafirmações verbais constantes.',
  },
  tempo: {
    key: 'tempo',
    label: 'Tempo de Qualidade',
    emoji: '⏳',
    color: '#EC4899', // Rosa / Pink
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-rose-500',
    bgLight: 'bg-pink-50',
    textColor: 'text-pink-700',
    borderColor: 'border-pink-200',
    descricaoCurta:
      'Valoriza atenção total, conversas profundas olho no olho, momentos compartilhados sem distrações nem pressa.',
  },
  presentes: {
    key: 'presentes',
    label: 'Receber Presentes',
    emoji: '🎁',
    color: '#F59E0B', // Âmbar / Dourado
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-yellow-500',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    descricaoCurta:
      'Vê nos presentes símbolos visuais tangíveis de afeto, lembrança e consideração pelo que o outro pensa e sente.',
  },
  servico: {
    key: 'servico',
    label: 'Atos de Serviço',
    emoji: '🛠️',
    color: '#3B82F6', // Azul
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-500',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    descricaoCurta:
      'Sente o amor através de ações práticas, cuidados com a rotina e gestos prestativos que aliviam a carga do dia a dia.',
  },
  toque: {
    key: 'toque',
    label: 'Toque Físico',
    emoji: '🫂',
    color: '#10B981', // Esmeralda / Verde
    gradientFrom: 'from-emerald-400',
    gradientTo: 'to-teal-500',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    descricaoCurta:
      'Comunica e recebe amor por abraços, carícias, beijos, proximidade física e intimidade como ancoragem emocional.',
  },
};

/** Mapeamento fixo de opção para idioma em todas as 20 perguntas */
export const OPCAO_PARA_IDIOMA: Record<OpcaoABCDE, IdiomaAmor> = {
  A: 'presentes',
  B: 'servico',
  C: 'toque',
  D: 'tempo',
  E: 'palavras',
};

// ----------------------------------------------------------
// 20 CENÁRIOS DO QUIZ "SEU IDIOMA DO AMOR"
// ----------------------------------------------------------
export const IDIOMA_AMOR_PERGUNTAS: IdiomaAmorPergunta[] = [
  {
    number: 1,
    tituloCenario: 'Conforto na tristeza',
    cenario: 'Você está profundamente triste ou abalado(a). O que faria você se sentir realmente amado(a) e apoiado(a)?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Um presente que me conforta (meu doce favorito, uma lembrança especial, algo que me acalma)' },
      { letra: 'B', idioma: 'servico', texto: 'Ele/a assumir TUDO: comida, tarefas, responsabilidades, me deixando apenas sentir' },
      { letra: 'C', idioma: 'toque', texto: 'Um abraço prolongado, estar fisicamente perto, carícias que me acalmem' },
      { letra: 'D', idioma: 'tempo', texto: 'Sentar comigo, ouvir atentamente, validar meus sentimentos sem pressa' },
      { letra: 'E', idioma: 'palavras', texto: 'Palavras de esperança, força e certeza de que vou superar' },
    ],
  },
  {
    number: 2,
    tituloCenario: 'Expressando amor no dia a dia',
    cenario: 'Como você naturalmente mostra amor pelo seu parceiro na rotina?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Compro presentes regularmente (flores, doces, coisas que ele/a ama)' },
      { letra: 'B', idioma: 'servico', texto: 'Cuido de tarefas práticas (cozinho, organizo, facilito sua vida)' },
      { letra: 'C', idioma: 'toque', texto: 'Iniciando contato: abraços, beijos, mãos dadas, carícias constantes' },
      { letra: 'D', idioma: 'tempo', texto: 'Conversando genuinamente, focado(a) nele/a, sem distrações' },
      { letra: 'E', idioma: 'palavras', texto: 'Elogiando, reconhecendo qualidades, dizendo frequentemente que o/a amo' },
    ],
  },
  {
    number: 3,
    tituloCenario: 'Após uma briga',
    cenario: 'Vocês tiveram uma discussão séria. O que realmente faria você se sentir que o amor ainda existe?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Um presente como gesto de reconciliação e pedido de desculpas sinceras' },
      { letra: 'B', idioma: 'servico', texto: 'Ele/a fazer algo especial que mostre cuidado e devoção renovada' },
      { letra: 'C', idioma: 'toque', texto: 'Um abraço profundo, beijo, retomada da intimidade física' },
      { letra: 'D', idioma: 'tempo', texto: 'Uma conversa real onde nos entendemos e reconciliamos verdadeiramente' },
      { letra: 'E', idioma: 'palavras', texto: 'Ouvir que ainda me ama, que a briga não muda nada, que sou amado(a)' },
    ],
  },
  {
    number: 4,
    tituloCenario: 'Negligência perceptível',
    cenario: 'Você se sente negligenciado(a) e invisível. O que teria maior impacto para mudar isso?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Presentes inesperados que mostrem que ele/a pensa em mim' },
      { letra: 'B', idioma: 'servico', texto: 'Dedicação em cuidar de algo que eu valorizo ou que me preocupa' },
      { letra: 'C', idioma: 'toque', texto: 'Mais carinho, proximidade, demonstração de desejo físico' },
      { letra: 'D', idioma: 'tempo', texto: 'Atenção focada apenas em mim, deixando tudo de lado' },
      { letra: 'E', idioma: 'palavras', texto: 'Reconhecimento verbal de quem sou e o quanto sou especial' },
    ],
  },
  {
    number: 5,
    tituloCenario: 'Celebrando vitória pessoal',
    cenario: 'Você conquistou algo importante. Como gostaria que seu parceiro celebrasse?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Um presente comemorativo que simbolize essa conquista pessoal' },
      { letra: 'B', idioma: 'servico', texto: 'Cuidar de tudo para eu relaxar e curtir minha vitória sem preocupações' },
      { letra: 'C', idioma: 'toque', texto: 'Um abraço entusiasmado, paixão, celebração física genuína' },
      { letra: 'D', idioma: 'tempo', texto: 'Ouvir minha história com entusiasmo, celebrando juntos com atenção total' },
      { letra: 'E', idioma: 'palavras', texto: 'Elogios genuínos, reconhecimento do meu esforço, orgulho explícito' },
    ],
  },
  {
    number: 6,
    tituloCenario: 'Lidar com insegurança/ansiedade',
    cenario: 'Você está ansioso(a), inseguro(a) ou com medo. Como seu parceiro poderia tranquilizá-lo(a)?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Um presente que represente segurança, permanência ou esperança' },
      { letra: 'B', idioma: 'servico', texto: 'Ações práticas que resolvam minha preocupação ou me protejam' },
      { letra: 'C', idioma: 'toque', texto: 'Abraços constantes, estar próximo, contato físico reconfortante' },
      { letra: 'D', idioma: 'tempo', texto: 'Conversas profundas onde você me tranquiliza e me faz sentir ouvido(a)' },
      { letra: 'E', idioma: 'palavras', texto: 'Reafirmações de amor, lealdade, segurança e certeza sobre nós' },
    ],
  },
  {
    number: 7,
    tituloCenario: 'Diferenças e conflito de valores',
    cenario: 'Vocês têm uma diferença significativa de valores ou perspectivas. Como manter a conexão?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Um presente que celebre nossa unicidade ou nossa história juntos' },
      { letra: 'B', idioma: 'servico', texto: 'Esforços práticos para respeitar e apoiar o que é importante para você' },
      { letra: 'C', idioma: 'toque', texto: 'Proximidade e carinho que transcenda as diferenças' },
      { letra: 'D', idioma: 'tempo', texto: 'Conversas honestas e profundas tentando realmente entender' },
      { letra: 'E', idioma: 'palavras', texto: 'Validação de minhas perspectivas, mesmo em desacordo' },
    ],
  },
  {
    number: 8,
    tituloCenario: 'Sentindo-se pouco atraente',
    cenario: 'Você não se sente bonito(a), sexy ou atraente. Como seu parceiro mudaria isso?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Um presente que valorize minha aparência ou meu corpo (roupa, perfume)' },
      { letra: 'B', idioma: 'servico', texto: 'Cuidados que me fazem sentir bem (spa, massagem, momentos relaxantes)' },
      { letra: 'C', idioma: 'toque', texto: 'Demonstração clara de desejo (beijos, carícias, olhares de atração)' },
      { letra: 'D', idioma: 'tempo', texto: 'Momentos especiais onde sinto sua atenção e escolha em mim' },
      { letra: 'E', idioma: 'palavras', texto: 'Elogios frequentes sobre minha aparência e afirmações de atração' },
    ],
  },
  {
    number: 9,
    tituloCenario: 'Rotina apagando a chama',
    cenario: 'A monotonia do dia a dia está apagando o relacionamento. O que reacenderia a faísca?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Surpresas inesperadas, presentes criativos que quebrem a rotina' },
      { letra: 'B', idioma: 'servico', texto: 'Um gesto inesperado de cuidado e devoção que quebre padrões' },
      { letra: 'C', idioma: 'toque', texto: 'Reencontrar paixão, intimidade renovada, redescoberta física' },
      { letra: 'D', idioma: 'tempo', texto: 'Atividades novas juntos, saindo da rotina, momentos frescos' },
      { letra: 'E', idioma: 'palavras', texto: 'Reafirmações de amor renovado e redescoberta do valor um do outro' },
    ],
  },
  {
    number: 10,
    tituloCenario: 'Apoio em meta pessoal importante',
    cenario: 'Você tem uma meta significativa. Como gostaria que seu parceiro apoiasse?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Um presente motivacional que simbolize essa jornada ou que me inspire' },
      { letra: 'B', idioma: 'servico', texto: 'Ajuda prática liberando seu tempo para focar na meta' },
      { letra: 'C', idioma: 'toque', texto: 'Abraços de encorajamento, proximidade durante momentos difíceis' },
      { letra: 'D', idioma: 'tempo', texto: 'Ouvir sobre minha meta, discuti-la, me motivar, estar presente' },
      { letra: 'E', idioma: 'palavras', texto: 'Encorajamento verbal constante, crença inabalável em mim' },
    ],
  },
  {
    number: 11,
    tituloCenario: 'Desejo de sentir prioridade',
    cenario: 'Você quer se sentir escolhido(a) e prioridade. Como seu parceiro deveria mostrar?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Presentes frequentes que mostrem que ele/a pensa em mim constantemente' },
      { letra: 'B', idioma: 'servico', texto: 'Sacrifícios práticos que provem que sou importante' },
      { letra: 'C', idioma: 'toque', texto: 'Iniciativa constante de proximidade e intimidade' },
      { letra: 'D', idioma: 'tempo', texto: 'Desligar tudo (celular, trabalho) para estar comigo' },
      { letra: 'E', idioma: 'palavras', texto: 'Me dizer explicitamente que sou sua prioridade número um' },
    ],
  },
  {
    number: 12,
    tituloCenario: 'Reconstrução pós-grande conflito',
    cenario: 'Vocês superaram uma crise séria no relacionamento. Como reconstruir confiança e amor?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Um presente que simbolize novo começo e esperança' },
      { letra: 'B', idioma: 'servico', texto: 'Ações consistentes que provem mudança genuína' },
      { letra: 'C', idioma: 'toque', texto: 'Reestabelecimento gradual de intimidade e conexão física' },
      { letra: 'D', idioma: 'tempo', texto: 'Conversas honestas, vulneráveis e dedicadas à reconstrução' },
      { letra: 'E', idioma: 'palavras', texto: 'Pedidos de desculpas profundos e reafirmações diárias de amor' },
    ],
  },
  {
    number: 13,
    tituloCenario: 'Quando você está sobrecarregado(a)',
    cenario: 'Você está exausto(a) de responsabilidades. O que faria você se sentir aliviado(a)?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Uma pequena surpresa que me faça sorrir e relaxar' },
      { letra: 'B', idioma: 'servico', texto: 'Ele/a pegar algumas responsabilidades para aliviar minha carga' },
      { letra: 'C', idioma: 'toque', texto: 'Carinho e proximidade que acalmem minha fadiga' },
      { letra: 'D', idioma: 'tempo', texto: 'Conversas onde você me ouve e valida minha situação' },
      { letra: 'E', idioma: 'palavras', texto: 'Reconhecimento dos meus esforços e encorajamento' },
    ],
  },
  {
    number: 14,
    tituloCenario: 'Lidando com ciúmes ou insegurança',
    cenario: 'Existe insegurança ou ciúmes no relacionamento. O que ajudaria a resolver?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Um presente que reafirme meu lugar especial e único' },
      { letra: 'B', idioma: 'servico', texto: 'Ações consistentes que criem segurança e conforto' },
      { letra: 'C', idioma: 'toque', texto: 'Demonstração clara de desejo e exclusividade física' },
      { letra: 'D', idioma: 'tempo', texto: 'Atenção focada que deixe claro que sou escolhido(a)' },
      { letra: 'E', idioma: 'palavras', texto: 'Reafirmações frequentes e explícitas de amor e exclusividade' },
    ],
  },
  {
    number: 15,
    tituloCenario: 'Conflito sobre responsabilidades',
    cenario: 'Vocês discordam sobre divisão de tarefas. Como isso afeta seu senso de amor?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Um presente que reconheça meu esforço apesar de desacordos' },
      { letra: 'B', idioma: 'servico', texto: 'Engajamento real na divisão equilibrada de responsabilidades' },
      { letra: 'C', idioma: 'toque', texto: 'Carinho que reconecte apesar das tensões práticas' },
      { letra: 'D', idioma: 'tempo', texto: 'Conversas sobre como colaborar juntos, não como adversários' },
      { letra: 'E', idioma: 'palavras', texto: 'Reconhecimento público e privado do meu trabalho e valor' },
    ],
  },
  {
    number: 16,
    tituloCenario: 'Momento de intimidade desejada',
    cenario: 'Você deseja intimidade emocional e/ou física. O que faria você se sentir realmente conectado(a)?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Uma surpresa romântica que mostre planejamento e carinho' },
      { letra: 'B', idioma: 'servico', texto: 'Gesto de cuidado que facilite e prepare o momento (banho, velas)' },
      { letra: 'C', idioma: 'toque', texto: 'Contato físico constante, beijos, carícias e intimidade genuína' },
      { letra: 'D', idioma: 'tempo', texto: 'Momento sem pressa, conversas profundas olho no olho' },
      { letra: 'E', idioma: 'palavras', texto: 'Afirmações de desejo, beleza e importância durante intimidade' },
    ],
  },
  {
    number: 17,
    tituloCenario: 'Sentindo-se incompreendido(a)',
    cenario: 'Você se sente profundamente não compreendido(a) pelo seu parceiro. O que mudaria?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Um presente que mostre que ele/a realmente conhece seus desejos' },
      { letra: 'B', idioma: 'servico', texto: 'Ações que demonstrem cuidado com o que REALMENTE importa para você' },
      { letra: 'C', idioma: 'toque', texto: 'Carinho que comunique aceitação apesar de diferenças' },
      { letra: 'D', idioma: 'tempo', texto: 'Conversa genuína: perguntar, ouvir REALMENTE, tentar entender' },
      { letra: 'E', idioma: 'palavras', texto: 'Validação de seus sentimentos e perspectivas' },
    ],
  },
  {
    number: 18,
    tituloCenario: 'Visão compartilhada do futuro',
    cenario: 'Você quer que seu parceiro compartilhe sua visão de futuro. Como ele/a deveria demonstrar?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Presentes que representem futuros sonhos compartilhados' },
      { letra: 'B', idioma: 'servico', texto: 'Ações práticas construindo passos concretos para esse futuro' },
      { letra: 'C', idioma: 'toque', texto: 'Demonstração física de compromisso e permanência' },
      { letra: 'D', idioma: 'tempo', texto: 'Conversas sobre sonhos, planejamento conjunto e visão compartilhada' },
      { letra: 'E', idioma: 'palavras', texto: 'Afirmações explícitas de que quer esse futuro com você' },
    ],
  },
  {
    number: 19,
    tituloCenario: 'Recuperação emocional mútua',
    cenario: 'Você e seu parceiro estão distantes emocionalmente. O que reacenderia a conexão?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Gesto simbólico que represente retorno do amor' },
      { letra: 'B', idioma: 'servico', texto: 'Retomada de cuidados práticos que demonstrem devoção renovada' },
      { letra: 'C', idioma: 'toque', texto: 'Retomada gradual de intimidade, abraços, beijos frequentes' },
      { letra: 'D', idioma: 'tempo', texto: 'Momentos dedicados para reconexão e fortalecimento' },
      { letra: 'E', idioma: 'palavras', texto: 'Conversas sobre o que ainda nos une e reafirmação de amor' },
    ],
  },
  {
    number: 20,
    tituloCenario: 'Validação e reconhecimento pessoal',
    cenario: 'Você precisa ser visto(a), validado(a) e reconhecido(a) como pessoa. Como seu parceiro faria isso?',
    opcoes: [
      { letra: 'A', idioma: 'presentes', texto: 'Um presente que mostre que você é especial e que ele/a pensa em você' },
      { letra: 'B', idioma: 'servico', texto: 'Ações que priorizem seu bem-estar e felicidade' },
      { letra: 'C', idioma: 'toque', texto: 'Abraços, beijos e demonstração física de apego e desejo' },
      { letra: 'D', idioma: 'tempo', texto: 'Atenção exclusiva, conversas significativas, ser realmente ouvido(a)' },
      { letra: 'E', idioma: 'palavras', texto: 'Elogios constantes, reconhecimento e afirmações de valor pessoal' },
    ],
  },
];
