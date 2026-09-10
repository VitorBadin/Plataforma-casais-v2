import { Temperamento } from '@/types/temperamentoTypes';
import { TemperamentoReportData, MentorConfig } from '@/types/temperamentoReportTypes';

export const DEFAULT_MENTOR_CONFIG: MentorConfig = {
  nome: 'Elaine Souza',
  titulo: 'Psicóloga Especialista em Relacionamentos e Casais',
  registro: 'CRP 06/123456',
  bio: 'Mentora de casais e criadora da metodologia de integração conjugal baseada em temperamentos e inteligência emocional.',
};

/**
 * RELATÓRIO COMPLETO 1 DE 4 — COLÉRICO 🔥
 */
export const COLERICO_REPORT_DATA: TemperamentoReportData = {
  temperamento: 'colerico',
  nome: 'Colérico',
  emoji: '🔥',
  tagline: 'O Líder Natural, Realizador e Determinado',

  // PARTE 1: QUEM VOCÊ É?
  parte1: {
    essencia: {
      titulo: 'O Colérico em Essência',
      resumo:
        'Você é um LÍDER NATURAL. Seu temperamento é caracterizado pela ação rápida, determinação inabalável e foco em resultados. Coléricos são os "fazedores" do mundo — pessoas que veem um problema e imediatamente traçam um plano para resolvê-lo.',
      descricao:
        'Você opera a partir da lógica e da ação, não da emoção. Quando as coisas não estão saindo como o planejado, você sente uma urgência visceral para intervir e corrigir. Você não é do tipo que fica remoendo ou esperando — você age.',
    },
    comoProcessaMundo: {
      velocidade: {
        titulo: 'Velocidade: Você processa informações RAPIDAMENTE',
        itens: [
          'Lê situações em segundos',
          'Toma decisões em minutos',
          'Gosta de eficiência e agilidade',
          'Fica frustrado com pessoas lentas ou indecisas',
        ],
      },
      objetivo: {
        titulo: 'Objetivo: Você é ORIENTADO PARA RESULTADOS',
        itens: [
          'Quer ver progresso tangível',
          'Mede sucesso por conquistas concretas',
          'Não tolera falhas pessoais bem',
          'Precisa ver impacto do seu trabalho',
        ],
      },
      controle: {
        titulo: 'Controle: Você precisa estar NO CONTROLE',
        itens: [
          'Gosta de estrutura clara (se você a criou)',
          'Sente desconforto quando não sabe o que esperar',
          'Quer ter a "última palavra"',
          'Dificuldade em delegar porque "talvez não saia do jeito certo"',
        ],
      },
      comunicacao: {
        titulo: 'Comunicação: Você é DIRETO E FRANCO',
        itens: [
          'Fala o que pensa sem filtro',
          'Vê como honestidade; outros veem como brutalidade',
          'Detesta "joguinhos" ou comunicação passiva-agressiva',
          'Prefere confronto direto a boatos',
        ],
      },
    },
    pontosFortes: [
      {
        titulo: 'LIDERANÇA NATURAL',
        descricao:
          'Você naturalmente assume responsabilidades e toma frente em situações caóticas. Pessoas confiam em sua capacidade de decisão porque você é decisivo. Você não fica paralisado por dúvidas — você age.',
        ondeBrilha:
          'Crises, projetos que precisam de direção, quando alguém precisa tomar uma decisão difícil.',
      },
      {
        titulo: 'EXECUÇÃO E REALIZAÇÃO',
        descricao:
          'Enquanto outros planejam, você já estava implementando. Você tem uma energia irresistível quando está focado em um objetivo. Deixa pouco tempo entre "tenho uma ideia" e "já está feito".',
        ondeBrilha:
          'Transformar planos em ação, atingir metas, completar projetos.',
      },
      {
        titulo: 'CORAGEM E AUDÁCIA',
        descricao:
          'Você não tem medo de fracassar publicamente. Isso te permite tentar coisas que outros não ousariam. Você enfrenta desafios de frente, o que te coloca em posição de conquistar o que outros veem como impossível.',
        ondeBrilha:
          'Empreendedorismo, tomada de risco calculado, lidar com situações de pressão extrema.',
      },
      {
        titulo: 'EFICIÊNCIA',
        descricao:
          'Você odeia desperdício de tempo. Isso faz você organizar sistemas, eliminar processos desnecessários e encontrar o caminho mais curto entre dois pontos. Você não segue tradição "porque sempre foi assim" — você questiona tudo.',
        ondeBrilha:
          'Otimização, mudança de processos, resolver gargalos.',
      },
      {
        titulo: 'CONFIABILIDADE PRÁTICA',
        descricao:
          'Quando você promete algo, as pessoas sabem que será feito. Seu senso de responsabilidade é inabalável. Se você se comprometeu, você vai cumprir custe o que custar (às vezes prejudicando você mesmo).',
        ondeBrilha:
          'Posições de responsabilidade, criar sistemas que funcionam, ser o "porto seguro" em crises.',
      },
    ],
    desafios: [
      {
        titulo: 'IMPACIÊNCIA DESTRUTIVA',
        descricao:
          'Você quer resultados ONTEM: interrompe pessoas constantemente, fica irritado com o ritmo natural das coisas, força mudanças antes de serem necessárias, culpa outros pela "lentidão".',
        ondePrejudica: 'Relacionamentos, delegação, criatividade.',
        sinalAlerta:
          'Você explicou 3x e já está irritado na 4ª explicação.',
      },
      {
        titulo: 'FALTA DE EMPATIA',
        descricao:
          'Você processa através de LÓGICA, não emoção: quando alguém está chateado, você quer "resolver"; minimiza sentimentos com "mas logicamente..."; não compreende por que alguém não consegue simplesmente "superar".',
        ondePrejudica: 'Relacionamentos, amizades, liderança.',
        sinalAlerta:
          '"Por que você está triste? Vamos resolver isso e pronto!" (ele/ela queria ser ouvido, não consertado).',
      },
      {
        titulo: 'DOMÍNIO E CONTROLE',
        descricao:
          'Você precisa estar no comando: questiona autoridade constantemente, tem dificuldade em trabalhar com alguém "igual", precisa ter "a última palavra".',
        ondePrejudica: 'Relacionamentos, carreira, família.',
        sinalAlerta:
          'Você já pensou "Se ele/ela tivesse feito do meu jeito..." mais de uma vez.',
      },
      {
        titulo: 'RAIVA E AGRESSIVIDADE VERBAL',
        descricao:
          'Sua emoção sai rápido e forte: pode explodir verbalmente sem filtro, falar coisas que prejudicam depois que se acalma, não conseguir "desligar" de uma discussão.',
        ondePrejudica: 'Relacionamento, confiança, legado emocional.',
        sinalAlerta:
          'Depois de explodir, você pensa "Por que falei isso? Mas estava certo...".',
      },
      {
        titulo: 'PERFECCIONISMO E CRÍTICA',
        descricao:
          'Você tem padrões altos, mas é cruel com quem não os atinge: aponta erros constantemente, usa crítica como "motivação", não consegue apreciar 80% bom feito por outro.',
        ondePrejudica: 'Relacionamento, filhos, equipe.',
        sinalAlerta: 'Seu parceiro já disse "Você nunca fica satisfeito"?',
      },
    ],
  },

  // PARTE 2: SEU DESENVOLVIMENTO PESSOAL
  parte2: {
    virtudes: [
      {
        numero: 1,
        titulo: 'EMPATIA VERDADEIRA',
        emoji: '💝',
        porQueEssencial:
          'Você é um líder, e líderes sem empatia criam ambientes de medo, não de lealdade. Sentimentos não são ilógicos — eles SÃO dados válidos.',
        oQueSignifica: [
          'NÃO significa ser mole ou passivo',
          'SIGNIFICA entender que a pessoa tem razão em SENTIR assim, mesmo que a "lógica" seja diferente',
          'SIGNIFICA pausar 30 segundos antes de oferecer solução',
          'SIGNIFICA dizer "Entendo por que você se sente assim" antes de "Mas..."',
        ],
        comoSaber: [
          'Consegue deixar alguém terminar de falar sem interromper',
          'Consegue dizer "Tudo bem estar triste" sem precisar consertar',
          'Parceiro/família diz "Você realmente me ouve agora"',
          'Consegue manter a calma quando alguém está emocional',
        ],
      },
      {
        numero: 2,
        titulo: 'PACIÊNCIA ESTRATÉGICA',
        emoji: '⏳',
        porQueEssencial:
          'Relacionamento forte e legado duradouro só se constroem com TEMPO. A impaciência afasta exatamente do que mais se deseja.',
        oQueSignifica: [
          'NÃO significa não fazer nada',
          'SIGNIFICA reconhecer que crescimento leva tempo',
          'SIGNIFICA que algumas coisas precisam de espaço para acontecer naturalmente',
          'SIGNIFICA avançar em uma frente enquanto outras se desenvolvem',
        ],
        comoSaber: [
          'Consegue esperar respostas de pessoas sem pressionar',
          'Consegue deixar alguém "processar" sem forçar decisão',
          'Consegue trabalhar em longo prazo sem sabotá-lo',
          'As pessoas sentem menos pressão ao seu redor',
        ],
      },
      {
        numero: 3,
        titulo: 'HUMILDADE E ADMISSÃO DE ERRO',
        emoji: '🙏',
        porQueEssencial:
          'Reconhecer erro (sem culpa excessiva) é o que diferencia um bom líder de um tirano, e é o que permite aprendizado genuíno.',
        oQueSignifica: [
          'NÃO significa menosprezar suas habilidades',
          'SIGNIFICA reconhecer que não sabe tudo',
          'SIGNIFICA pedir ajuda sem sentir-se diminuído',
          'SIGNIFICA dizer "Errei" e seguir sem remoer',
        ],
        comoSaber: [
          'Consegue dizer "Não sei" sem defensividade',
          'Consegue receber crítica sem explodir',
          'Consegue admitir erro rápido sem longas explicações',
          'As pessoas se sentem seguras o questionando',
        ],
      },
    ],
    planoDesenvolvimento: [
      {
        mesNumero: 1,
        tituloMes: 'Entender Sua Empatia',
        atividades: [
          {
            periodo: 'Semana 1-2',
            titulo: 'Exercício da Escuta Ativa',
            descricao:
              'Em conversas importantes (especialmente com o parceiro), o único trabalho é OUVIR sem interromper, sem oferecer solução, sem discordar. A pessoa fala, você só ouve, e ao final diz apenas: "Entendi. Tudo bem você se sentir assim."',
            duracaoOuFrequencia: '10 minutos por dia, 5 dias por semana',
            meta: 'Perceber que a pessoa fica mais calma quando você só ouve.',
          },
          {
            periodo: 'Semana 3-4',
            titulo: 'Journaling de Empatia',
            descricao:
              'Todas as noites, escreva 3 coisas: algo que alguém sentiu hoje; por que essa pessoa provavelmente se sentiu assim (lógica emocional, não racional); uma coisa que você poderia ter dito mas não disse (e por que isso teria sido melhor).',
            duracaoOuFrequencia: '5 minutos por dia',
            meta: 'Perceber padrões de quando sua dureza prejudica.',
          },
        ],
      },
      {
        mesNumero: 2,
        tituloMes: 'Desenvolver Paciência',
        atividades: [
          {
            periodo: 'Semana 5-6',
            titulo: 'Exercício da Respiração Estratégica',
            descricao:
              'Quando sentir irritação subindo: inspire lentamente por 4 contagens, segure por 4, expire por 4, e pense "Meu objetivo aqui é resolver COM essa pessoa, não CONTRA ela" antes de falar.',
            duracaoOuFrequencia: 'Toda vez que sentir raiva subindo',
            meta: 'Notar que decisões tomadas "calmo" são melhores.',
          },
          {
            periodo: 'Semana 7-8',
            titulo: 'Mapeamento de Prioridades',
            descricao:
              'Liste 10 coisas que quer mudar em sua vida/relacionamento. Para cada uma, classifique "Urgente = Hoje?" ou "Importante = Este mês?". Perceba que 80% do que trata como urgente na verdade tem prazo de semanas ou meses, e reclassifique.',
            meta: 'Entender que nem tudo precisa ser resolvido hoje.',
          },
        ],
      },
      {
        mesNumero: 3,
        tituloMes: 'Construir Humildade',
        atividades: [
          {
            periodo: 'Semana 9-10',
            titulo: 'Exercício de Admiração',
            descricao:
              'Escolha alguém que admira (parceiro, chefe, colega, amigo) e pergunte: "Em qual área você acha que sou mais fraco?" — sem argumentar a resposta, só ouvindo. Depois reflita se essa pessoa tem razão.',
            duracaoOuFrequencia: 'Uma vez por semana',
            meta: 'Aceitar feedback sem explodir.',
          },
          {
            periodo: 'Semana 11-12',
            titulo: 'Prática de Pedir Ajuda',
            descricao:
              'Identifique 1 área onde não é excelente e, nessa semana, peça ajuda a alguém nessa área ("Você é melhor nisso que eu, você me ensina?").',
            duracaoOuFrequencia: 'Uma vez por semana, durante 4 semanas',
            meta: 'Perceber que pedir ajuda não diminui.',
          },
        ],
      },
      {
        mesNumero: 4,
        tituloMes: 'Integração e Prática',
        atividades: [
          {
            periodo: 'Semana 13-14',
            titulo: 'Semana da Apreciação',
            descricao:
              'Todos os dias, diga a alguém importante uma coisa que você aprecia nele/nela, no formato: "Eu aprecio quando você [comportamento específico] porque isso [resultado que gerou]."',
            duracaoOuFrequencia: '1 minuto por dia',
            meta: 'Treinar o cérebro para notar o bom, não só o errado.',
          },
          {
            periodo: 'Semana 15-16',
            titulo: 'Revisão do Mês',
            descricao:
              'Reflita por escrito (15 minutos): em qual virtude progrediu mais; qual pessoa notou mudança; qual foi o momento em que "quase explodiu" mas não explodiu; o que mudou nos relacionamentos.',
            duracaoOuFrequencia: '15 minutos',
            meta: 'Solidificar o novo padrão.',
          },
        ],
      },
      {
        mesNumero: 5,
        tituloMes: 'Prática Contínua',
        atividades: [
          {
            periodo: 'Semana 17-20 (Mês 5)',
            titulo: 'Prática Contínua de Hábitos',
            descricao:
              'Escolha 2 das 12 atividades que mais funcionaram e continue com elas indefinidamente.',
            meta: 'Transformar essas virtudes em parte automática de si mesmo.',
          },
        ],
      },
    ],
  },

  // PARTE 3: VOCÊ NO RELACIONAMENTO 💕
  parte3: {
    formaDeAmar: {
      titulo: 'Sua Forma de Amar: Protetora e Prática',
      descricao:
        'Como colérico, sua forma de amar é PROTETORA E PRÁTICA — através de ação, responsabilidade e provisão.',
      ladoLuminoso: [
        'Estar lá quando importa: você não deixa o parceiro "pendurado"; se prometeu, cumpre; em crise, é a rocha.',
        'Resolver problemas: vê um problema no parceiro e quer consertar; tira soluções da cartola; age para melhorar a vida dele/dela.',
        'Proteger: é protetor (às vezes excessivamente); quer "vencer" pela pessoa que ama; se coloca como escudo.',
        'Prover: trabalha duro para garantir conforto; tira do bolso sem reclamar; quer ser bem-sucedido para poder oferecer.',
      ],
      ladoDificil:
        'Você ama FAZENDO, não SENTINDO. O parceiro às vezes quer que você SINTA com ele, não que resolva; você oferece soluções quando ele precisava só de um abraço; age rápido quando ele ainda está processando; ama "à sua forma", não "à forma que o parceiro precisa".',
    },
    padroesConflito: [
      {
        numero: 1,
        titulo: 'Você vira juiz, não parceiro',
        descricao:
          'O parceiro faz algo que você considera "errado" ou "ineficiente", você imediatamente vira crítico, aponta o erro como óbvio, o parceiro se sente diminuído, e você fica confuso porque "estava certo". Isso acontece porque você entra em "modo de resolução de problemas", mas o que o parceiro escuta é rejeição.',
        exemplo:
          'Parceiro diz: "Não consigo organizar meu guarda-roupa"; você responde automaticamente: "Não é difícil, vou mostrar como se faz"; o parceiro pensa: "Ele(a) acha que sou incompetente".',
      },
      {
        numero: 2,
        titulo: 'Você toma decisões sem o parceiro',
        descricao:
          'Identifica o que precisa ser feito e já está implementando; o parceiro descobre depois e se sente excluído/controlado. Na sua mente você está sendo eficiente; na mente dele, autoritário.',
        exemplo:
          '"Decidi que vamos mudar de apartamento, já marquei visita para amanhã" → "Você nunca me consultou, pareço decoração aqui" → "Mas é óbvio que é melhor!".',
      },
      {
        numero: 3,
        titulo: 'Você não consegue "desligar" de uma discussão',
        descricao:
          'Entra em "modo de ganhar" e não para até vencer, mesmo com o parceiro pedindo trégua várias vezes. Para você a discussão é um problema a resolver; para ele, só precisa parar de brigar.',
        exemplo:
          '30 minutos batendo na mesma discussão, parceiro pede para parar, você insiste "mas você não entende meu ponto!", e ele sai desesperado.',
      },
      {
        numero: 4,
        titulo: 'Você fala "verdades duras" quando está irritado',
        descricao:
          'Sem filtro, solta coisas que vinha guardando, achando que está sendo honesto; o parceiro fica devastado; depois você se arrepende, mas o dano está feito. Seu cérebro em modo de raiva entra em "modo de neutralizar ameaça" e fala para desativar.',
        exemplo:
          'Numa discussão pequena, você explode com uma comparação cruel; o parceiro fica em choque; horas depois você se pergunta por que falou aquilo.',
      },
      {
        numero: 5,
        titulo: 'Você exige que o parceiro "supere" rápido',
        descricao:
          'Algo ruim acontece, você já está em modo de ação e quer que ele também aja, mas ele ainda está processando emocionalmente — velocidades diferentes.',
        exemplo:
          'Parceiro perde o emprego, você já sugere enviar currículos, ele diz que está devastado e precisa de tempo, você insiste que agir rápido resolve mais rápido, e ele se sente sozinho.',
      },
    ],
    oQueParceiroPrecisaSaber: [
      {
        topico: 'Sua impaciência não é rejeição',
        explicacao:
          'Você se frustra com a situação, não com a pessoa, mas demonstra de um jeito que machuca.',
        fraseParaOParceiro:
          'Quando fico irritado, não é com você, é com a situação. Não leve para o lado pessoal.',
      },
      {
        topico: 'Você está tentando ajudar, mesmo quando parece controle',
        explicacao:
          'Seu impulso é resolver, não controlar; às vezes seu jeito é melhor, às vezes não, mas a intenção é boa.',
        fraseParaOParceiro:
          'Quando ofereço dicas, acho que vai ajudar. Se estou sendo chato, me avisa que eu paro — mas é porque me importo.',
      },
      {
        topico: 'Você ama através de ação, não de palavras',
        explicacao:
          'Pode nunca ser romântico no sentido tradicional, mas mostra amor estando presente, resolvendo problemas, protegendo e provendo.',
        fraseParaOParceiro:
          'Meu jeito pode não parecer romântico, mas é real. Quando faço essas ações práticas, é amor.',
      },
      {
        topico: 'Você não consegue "desligar" facilmente',
        explicacao:
          'Uma vez em "modo de resolver", é difícil parar; às vezes o parceiro só quer parar, sem resolver.',
        fraseParaOParceiro:
          'Às vezes você vai precisar ser firme e dizer "vamos parar agora". Eu vou respeitar.',
      },
      {
        topico: 'Sua dureza verbal machuca mais do que você sabe',
        explicacao:
          'O parceiro lembra da pior coisa dita na raiva, e ela martela por dias, mesmo que você já tenha "virado a página".',
        fraseParaOParceiro:
          'Minhas palavras na raiva não representam meus sentimentos reais. Estou trabalhando nisso. Eu te amo.',
      },
    ],
    acoesConcretas: [
      {
        numero: 1,
        titulo: 'Protocolo de Pausa',
        descricao:
          'Qualquer um pode dizer "vamos pausar"; você para imediatamente, vocês se separam por 20-30 min e voltam calmos. Use sempre que sentir raiva acumulando.',
      },
      {
        numero: 2,
        titulo: 'Dia de Planejamento Conjunto',
        descricao:
          'Uma vez por semana/mês, sentam juntos, trazem ideias, decidem e executam juntos. Duração de 30-45 min/semana.',
      },
      {
        numero: 3,
        titulo: 'Regra de Ouro da Crítica',
        descricao:
          'Formato: "Eu APRECIO [algo que você faz bem]. DESAFIO: [o que poderia melhorar, sem julgar]. CRENÇA: eu acredito que você consegue." Use sempre que precisar apontar algo.',
      },
      {
        numero: 4,
        titulo: 'Check-in Diário de 10 Minutos',
        descricao:
          'Cada um fala 5 minutos sem interrupção, todos os dias.',
      },
      {
        numero: 5,
        titulo: 'Zonas de Não-Ação',
        descricao:
          'Liste decisões que você toma sozinho (trabalho, amigos, tempo pessoal) e zonas compartilhadas (finanças, férias, moradia, filhos). Revise a cada 6 meses.',
      },
      {
        numero: 6,
        titulo: 'Sanduíche de Apreciação',
        descricao:
          '"Eu realmente aprecio quando você... / O desafio que estou vendo é... / Mas eu acredito e amo você." Use sempre que precisar criticar.',
      },
      {
        numero: 7,
        titulo: 'Palavra de Segurança',
        descricao:
          'Uma palavra (ex: "Pausa", "Amarelo") que o parceiro usa quando você está "muito colérico"; ao ouvi-la, você para e reconhece.',
      },
      {
        numero: 8,
        titulo: 'Conversas Programadas para Tópicos Difíceis',
        descricao:
          'Tópicos sérios são agendados, não reativos, para que ambos processem antes.',
      },
      {
        numero: 9,
        titulo: 'Semana de Escuta Ativa',
        descricao:
          'Uma vez por mês, dedique-se especialmente a ouvir sem oferecer solução, só validando.',
      },
      {
        numero: 10,
        titulo: 'Revisão Trimestral do Relacionamento',
        descricao:
          'A cada 3 meses, cada um responde: o que apreciou, qual foi o desafio, o que precisa do outro, como posso melhorar — e fazem um plano para os próximos 3 meses.',
      },
    ],
    compatibilidade: [
      {
        temperamentoAlvo: 'colerico',
        titulo: 'Colérico com Colérico 🔥 + 🔥',
        pontosPositivos:
          'Ambos querem ação e resultados; excelente dinâmica para empreendimentos, metas financeiras e grandes realizações conjuntas.',
        pontosAtencao:
          'Dois chefes não se submetem facilmente; risco elevado de explosões e disputas de poder simultâneas.',
        dica: 'Definir claramente quem lidera em qual área da vida a dois (divisão de territórios de decisão).',
      },
      {
        temperamentoAlvo: 'sanguineo',
        titulo: 'Colérico com Sanguíneo 🔥 + 💨',
        pontosPositivos:
          'O parceiro traz leveza, humor, entusiasmo e diversão; você traz foco, estrutura e realização.',
        pontosAtencao:
          'Você quer resolver e avançar rápido, ele quer desfrutar e socializar. Pode haver atrito com horários e organização.',
        dica: 'Aprenda a pausar, desacelerar e curtir momentos de descontração sem exigir produtividade constante.',
      },
      {
        temperamentoAlvo: 'melancolico',
        titulo: 'Colérico com Melancólico 🔥 + 🌊',
        pontosPositivos:
          'O melancólico equilibra você com profundidade, planejamento detalhado e análise; você dá asas e tração para as ideias dele.',
        pontosAtencao:
          'Você quer agir de imediato, ele precisa analisar e refletir profundamente antes de decidir. Críticas duras ferem profundamente o melancólico.',
        dica: 'Dê tempo para ele processar emoções e pensamentos. Nunca use sarcasmo ou ironia ao discordar.',
      },
      {
        temperamentoAlvo: 'fleumatico',
        titulo: 'Colérico com Fleumático 🔥 + 🌿',
        pontosPositivos:
          'Ele traz a calma, diplomacia e estabilidade necessárias para sua intensidade; você defende os interesses do casal e lidera com coragem.',
        pontosAtencao:
          'Ele tende a evitar confrontos e pode parecer passivo; você pode se irritar com a falta de iniciativa e atropelar suas vontades.',
        dica: 'Motive com convite caloroso e apreciação, nunca com comandos ou cobranças autoritárias.',
      },
    ],
  },

  // PARTE 4: SEUS PRÓXIMOS PASSOS 🚀
  parte4: {
    proximosPassos: {
      duasSemanas: [
        'Leia este laudo na íntegra (não de forma corrida, absorvendo cada seção)',
        'Identifique seus 3 padrões de conflito mais presentes (qual dos 5 é você?)',
        'Escolha 2 ações concretas (comece apenas com essas 2 para não dispersar)',
        'Compartilhe com o parceiro (leiam juntos a seção "O que seu parceiro precisa saber")',
        'Agende a mentoria para casais (onde isso será trabalhado e aprofundado junto)',
      ],
      quatroSemanas: [
        'Implemente no cotidiano as 2 ações concretas escolhidas',
        'Faça o journaling de empatia (atividades práticas do Mês 1)',
        'Observe e anote as mudanças (como o parceiro responde? como você se sente?)',
        'Prepare suas reflexões e dúvidas para a próxima sessão de mentoria',
      ],
    },
    mensagemFinal:
      'Caro Colérico, você é uma força. Você consegue mover montanhas, transforma ideias em realidade, e o mundo precisa de sua determinação, coragem e ação. Mas as pessoas que você ama precisam que você transforme essa força em sabedoria — seu parceiro não é um problema a resolver, seu filho não é um projeto a otimizar, seu amigo não é um incompetente a corrigir. Eles são pessoas que precisam de você inteiro: sua força e sua gentileza. Sua missão agora não é vencer mais discussões — é construir um relacionamento onde ambos ganham. Você já construiu muito sucesso profissional; seu relacionamento merece a mesma dedicação. Comece hoje, comece pequeno, mas comece.',
    recursos: {
      livrosRecomendados: [
        {
          titulo: 'Os 5 Idiomas do Amor',
          autor: 'Gary Chapman',
        },
        {
          titulo: 'Comunicação Não-Violenta',
          autor: 'Marshall Rosenberg',
        },
        {
          titulo: 'Empatia: O Poder de Entender os Outros',
          autor: 'Roman Krznaric',
        },
      ],
      exerciciosComplementares: [
        'Meditação guiada de 10 minutos por dia para baixar a adrenalina e regular a impulsividade',
        'Caminhada reflexiva sozinho sem fones de ouvido para desacelerar a mente',
        'Escrita reflexiva noturna sobre vitórias na empatia e momentos de autocontrole',
      ],
      sinaisProgresso: [
        'Seu parceiro(a) diz espontaneamente: "Você realmente me ouve agora"',
        'Você consegue sair de uma discussão sem a necessidade compulsiva de "ganhar"',
        'Você reconhece seus erros rapidamente, sem justificativas ou defesas',
        'As pessoas ao seu redor respiram mais aliviadas e relaxadas na sua presença',
      ],
    },
  },
};

/**
 * RELATÓRIOS PLACEHOLDER PARA OS OUTROS 3 TEMPERAMENTOS
 * (Serão alimentados nas próximas partes do prompt com o mesmo padrão)
 */
export const SANGUINEO_REPORT_DATA: TemperamentoReportData = {
  temperamento: 'sanguineo',
  nome: 'Sanguíneo',
  emoji: '💨',
  tagline: 'O Comunicador Empático, Alegre e Espontâneo',
  parte1: {
    essencia: {
      titulo: 'O Sanguíneo em Essência',
      resumo:
        'Você é o coração pulsante de qualquer ambiente. Caracterizado pela extroversão, entusiasmo contagiante e conexão humana genuína.',
      descricao:
        'Sua essência é viver o presente com leveza e inspirar as pessoas ao seu redor.',
    },
    comoProcessaMundo: {
      velocidade: {
        titulo: 'Velocidade: Rápida adaptação e conexão social imediata',
        itens: ['Conecta-se com facilidade', 'Expressa emoções abertamente', 'Gosta de novidades'],
      },
      objetivo: {
        titulo: 'Objetivo: Conexão humana e alegria compartilhada',
        itens: ['Busca harmonia e engajamento', 'Mede o ambiente pelo clima emocional'],
      },
      controle: {
        titulo: 'Controle: Flexibilidade e fluidez',
        itens: ['Prefere espontaneidade a regras rígidas', 'Evita monotonia e burocracia'],
      },
      comunicacao: {
        titulo: 'Comunicação: Expressiva, calorosa e magnética',
        itens: ['Fala com o corpo e emoção', 'Comunica entusiasmo e acolhimento'],
      },
    },
    pontosFortes: [
      {
        titulo: 'COMUNICAÇÃO E CARISMA',
        descricao: 'Facilidade natural de encantar, inspirar e quebrar o gelo.',
        ondeBrilha: 'Socialização, vendas, acolhimento de pessoas.',
      },
      {
        titulo: 'OTIMISMO CONTAGIANTE',
        descricao: 'Enxerga o lado bom das pessoas e das circunstâncias.',
        ondeBrilha: 'Momentos de desânimo da equipe ou do parceiro.',
      },
      {
        titulo: 'ADAPTABILIDADE',
        descricao: 'Flexibilidade diante de mudanças inesperadas.',
        ondeBrilha: 'Ambientes dinâmicos e situações novas.',
      },
      {
        titulo: 'PERDÃO RÁPIDO',
        descricao: 'Não costuma guardar rancor ou remoer o passado.',
        ondeBrilha: 'Resolução de desentendimentos passageiros.',
      },
      {
        titulo: 'GENEROSIDADE AFETIVA',
        descricao: 'Demonstra afeto com facilidade e calor humano.',
        ondeBrilha: 'Criar memórias afetivas felizes no relacionamento.',
      },
    ],
    desafios: [
      {
        titulo: 'FALTA DE CONSTÂNCIA',
        descricao: 'Começa projetos com muito entusiasmo, mas tem dificuldade em terminar.',
        ondePrejudica: 'Rotinas diárias e compromissos de longo prazo.',
        sinalAlerta: 'Muitas tarefas iniciadas e poucas concluídas.',
      },
      {
        titulo: 'IMPULSIVIDADE',
        descricao: 'Fala ou age antes de pensar nas consequências.',
        ondePrejudica: 'Finanças e conversas delicadas.',
        sinalAlerta: 'Prometer coisas no entusiasmo que não consegue cumprir.',
      },
      {
        titulo: 'DESORGANIZAÇÃO',
        descricao: 'Dificuldade com prazos, horários e detalhes operacionais.',
        ondePrejudica: 'Gestão da casa e agenda do casal.',
        sinalAlerta: 'Esquecer compromissos importantes do parceiro.',
      },
      {
        titulo: 'NECESSIDADE DE APROVAÇÃO',
        descricao: 'Sensibilidade excessiva a críticas ou indiferença.',
        ondePrejudica: 'Autoestima e dependência emocional.',
        sinalAlerta: 'Sentir-se rejeitado quando o parceiro precisa de silêncio.',
      },
      {
        titulo: 'SUPERFICIALIDADE TEMPORÁRIA',
        descricao: 'Fuga de assuntos difíceis ou conversas desconfortáveis.',
        ondePrejudica: 'Aprofundamento de intimidade conjugal.',
        sinalAlerta: 'Fazer piada quando o momento exige seriedade.',
      },
    ],
  },
  parte2: {
    virtudes: [
      {
        numero: 1,
        titulo: 'CONSTÂNCIA E FOCO',
        emoji: '🎯',
        porQueEssencial: 'A consistência transforma boas intenções em realizações sólidas.',
        oQueSignifica: ['Concluir o que começou', 'Manter compromissos mesmo sem entusiasmo inicial'],
        comoSaber: ['Termina metas semanais com disciplina'],
      },
      {
        numero: 2,
        titulo: 'TEMPERANÇA E ESCUTA',
        emoji: '🧘',
        porQueEssencial: 'Ouvir mais do que falar aprofunda os laços afetivos.',
        oQueSignifica: ['Guardar silêncio consciente para o outro falar'],
        comoSaber: ['Consegue ouvir 10 minutos sem interromper com suas próprias histórias'],
      },
      {
        numero: 3,
        titulo: 'ORGANIZAÇÃO PRÁTICA',
        emoji: '📋',
        porQueEssencial: 'A estrutura liberta a criatividade e traz paz ao lar.',
        oQueSignifica: ['Ter rotinas claras e honrar horários'],
        comoSaber: ['Chega pontualmente e cumpre os combinados da casa'],
      },
    ],
    planoDesenvolvimento: [
      {
        mesNumero: 1,
        tituloMes: 'Construção de Constância e Rotina',
        atividades: [
          {
            periodo: 'Semana 1-4',
            titulo: 'Regra de Terminar Antes de Começar',
            descricao: 'Não inicie nenhum novo projeto antes de concluir 1 tarefa pendente.',
            meta: 'Reduzir pendências acumuladas.',
          },
        ],
      },
    ],
  },
  parte3: {
    formaDeAmar: {
      titulo: 'Sua Forma de Amar: Afetuosa e Inspiradora',
      descricao: 'Você ama trazendo cor, alegria, presentes e carinho ao cotidiano.',
      ladoLuminoso: ['Presença animada', 'Celebração de datas', 'Carinho físico e verbal'],
      ladoDificil: 'Pode esquecer de responsabilidades rotineiras que também significam cuidado.',
    },
    padroesConflito: [
      {
        numero: 1,
        titulo: 'Fuga de Conversas Sérias',
        descricao: 'Tentar descontrair com humor quando o parceiro precisa de resolução séria.',
        exemplo: 'Fazer piadas durante uma conversa sobre finanças.',
      },
    ],
    oQueParceiroPrecisaSaber: [
      {
        topico: 'Você precisa de afeto e validação',
        explicacao: 'Palavras de incentivo recarregam suas energias.',
        fraseParaOParceiro: 'Quando você reconhece meu esforço, me sinto muito amado(a).',
      },
    ],
    acoesConcretas: [
      {
        numero: 1,
        titulo: 'Agenda Compartilhada',
        descricao: 'Uso de calendário conjunto para não perder compromissos importantes.',
      },
    ],
    compatibilidade: [
      {
        temperamentoAlvo: 'colerico',
        titulo: 'Sanguíneo com Colérico 💨 + 🔥',
        pontosPositivos: 'Equilíbrio dinâmico entre leveza e foco.',
        pontosAtencao: 'Sensibilidade a críticas duras.',
        dica: 'Estabeleçam momentos sagrados de lazer sem foco em produtividade.',
      },
    ],
  },
  parte4: {
    proximosPassos: {
      duasSemanas: [
        'Leia este relatório com atenção',
        'Converse com seu parceiro sobre seus desafios de constância',
      ],
      quatroSemanas: ['Pratique o exercício de escuta sem interrupção'],
    },
    mensagemFinal:
      'Caro Sanguíneo, seu brilho e calor humano são presentes para o mundo. Quando você une seu entusiasmo à disciplina e à escuta atenta, seu relacionamento se torna um porto de amor e alegria genuína.',
    recursos: {
      livrosRecomendados: [
        { titulo: 'O Poder do Hábito', autor: 'Charles Duhigg' },
        { titulo: 'As 5 Linguagens do Amor', autor: 'Gary Chapman' },
      ],
      exerciciosComplementares: ['Lista diária de 3 prioridades concluídas'],
      sinaisProgresso: ['Maior pontualidade e constância nas promessas feitas'],
    },
  },
};

export const MELANCOLICO_REPORT_DATA: TemperamentoReportData = {
  temperamento: 'melancolico',
  nome: 'Melancólico',
  emoji: '🌊',
  tagline: 'O Analista Profundo, Leal e Perfeccionista',
  parte1: {
    essencia: {
      titulo: 'O Melancólico em Essência',
      resumo:
        'Você é guiado pela busca da excelência, pela sensibilidade refinada e por uma profundidade emocional ímpar.',
      descricao:
        'Você valoriza a verdade, o detalhe bem trabalhado e a lealdade incondicional.',
    },
    comoProcessaMundo: {
      velocidade: {
        titulo: 'Velocidade: Reflexiva e analítica',
        itens: ['Pondera antes de opinar', 'Observa detalhes que passam despercebidos'],
      },
      objetivo: {
        titulo: 'Objetivo: Excelência, verdade e profundidade',
        itens: ['Busca sentido profundo em tudo', 'Padrão elevado de qualidade'],
      },
      controle: {
        titulo: 'Controle: Ordem, previsão e coerência',
        itens: ['Sente-se seguro com planejamento e regras claras'],
      },
      comunicacao: {
        titulo: 'Comunicação: Cuidadosa, reflexiva e seletiva',
        itens: ['Prefere conversas significativas a conversas superficiais'],
      },
    },
    pontosFortes: [
      {
        titulo: 'LEALDADE E COMPROMISSO',
        descricao: 'Devoção profunda às pessoas que ama.',
        ondeBrilha: 'Relacionamentos de longo prazo e confiança absoluta.',
      },
      {
        titulo: 'ATENÇÃO AOS DETALHES',
        descricao: 'Capacidade de prever riscos e organizar com precisão.',
        ondeBrilha: 'Planejamento familiar e projetos minuciosos.',
      },
    ],
    desafios: [
      {
        titulo: 'RUMINAR MÁGOAS',
        descricao: 'Tendência a reviver dores do passado.',
        ondePrejudica: 'Superação de conflitos no casamento.',
        sinalAlerta: 'Lembrar de erros do parceiro de anos atrás.',
      },
    ],
  },
  parte2: {
    virtudes: [
      {
        numero: 1,
        titulo: 'LEVEZA E PERDÃO',
        emoji: '🕊️',
        porQueEssencial: 'O perdão liberta o coração para viver o presente.',
        oQueSignifica: ['Soltar ressentimentos'],
        comoSaber: ['Não traz à tona falhas passadas já resolvidas'],
      },
    ],
    planoDesenvolvimento: [
      {
        mesNumero: 1,
        tituloMes: 'Prática do Desapego e Perdão',
        atividades: [
          {
            periodo: 'Semana 1-4',
            titulo: 'Diário da Gratidão Diária',
            descricao: 'Anotar 3 coisas boas do parceiro sem apontar defeitos.',
            meta: 'Focar no positivo.',
          },
        ],
      },
    ],
  },
  parte3: {
    formaDeAmar: {
      titulo: 'Sua Forma de Amar: Profunda e Atenciosa',
      descricao: 'Você ama através do cuidado com os detalhes e dedicação silenciosa.',
      ladoLuminoso: ['Companheirismo leal', 'Sensibilidade aos sentimentos do outro'],
      ladoDificil: 'Expectativas muito altas que geram decepção frequente.',
    },
    padroesConflito: [
      {
        numero: 1,
        titulo: 'Silêncio Punitivo',
        descricao: 'Fechar-se e esperar que o outro adivinhe o que está sentindo.',
        exemplo: 'Ficar mudo(a) por horas após se chatear.',
      },
    ],
    oQueParceiroPrecisaSaber: [
      {
        topico: 'Você precisa de tempo para processar',
        explicacao: 'Não pressione respostas imediatas em discussões.',
        fraseParaOParceiro: 'Preciso de um momento para organizar meus pensamentos.',
      },
    ],
    acoesConcretas: [
      {
        numero: 1,
        titulo: 'Comunicação Aberta dos Sentimentos',
        descricao: 'Falar logo o que sentiu sem esperar que o parceiro adivinhe.',
      },
    ],
    compatibilidade: [
      {
        temperamentoAlvo: 'colerico',
        titulo: 'Melancólico com Colérico 🌊 + 🔥',
        pontosPositivos: 'Profundidade aliada à ação prática.',
        pontosAtencao: 'Sensibilidade à rispidez do colérico.',
        dica: 'Peça clareza sem medo e estabeleça limites de tom de voz.',
      },
    ],
  },
  parte4: {
    proximosPassos: {
      duasSemanas: ['Reflita sobre as áreas onde a cobrança excessiva tem pesado'],
      quatroSemanas: ['Pratique expressar seus desejos de forma direta'],
    },
    mensagemFinal:
      'Caro Melancólico, sua sensibilidade e profundidade enriquecem o relacionamento. Ao acolher a imperfeição humana com amor e perdão, você descobre a verdadeira beleza do encontro a dois.',
    recursos: {
      livrosRecomendados: [{ titulo: 'A Coragem de Ser Imperfeito', autor: 'Brené Brown' }],
      exerciciosComplementares: ['Exercício de auto-compaixão'],
      sinaisProgresso: ['Maior tolerância a falhas alheias'],
    },
  },
};

export const FLEUMATICO_REPORT_DATA: TemperamentoReportData = {
  temperamento: 'fleumatico',
  nome: 'Fleumático',
  emoji: '🌿',
  tagline: 'O Pacificador Confiável, Sereno e Diplomático',
  parte1: {
    essencia: {
      titulo: 'O Fleumático em Essência',
      resumo:
        'Você é a âncora de paz e estabilidade. Calmo, ponderado e mestre na conciliação.',
      descricao:
        'Sua presença transmite serenidade e você busca a harmonia em todas as relações.',
    },
    comoProcessaMundo: {
      velocidade: {
        titulo: 'Velocidade: Calma, constante e paciente',
        itens: ['Mantém o autocontrole em crises', 'Evita decisões precipitadas'],
      },
      objetivo: {
        titulo: 'Objetivo: Paz, harmonia e estabilidade',
        itens: ['Preserva o bem-estar de todos', 'Evita conflitos desnecessários'],
      },
      controle: {
        titulo: 'Controle: Autodomínio e tranquilidade',
        itens: ['Prefere manter a rotina estável e previsível'],
      },
      comunicacao: {
        titulo: 'Comunicação: Suave, diplomática e conciliadora',
        itens: ['Bom ouvinte', 'Raramente eleva a voz'],
      },
    },
    pontosFortes: [
      {
        titulo: 'ESTABILIDADE EMOCIONAL',
        descricao: 'Capacidade de manter a calma mesmo sob forte pressão.',
        ondeBrilha: 'Mediação de crises e brigas.',
      },
      {
        titulo: 'ESCUTA COMPASSIVA',
        descricao: 'Ouve com paciência genuína sem julgar.',
        ondeBrilha: 'Acolhimento emocional do parceiro.',
      },
    ],
    desafios: [
      {
        titulo: 'PASSIVIDADE E PROCRASTINAÇÃO',
        descricao: 'Adiar decisões importantes para evitar atrito.',
        ondePrejudica: 'Evolução e projetos do casal.',
        sinalAlerta: 'Dizer "tanto faz" quando sua opinião é essencial.',
      },
    ],
  },
  parte2: {
    virtudes: [
      {
        numero: 1,
        titulo: 'PROATIVIDADE E CORAGEM',
        emoji: '⚡',
        porQueEssencial: 'A iniciativa demonstra amor e compromisso ativo.',
        oQueSignifica: ['Tomar a frente sem precisar ser cobrado'],
        comoSaber: ['Surpreende o parceiro com iniciativas práticas'],
      },
    ],
    planoDesenvolvimento: [
      {
        mesNumero: 1,
        tituloMes: 'Desenvolvimento de Iniciativa',
        atividades: [
          {
            periodo: 'Semana 1-4',
            titulo: 'Tomada de Decisão Diária',
            descricao: 'Decidir 1 coisa importante por dia sem delegar ao parceiro.',
            meta: 'Vencer a passividade.',
          },
        ],
      },
    ],
  },
  parte3: {
    formaDeAmar: {
      titulo: 'Sua Forma de Amar: Pacífica e Protetora',
      descricao: 'Você ama oferecendo um refúgio seguro de tranquilidade e aceitação.',
      ladoLuminoso: ['Paciência infinita', 'Companheirismo leal e sem exigências'],
      ladoDificil: 'Falta de expressão apaixonada ou iniciativa romântica.',
    },
    padroesConflito: [
      {
        numero: 1,
        titulo: 'Fuga pelo Silêncio',
        descricao: 'Concordar para encerrar o assunto sem resolver o problema de verdade.',
        exemplo: 'Dizer "sim" e não fazer nada a respeito.',
      },
    ],
    oQueParceiroPrecisaSaber: [
      {
        topico: 'Você responde melhor a convite que a pressão',
        explicacao: 'Cobranças duras fazem você se fechar ainda mais.',
        fraseParaOParceiro: 'Quando você me pede com carinho, tenho prazer em fazer.',
      },
    ],
    acoesConcretas: [
      {
        numero: 1,
        titulo: 'Expressão Ativa de Opinião',
        descricao: 'Dizer claramente o que pensa sem medo de discordar.',
      },
    ],
    compatibilidade: [
      {
        temperamentoAlvo: 'colerico',
        titulo: 'Fleumático com Colérico 🌿 + 🔥',
        pontosPositivos: 'Paz para a tempestade e direção para a inércia.',
        pontosAtencao: 'Risco de ser dominado pelas vontades do colérico.',
        dica: 'Posicione-se com firmeza gentil.',
      },
    ],
  },
  parte4: {
    proximosPassos: {
      duasSemanas: ['Identifique 2 áreas onde você tem se omitido'],
      quatroSemanas: ['Tome a iniciativa em um projeto conjunto do casal'],
    },
    mensagemFinal:
      'Caro Fleumático, sua serenidade é um bálsamo para o mundo. Quando você une sua paz natural à coragem de se posicionar e liderar pelo amor, seu relacionamento floresce com segurança e harmonia duradouras.',
    recursos: {
      livrosRecomendados: [{ titulo: 'Essencialismo', autor: 'Greg McKeown' }],
      exerciciosComplementares: ['Prática de assertividade diária'],
      sinaisProgresso: ['Maior iniciativa em conversas e decisões'],
    },
  },
};

/** Mapeamento dos 4 relatórios */
export const TEMPERAMENTO_REPORTS: Record<Temperamento, TemperamentoReportData> = {
  colerico: COLERICO_REPORT_DATA,
  sanguineo: SANGUINEO_REPORT_DATA,
  melancolico: MELANCOLICO_REPORT_DATA,
  fleumatico: FLEUMATICO_REPORT_DATA,
};

/**
 * Obtém o relatório completo de um temperamento
 */
export function getTemperamentoReport(temperamento: Temperamento): TemperamentoReportData {
  return TEMPERAMENTO_REPORTS[temperamento] || TEMPERAMENTO_REPORTS.colerico;
}

/**
 * Converte a intensidade numérica/qualitativa no label padronizado do laudo
 * (Muito Dominante / Forte / Presente / Traço Leve)
 */
export function formatarIntensidadeLaudo(pontos: number, intensidadeEngine: string): string {
  if (pontos >= 18) return 'Muito Dominante';
  if (pontos >= 13 || intensidadeEngine === 'Forte') return 'Forte';
  if (pontos >= 8 || intensidadeEngine === 'Moderado') return 'Presente';
  return 'Traço Leve';
}
