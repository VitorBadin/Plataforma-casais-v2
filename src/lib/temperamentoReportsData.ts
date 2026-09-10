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
/**
 * RELATÓRIO COMPLETO 2 DE 4 — SANGUÍNEO ⚡
 */
export const SANGUINEO_REPORT_DATA: TemperamentoReportData = {
  temperamento: 'sanguineo',
  nome: 'Sanguíneo',
  emoji: '⚡',
  tagline: 'O Catalisador de Energia, Criatividade e Alegria',

  // PARTE 1: QUEM VOCÊ É?
  parte1: {
    essencia: {
      titulo: 'O Sanguíneo em Essência',
      resumo:
        'Você é um CATALISADOR DE ENERGIA E DIVERSÃO. Seu temperamento é caracterizado pela espontaneidade, sociabilidade irresistível e capacidade de trazer alegria para qualquer lugar. Sanguíneos são os "animadores" do mundo — pessoas que tornam a vida mais colorida, imprevisível e divertida.',
      descricao:
        'Você opera a partir da emoção e da experiência, não da lógica ou do planejamento. Quando você sente um impulso, você segue. Você não é do tipo que fica pensando "e se...", você já está vivendo. Você coloca o "fun" na vida.',
    },
    comoProcessaMundo: {
      velocidade: {
        titulo: 'Velocidade: Você processa informações ATRAVÉS DE PESSOAS',
        itens: [
          'Você aprende falando, não lendo',
          'Você decide depois de conversar',
          'Você fica entediado com silêncio',
          'Você precisa de interação constante',
        ],
      },
      objetivo: {
        titulo: 'Objetivo: Você é ORIENTADO PARA EXPERIÊNCIAS',
        itens: [
          'Quer viver momentos memoráveis',
          'Mede sucesso por diversão e conexões',
          'Não tolera rotina bem',
          'Precisa de variedade e novidade',
        ],
      },
      controle: {
        titulo: 'Espontaneidade: Você VIVE NO PRESENTE',
        itens: [
          'Ontem já passou, amanhã é amanhã',
          'AGORA é o que importa',
          'Planos podem mudar (e frequentemente mudam)',
          'Flexibilidade é sua marca registrada',
        ],
      },
      comunicacao: {
        titulo: 'Comunicação: Você é EXPRESSIVO E ENTUSIASMADO',
        itens: [
          'Você fala muito, gesticula, emociona',
          'Todos te conhecem e sentem sua presença na festa',
          'Você colore histórias com entusiasmo',
          'Você esquece detalhes, mas lembra perfeitamente da "vibe"',
        ],
      },
    },
    pontosFortes: [
      {
        titulo: 'SOCIABILIDADE IRRESISTÍVEL 🎉',
        descricao:
          'Você é um "ímã de pessoas". Você consegue fazer qualquer um se sentir incluído. Sua capacidade de conectar com desconhecidos é praticamente sobrenatural. Você torna qualquer situação menos tensa.',
        ondeBrilha:
          'Networking, criar comunidades, fazer novos amigos, animar pessoas desanimadas.',
      },
      {
        titulo: 'CRIATIVIDADE E INOVAÇÃO 🎨',
        descricao:
          'Sua mente pula de uma ideia para outra constantemente. Você consegue ver conexões criativas que outros perdem. Você traz novas perspectivas para problemas antigos. Você não fica "preso" no jeito tradicional.',
        ondeBrilha:
          'Brainstorm, campanhas criativas, resolver problemas de forma não-convencional, trazer "frescor" para qualquer projeto.',
      },
      {
        titulo: 'ENTUSIASMO E ENERGIA CONTAGIANTE ⚡',
        descricao:
          'Você entra em uma sala e as pessoas sentem a mudança. Seu entusiasmo é tão genuíno que as pessoas acabam sendo arrastadas. Você consegue motivar quando outros desistem. Você é um "cheerleader" natural.',
        ondeBrilha:
          'Motivar equipes, vendas, apresentações públicas, trazer energia quando o ânimo está baixo.',
      },
      {
        titulo: 'OTIMISMO E RESILIÊNCIA 🌞',
        descricao:
          'Você vê o lado bom das coisas naturalmente. Quando algo dá errado, você já está pensando em "e agora?", não em "por que aconteceu?". Você se recupera rápido de decepções e acredita genuinamente que as coisas vão dar certo.',
        ondeBrilha:
          'Situações de pressão, adversidade, negócios incertos/startups, liderar em tempos de mudança.',
      },
      {
        titulo: 'CAPACIDADE DE IMPROVISO 🎭',
        descricao:
          'Planos mudam? Tudo bem! Você consegue improvisar e fazer algo funcionar. Você não fica paralisado com "e se...". Você se adapta rapidamente a novas situações e faz isso parecer fácil.',
        ondeBrilha:
          'Lidar com imprevistos, criar soluções criativas na hora, transformar "plano B" em sucesso, situações espontâneas.',
      },
    ],
    desafios: [
      {
        titulo: 'FALTA DE SEGUIMENTO 📵',
        descricao:
          'Você começa com BOOM e termina com... nada. Isso significa: faz promessas que não cumpre, muda de ideia frequentemente, projetos ficam incompletos e você corre o risco de ser rotulado(a) como "quem não termina nada".',
        ondePrejudica:
          'Carreira (falta de entrega final), relacionamento (promessas quebradas), finanças (investimentos não concluídos), confiança.',
        sinalAlerta:
          'Você começou 5 projetos este mês e nenhum saiu do papel.',
      },
      {
        titulo: 'IMPULSIVIDADE FINANCEIRA 💸',
        descricao:
          'Você vê, você quer, você compra. Isso significa: compras por impulso, histórico de "arrependimento pós-compra" e enorme dificuldade para economizar e planejar o longo prazo.',
        ondePrejudica:
          'Finanças familiares (gasta o que o casal economizou), estabilidade e confiança nas decisões com dinheiro.',
        sinalAlerta:
          'Você já voltou 3 vezes ao shopping ou a sites de compras nesta semana.',
      },
      {
        titulo: 'DIFICULDADE EM APROFUNDAR 🌊',
        descricao:
          'Você gosta de "conhecer de tudo um pouco", mas raramente aprofunda de verdade. Entedia-se rapidamente, conversas e relações podem parecer superficiais e você pula de assunto para assunto.',
        ondePrejudica:
          'Relacionamento (parceiro acha que você não se importa profundamente), carreira (falta de especialização) e domínio de habilidades.',
        sinalAlerta:
          '"Sou bom(boa) em tudo, mas excelente em nada."',
      },
      {
        titulo: 'IRRESPONSABILIDADE EMOCIONAL 😤',
        descricao:
          'Você tende a evitar temas difíceis usando humor ou mudando de assunto. Não enfrenta problemas sérios, faz piadas na hora errada e o parceiro se sente desvalidado.',
        ondePrejudica:
          'Relacionamento (problemas não resolvidos crescem), comunicação (parceiro não se sente ouvido) e segurança afetiva.',
        sinalAlerta:
          'Seu parceiro disse: "Por que você sempre faz piada quando estou triste ou falando de algo sério?"',
      },
      {
        titulo: 'FALTA DE FOCO E ORGANIZAÇÃO 🎪',
        descricao:
          'Você perde coisas, esquece compromissos, não tem rotinas. Perde chaves, documentos, datas, chega atrasado(a) constantemente e a desordem gera estresse constante.',
        ondePrejudica:
          'Relacionamento (parceiro fica frustrado tendo que cuidar da sua logística), carreira (perda de prazos) e paz doméstica.',
        sinalAlerta:
          'Você procurou sua carteira, chave ou celular 3 vezes só hoje.',
      },
    ],
  },

  // PARTE 2: SEU DESENVOLVIMENTO PESSOAL
  parte2: {
    virtudes: [
      {
        numero: 1,
        titulo: 'COMPROMISSO E SEGUIMENTO',
        emoji: '🎯',
        porQueEssencial:
          'O mundo já tem muitas ideias; o que falta é EXECUÇÃO. Sua capacidade de terminar o que começa é a diferença entre sonho e realidade, além de ser o pilar da confiança no relacionamento.',
        oQueSignifica: [
          'NÃO significa perder a diversão ou a alegria',
          'SIGNIFICA escolher poucas coisas essenciais e REALMENTE executá-las',
          'SIGNIFICA manter promessas mesmo depois que a empolgação da "novidade" passou',
          'SIGNIFICA disciplina libertadora, não prisão',
        ],
        comoSaber: [
          'Você completou um projeto do início ao fim sem abandonar',
          'Seu parceiro diz com alívio: "Você realmente fez o que combinou!"',
          'Você experimenta a sensação madura de realização (e não apenas o entusiasmo passageiro)',
          'As pessoas ao seu redor passam a contar com a sua palavra',
        ],
      },
      {
        numero: 2,
        titulo: 'PROFUNDIDADE INTENCIONAL',
        emoji: '🌊',
        porQueEssencial:
          'Relacionamentos reais não sobrevivem apenas na superfície. A excelência em qualquer área exige permanência. Sua vida será infinitamente mais rica quando você conseguir permanecer com uma pessoa/assunto tempo suficiente para conhecê-la de verdade.',
        oQueSignifica: [
          'NÃO significa ser chato ou entediante',
          'SIGNIFICA curiosidade genuína em conhecer alguém PROFUNDAMENTE',
          'SIGNIFICA explorar um assunto até o cerne, não só o resumo',
          'SIGNIFICA atenção plena e presença mesmo após a fase de novidade',
        ],
        comoSaber: [
          'Seu parceiro diz: "Você realmente me conhece e me compreende"',
          'Você consegue sustentar conversas sérias e emotivas sem transformar em piada',
          'Você memoriza detalhes e datas que têm significado para quem você ama',
          'Você se aprofunda e se destaca com excelência em uma área do conhecimento',
        ],
      },
      {
        numero: 3,
        titulo: 'RESPONSABILIDADE PESSOAL',
        emoji: '💪',
        porQueEssencial:
          'Liberdade sem responsabilidade vira desconsideração. Sua capacidade de honrar compromissos (mesmo quando a tarefa é rotineira) é o que diferencia maturidade de mero entretenimento.',
        oQueSignifica: [
          'NÃO significa virar uma pessoa sisuda',
          'SIGNIFICA reconhecer que suas escolhas e atrasos afetam a vida dos outros',
          'SIGNIFICA cumprir combinados mesmo que surja um convite "mais divertido" no momento',
          'SIGNIFICA cultivar organização básica para proteger o bem-estar de quem convive com você',
        ],
        comoSaber: [
          'Você paga contas e honra prazos na data correta',
          'Você chega pontualmente nos compromissos de forma consistente',
          'Você entrega aquele projeto que estava travado há semanas',
          'Seu parceiro confia em você para resolver assuntos sérios e importantes',
        ],
      },
    ],
    planoDesenvolvimento: [
      {
        mesNumero: 1,
        tituloMes: 'Construir Foco e Conclusão',
        atividades: [
          {
            periodo: 'Semana 1-2',
            titulo: 'Exercício de Escolha Única',
            descricao:
              'Escolha APENAS 1 coisa que você quer começar e terminar nas próximas 4 semanas (ex: ler 1 livro inteiro, organizar um cômodo específico, finalizar um curso online). Nada drástico, mas com início, meio e fim definidos.',
            duracaoOuFrequencia: '30 minutos para escolher e se comprometer por escrito',
            meta: 'Escolher UMA única meta e levá-la até o fim sem desviar para novas ideias.',
          },
          {
            periodo: 'Semana 3-4',
            titulo: 'Rastreamento Diário de Progresso',
            descricao:
              'Crie uma folha simples de check-in: dia da semana, "Progredi no meu projeto hoje?" (Sim/Não) e tempo dedicado.',
            duracaoOuFrequencia: '2 minutos por dia para registrar',
            meta: 'Não pular nenhum dia consecutivo (mesmo que dedique apenas 5 a 10 minutos).',
          },
        ],
      },
      {
        mesNumero: 2,
        tituloMes: 'Desenvolver Profundidade e Escuta',
        atividades: [
          {
            periodo: 'Semana 5-6',
            titulo: 'Conversa Profunda Intencional',
            descricao:
              'Uma vez por semana, tenha uma conversa profunda com seu parceiro: sem celular por perto, sem distrações e com a regra de NÃO fazer piadas para desconversar quando o assunto for sensível ("O que você realmente sente sobre...?", "Qual é seu medo agora?", "O que precisa de mim?").',
            duracaoOuFrequencia: '20 a 30 minutos por sessão',
            meta: 'Seu parceiro dizer espontaneamente: "Eu realmente me senti ouvido(a) por você".',
          },
          {
            periodo: 'Semana 7-8',
            titulo: 'Especialização em um Assunto',
            descricao:
              'Escolha um tema específico de interesse e aprofunde: leia 2 artigos densos, escute um podcast longo e depois explique com profundidade para alguém o que aprendeu.',
            duracaoOuFrequencia: '30 minutos por dia, 4 dias por semana',
            meta: 'Dominar um conteúdo com profundidade real, superando a superficialidade.',
          },
        ],
      },
      {
        mesNumero: 3,
        tituloMes: 'Construir Responsabilidade e Pontualidade',
        atividades: [
          {
            periodo: 'Semana 9-10',
            titulo: 'Organização de Sistema Simples',
            descricao:
              'Escolha 1 área caótica da sua rotina (finanças, agenda ou chaves/documentos na casa) e implante um sistema simples e visual (ex: app de contas com lembrete automático, bandeja na entrada para carteira e chaves).',
            duracaoOuFrequencia: '30 min para montar, 5 min/dia para manter',
            meta: 'Manter a simplicidade do sistema funcionando por 4 semanas sem relaxar.',
          },
          {
            periodo: 'Semana 11-12',
            titulo: 'Comprometimento Rigoroso com Horários',
            descricao:
              'Escolha 3 compromissos cruciais para você e seu parceiro (ex: horário de acordar/dormir, jantar juntos, encontro a dois) e chegue pontualmente em todos, programando 2 alarmes de antecedência no celular.',
            duracaoOuFrequencia: 'Todos os 3 compromissos semanais',
            meta: 'Zero minutos de atraso nesses combinados durante 14 dias seguidos.',
          },
        ],
      },
      {
        mesNumero: 4,
        tituloMes: 'Integração e Revisão de Promessas',
        atividades: [
          {
            periodo: 'Semana 13-14',
            titulo: 'Revisão de Promessas Pendentes',
            descricao:
              'Faça uma lista honesta de promessas que você fez e ainda não cumpriu com o parceiro ou familiares. Escolha a mais importante, defina os passos práticos e execute-a.',
            duracaoOuFrequencia: '1 hora de planejamento + execução na semana',
            meta: 'Entregar o combinado e zerar a pendência emocional.',
          },
          {
            periodo: 'Semana 15-16',
            titulo: 'Celebração de Progresso e Autoconhecimento',
            descricao:
              'Reflita por escrito: qual projeto concluiu? Que conversa profunda te marcou? O que seu parceiro notou de evolução? Comemore essa vitória de maturidade!',
            duracaoOuFrequencia: '20 minutos de reflexão escrita',
            meta: 'Consolidar a autoconfiança de que você é plenamente capaz de ter disciplina.',
          },
        ],
      },
      {
        mesNumero: 5,
        tituloMes: 'Prática Contínua de Hábitos',
        atividades: [
          {
            periodo: 'Semana 17-20 (Mês 5)',
            titulo: 'Sustentação dos 2 Melhores Hábitos',
            descricao:
              'Selecione as 2 atividades que geraram maior impacto positivo na sua vida e no relacionamento e integre-as à sua rotina permanente.',
            meta: 'Tornar essas virtudes comportamentos automáticos e naturais.',
          },
        ],
      },
    ],
  },

  // PARTE 3: VOCÊ NO RELACIONAMENTO 💕
  parte3: {
    formaDeAmar: {
      titulo: 'Sua Forma de Amar: Alegre, Espontânea e Conectora',
      descricao:
        'Como sanguíneo, sua forma de amar é através da alegria, novidade, celebração e criação de memórias memoráveis.',
      ladoLuminoso: [
        'Trazer alegria: você quer ver seu parceiro feliz, inventa programas divertidos e colore a rotina do casal.',
        'Criar experiências: valoriza momentos inesquecíveis, surpresas calorosas e aventuras a dois mais do que bens materiais.',
        'Ser energizante: é um animador natural que resgata a esperança e eleva a energia do parceiro em dias difíceis.',
        'Conectar socialmente: traz o parceiro para o seu círculo de amigos, celebra datas e constrói um ambiente comunitário afetuoso.',
      ],
      ladoDificil:
        'Você pode amar a "experiência de amar" mais do que a pessoa real: quando a empolgação da novidade dá lugar à rotina do dia a dia, você pode se desinteressar, esquecer detalhes afetivos cruciais ou parecer superficial quando o momento exige acolhimento sério.',
    },
    padroesConflito: [
      {
        numero: 1,
        titulo: 'Você evita temas difíceis com humor',
        descricao:
          'Surge um assunto sério ou doloroso e você imediatamente faz uma piada ou muda de foco. O parceiro tenta insistir e você faz outra graça. Isso faz o parceiro se sentir desconsiderado e solitário na dor.',
        exemplo:
          'Parceiro diz: "Estou muito preocupado com meu emprego, posso ser demitido..."; você responde: "Relaxa, você é incrível! Vamos pedir uma pizza e jogar algo para descontrair?"; o parceiro pensa: "Ele(a) não leva meus sentimentos a sério".',
      },
      {
        numero: 2,
        titulo: 'Você muda de ideia sobre promessas feitas',
        descricao:
          'Você combina um programa a dois, mas surge um convite novo e mais empolgante no dia. Você quer trocar o plano de última hora e não entende por que o parceiro fica magoado.',
        exemplo:
          '"Prometemos que nossa sexta seria só nós dois" → "Mas surgiu essa festa imperdível, vai ser tão mais divertido se formos!" → parceiro se sente desvalorizado.',
      },
      {
        numero: 3,
        titulo: 'Você não consegue "ficar" na rotina emocional',
        descricao:
          'Na fase inicial tudo é mágico e apaixonante. Quando a rotina se instala, você confunde estabilidade com "falta de química" e começa a se distanciar emocionalmente.',
        exemplo:
          'Pensar com frequência: "Será que acabou o encanto?", quando na verdade o relacionamento apenas amadureceu para uma fase mais profunda.',
      },
      {
        numero: 4,
        titulo: 'Você esquece detalhes que importam para o parceiro',
        descricao:
          'O parceiro compartilha algo muito importante sobre a vida dele, você ouve animado(a), mas dias depois esqueceu completamente o assunto ou a data do acontecimento.',
        exemplo:
          'O parceiro avisa que a mãe fará uma cirurgia na terça; chega a terça-feira e você não toca no assunto porque a informação se perdeu na sua mente.',
      },
      {
        numero: 5,
        titulo: 'Você gasta impulsivamente sem considerar o casal',
        descricao:
          'Vê uma oportunidade ou produto atrativo e compra no impulso do momento. O parceiro, que estava se esforçando para poupar pelo projeto do casal, se sente desrespeitado.',
        exemplo:
          'Comprar uma viagem ou curso de alto valor no impulso: "Mas estava numa promoção imperdível!", enquanto a meta conjunta era guardar para a reforma da casa.',
      },
    ],
    oQueParceiroPrecisaSaber: [
      {
        topico: 'Sua espontaneidade não é desrespeito',
        explicacao:
          'Quando você quer mudar planos ou agir por impulso, seu objetivo é maximizar a alegria do casal, não desconsiderar o parceiro.',
        fraseParaOParceiro:
          'Quando quero mudar planos, não é porque você não importa. É porque meu cérebro busca novidade. Estou aprendendo a honrar nossa previsibilidade.',
      },
      {
        topico: 'Você ama com verdade, mas processa pela leveza',
        explicacao:
          'Fazer piada quando o clima está pesado muitas vezes é seu mecanismo de defesa para lidar com a dor, não falta de amor.',
        fraseParaOParceiro:
          'Quando faço piada sobre coisas sérias, é porque me sinto desconfortável com a tristeza. Estou aprendendo a ficar em silêncio e apenas te acolher.',
      },
      {
        topico: 'Sua impulsividade precisa de freio conjunto',
        explicacao:
          'Sua rapidez para criar e se entusiasmar é maravilhosa, mas sem limites gera desordem. O questionamento do parceiro é um ato de cuidado.',
        fraseParaOParceiro:
          'Eu sou naturalmente impulsivo(a). Quando você me ajuda a pensar duas vezes sobre dinheiro ou planos, você não está me controlando, está me protegendo.',
      },
      {
        topico: 'Você precisa escolher deliberadamente estar presente',
        explicacao:
          'Você não consegue focar em tudo ao mesmo tempo, mas quando decide intencionalmente focar em uma pessoa, você é extremamente dedicado(a).',
        fraseParaOParceiro:
          'Eu escolho você todos os dias. Às vezes me distraio com o mundo, mas o meu compromisso com você é a minha prioridade real.',
      },
      {
        topico: 'Seus detalhes podem falhar, mas sua essência é amor puro',
        explicacao:
          'Você pode falhar na memória de datas, mas a sua intenção de fazer o parceiro feliz e acolhido é 100% genuína.',
        fraseParaOParceiro:
          'Meu amor por você é real mesmo quando minha memória falha nos detalhes. Me ajude com lembretes com carinho, pois minha intenção é te honrar.',
      },
    ],
    acoesConcretas: [
      {
        numero: 1,
        titulo: 'Calendário Sagrado',
        descricao:
          'Definam até 3 momentos semanais que NUNCA mudam por convites de última hora (ex: jantar a dois na sexta, café da manhã de domingo). O resto da semana pode ser espontâneo.',
      },
      {
        numero: 2,
        titulo: 'Protocolo de Assunto Sério',
        descricao:
          'Quando o parceiro disser "precisamos falar sobre algo sério", combinem um horário, desliguem os celulares e assuma o compromisso de não fazer piadas até o final.',
      },
      {
        numero: 3,
        titulo: 'Caderno de Detalhes Importantes',
        descricao:
          'Anote no bloco de notas do celular fatos importantes que o parceiro compartilhou (datas médicas, nomes de amigos, preocupações) e revise 1 vez por semana.',
      },
      {
        numero: 4,
        titulo: 'Conversa Profunda Agendada',
        descricao:
          'Dediquem 30 minutos por semana (ex: domingo à noite) sem telas para perguntar: "Como está seu coração?", "O que posso fazer melhor por você?".',
      },
      {
        numero: 5,
        titulo: 'Zonas de Espontaneidade vs Zonas Estruturadas',
        descricao:
          'Definam com clareza onde você tem liberdade para improvisar (lazer pessoal, passeios leves) e onde a regra é combinada previamente (finanças, agenda familiar).',
      },
      {
        numero: 6,
        titulo: 'Teto de Gastos Individuais',
        descricao:
          'Definam um valor limite para compras pessoais livres (ex: até R$ 200). Qualquer valor acima disso deve ser conversado com o parceiro antes de passar o cartão.',
      },
      {
        numero: 7,
        titulo: 'Semana de Foco Exclusivo',
        descricao:
          'Uma vez por mês, dedique uma semana inteira para minimizar distrações externas e focar em surpresas afetivas e presença com seu parceiro.',
      },
      {
        numero: 8,
        titulo: 'Projeto Criativo Juntos',
        descricao:
          'Escolham um projeto trimestral para realizarem em dupla (planejar uma viagem, fazer um curso de culinária, reformar um espaço da casa).',
      },
      {
        numero: 9,
        titulo: 'Alerta de Promessa no Celular',
        descricao:
          'Sempre que prometer algo ao parceiro, diga imediatamente: "Deixa eu registrar o lembrete no celular para não esquecer" e agende o alarme na hora.',
      },
      {
        numero: 10,
        titulo: 'Revisão Trimestral Divertida',
        descricao:
          'A cada 3 meses, façam uma avaliação do relacionamento em um lugar agradável (um bom café ou piquenique), alinhando ajustes com leveza e celebração.',
      },
    ],
    compatibilidade: [
      {
        temperamentoAlvo: 'colerico',
        titulo: 'Sanguíneo com Colérico ⚡ + 🔥',
        pontosPositivos:
          'O colérico traz estrutura, foco e realização para suas ideias; você traz leveza, humor e calor humano para a seriedade dele.',
        pontosAtencao:
          'Você quer improvisar e relaxar, o colérico quer planejar e produzir; críticas dele podem te ferir.',
        dica: 'Respeite a agenda e os prazos dele. O colérico se sente amado quando vê você cumprindo compromissos.',
      },
      {
        temperamentoAlvo: 'sanguineo',
        titulo: 'Sanguíneo com Sanguíneo ⚡ + ⚡',
        pontosPositivos:
          'Diversão sem limites, vida social animadíssima, entusiasmo contagiante e muita química e espontaneidade.',
        pontosAtencao:
          'Risco enorme de desorganização financeira, falta de conclusão de projetos e esquecimento de responsabilidades básicas.',
        dica: 'Definam claramente quem cuida de quais contas e obrigações práticas da casa.',
      },
      {
        temperamentoAlvo: 'melancolico',
        titulo: 'Sanguíneo com Melancólico ⚡ + 🌊',
        pontosPositivos:
          'Ele te ancora com profundidade, planejamento e lealdade impecável; você ilumina os dias dele com otimismo e alegria.',
        pontosAtencao:
          'Você pode esquecer detalhes importantes para ele; o melancólico pode achar suas conversas superficiais.',
        dica: 'Use o caderno de anotações para não esquecer datas e conversas. O melancólico se sente amado pela lembrança dos detalhes.',
      },
      {
        temperamentoAlvo: 'fleumatico',
        titulo: 'Sanguíneo com Fleumático ⚡ + 🌿',
        pontosPositivos:
          'Ele traz a paz, paciência e estabilidade que equilibram sua agitação; você traz movimento e novidade para o mundo dele.',
        pontosAtencao:
          'Ele pode parecer lento ou sem energia para você; você pode sobrecarregar a bateria social dele.',
        dica: 'Respeite os momentos de silêncio e descanso dele. Nem todo momento precisa ser agitado.',
      },
    ],
  },

  // PARTE 4: SEUS PRÓXIMOS PASSOS 🚀
  parte4: {
    proximosPassos: {
      duasSemanas: [
        'Leia este laudo na íntegra com calma, destacando os pontos que mais ressoam',
        'Identifique seus 2 padrões de conflito mais presentes (qual dos 5 reflete seu comportamento?)',
        'Escolha 2 ações concretas imediatas (comece apenas com essas 2 para manter o foco)',
        'Compartilhe com seu parceiro e leiam juntos a seção "O que seu parceiro precisa saber"',
        'Agende a mentoria para casais para aprofundar esses pontos guiados profissionalmente',
      ],
      quatroSemanas: [
        'Implemente na rotina as 2 ações escolhidas com consistência',
        'Inicie o exercício de escolha única e rastreamento diário (Mês 1)',
        'Observe as respostas do parceiro e como a segurança mútua aumentou',
        'Traga suas observações e vitórias para a próxima sessão de mentoria',
      ],
    },
    mensagemFinal:
      'Querido(a) Sanguíneo(a), você é um PRESENTE para o mundo. Sua capacidade de trazer alegria, espontaneidade e entusiasmo transforma qualquer ambiente. Mas as pessoas que você mais ama precisam saber que você estará presente também quando as coisas ficarem sérias — que você pode focar quando importa e que elas não são apenas momentos de diversão, mas o seu porto seguro. Sua missão agora não é tornar tudo mais leve, mas ser profundamente confiável nas coisas essenciais. Você já trouxe alegria; agora traga profundidade e compromisso. Comece hoje, comece pequeno, mas comece.',
    recursos: {
      livrosRecomendados: [
        {
          titulo: 'Os 5 Idiomas do Amor',
          autor: 'Gary Chapman',
        },
        {
          titulo: 'Hábitos Atômicos',
          autor: 'James Clear',
        },
        {
          titulo: 'Foco (Focus)',
          autor: 'Daniel Goleman',
        },
      ],
      exerciciosComplementares: [
        'Meditação de 10 minutos por dia para treinar o músculo da atenção e foco',
        'Journaling emocional para processar sentimentos antes de reagir com humor',
        'Revisão semanal de promessas cumpridas aos domingos',
      ],
      sinaisProgresso: [
        'Seu parceiro diz com um sorriso de alívio: "Você realmente cumpriu o combinado!"',
        'Você chega pontualmente nos compromissos de forma consistente',
        'Você lembrou e perguntou sobre um detalhe íntimo que seu parceiro havia compartilhado',
        'Você conseguiu sustentar uma conversa séria sem desviar ou fazer piadas',
      ],
    },
  },
};

/**
 * RELATÓRIO COMPLETO 3 DE 4 — MELANCÓLICO 💙
 */
export const MELANCOLICO_REPORT_DATA: TemperamentoReportData = {
  temperamento: 'melancolico',
  nome: 'Melancólico',
  emoji: '💙',
  tagline: 'O Pensador Profundo, Sensível e Leal',

  // PARTE 1: QUEM VOCÊ É?
  parte1: {
    essencia: {
      titulo: 'O Melancólico em Essência',
      resumo:
        'Você é um PENSADOR PROFUNDO E SENSÍVEL. Seu temperamento é caracterizado pela análise cuidadosa, sensibilidade emocional e busca pela excelência. Melancólicos são os "artistas e filósofos" do mundo — pessoas que veem além da superfície, que se importam profundamente com qualidade e significado.',
      descricao:
        'Você opera a partir da lógica profunda E da emoção refinada. Quando você enfrenta algo, você não só pensa — você SENTE. Você não é do tipo que toma decisão rápida; você analisa, questiona, reflete. Você busca entender o "porquê" por trás das coisas.',
    },
    comoProcessaMundo: {
      velocidade: {
        titulo: 'Velocidade: Você processa informações PROFUNDAMENTE',
        itens: [
          'Você precisa de tempo para entender',
          'Você vê camadas que outros perdem',
          'Você faz perguntas "por quê" constantemente',
          'Você fica frustrado com respostas superficiais',
        ],
      },
      objetivo: {
        titulo: 'Objetivo: Você é ORIENTADO PARA QUALIDADE E SIGNIFICADO',
        itens: [
          'Quer fazer as coisas BEM (não rápido)',
          'Mede sucesso por excelência, não quantidade',
          'Não tolera mediocridade bem',
          'Precisa de propósito em tudo que faz',
        ],
      },
      controle: {
        titulo: 'Sensibilidade: Você SENTE PROFUNDAMENTE',
        itens: [
          'Você detecta emoções sutis em pessoas',
          'Você é facilmente afetado pela tristeza alheia',
          'Você remoé sobre coisas que machucaram',
          'Você leva crítica muito a sério',
        ],
      },
      comunicacao: {
        titulo: 'Comunicação: Você é CUIDADOSO E PRECISO',
        itens: [
          'Você escolhe as palavras com cuidado',
          'Você não fala sem pensar (ao contrário do sanguíneo)',
          'Você quer que entendam exatamente o que você quer dizer',
          'Você fica magoado quando minimizam seus sentimentos',
        ],
      },
    },
    pontosFortes: [
      {
        titulo: 'CAPACIDADE ANALÍTICA PROFUNDA 🧠',
        descricao:
          'Você consegue ver padrões que outros perdem. Sua mente desconstrói problemas complexos em componentes e os reconstrói com entendimento real. Você é o tipo de pessoa que consegue entender "por quê" as coisas funcionam (ou não funcionam).',
        ondeBrilha:
          'Resolução de problemas complexos, pesquisa, criação artística, planejamento estratégico, aconselhamento.',
      },
      {
        titulo: 'SENSIBILIDADE E EMPATIA GENUÍNA 💝',
        descricao:
          'Você consegue entender o que alguém está sentindo SEM essa pessoa precisar falar. Você é intuitivo com emoções. Sua capacidade de entrar no "mundo interno" de outro é praticamente sobrenatural. Você não só ouve — você realmente compreende.',
        ondeBrilha:
          'Relacionamentos profundos, aconselhamento, terapia, arte que toca as pessoas, criação de espaços seguros.',
      },
      {
        titulo: 'ATENÇÃO AOS DETALHES 🎯',
        descricao:
          'Onde outros veem "tudo bem", você vê que algo está 2% errado. Essa obsessão por detalhes significa que você cria coisas PERFEITAS. Você não deixa passar o que é medíocre. Seu padrão é "excelência", não "suficiente".',
        ondeBrilha:
          'Projetos que exigem precisão, arte, curadoria, revisão, qualidade garantida, perfeccionismo necessário.',
      },
      {
        titulo: 'LEALDADE E CONFIABILIDADE 🛡️',
        descricao:
          'Você escolhe POUCAS pessoas para estar perto, MAS para essas pessoas, você é rock sólido. Quando você se compromete com alguém, você está ali. Você não abandona quando as coisas ficam difíceis. Você é o amigo que fica mesmo quando ninguém mais está.',
        ondeBrilha:
          'Relacionamentos de longa duração, amizades profundas, relacionamentos amorosos sérios, parentalidade, equipes que precisam de confiança.',
      },
      {
        titulo: 'CRIATIVIDADE E EXPRESSÃO ARTÍSTICA 🎨',
        descricao:
          'Sua sensibilidade profunda te torna capaz de criar coisas que tocam a alma. Você consegue expressar através de arte, música, escrita, design, o que outros não conseguem. Sua criatividade não é "criativa por ser criativa" — é criativa porque vem da profundidade do seu sentir.',
        ondeBrilha:
          'Arte, música, literatura, design, poesia, criação de experiências significativas, mentoria que transforma.',
      },
    ],
    desafios: [
      {
        titulo: 'PERFECCIONISMO DESTRUTIVO 🔪',
        descricao:
          'Seu padrão é tão alto que nada é "bom o bastante". Isso significa: nunca termina porque "não está perfeito", critica constantemente o trabalho alheio, não aprecia 90% feito por outro e sofre com a imperfeição do mundo.',
        ondePrejudica:
          'Relacionamento (parceiro se sente inadequado), carreira (não produz porque está sempre refazendo), saúde mental e pressão familiar.',
        sinalAlerta:
          'Você passou 3 horas em um projeto que levaria 30 minutos porque "não estava certo".',
      },
      {
        titulo: 'RUMINAÇÃO E PENSAMENTO CIRCULAR 🔄',
        descricao:
          'Uma vez que algo te machucou, você não consegue parar de pensar. Remoé sobre o ocorrido por semanas, recria a conversa 100 vezes na mente e não consegue soltar o ressentimento.',
        ondePrejudica:
          'Saúde mental (ansiedade/depressão), relacionamento (traz brigas antigas de volta) e bloqueio criativo.',
        sinalAlerta:
          'Você está pensando em algo que aconteceu há 3 meses e ainda dói como se fosse hoje.',
      },
      {
        titulo: 'SENSIBILIDADE EXCESSIVA À CRÍTICA 😔',
        descricao:
          'Uma crítica menor vira uma ferida profunda. Você interpreta observações construtivas como rejeição pessoal e passa dias sofrendo com um comentário simples.',
        ondePrejudica:
          'Carreira (evita feedbacks que fariam crescer), relacionamento (parceiro tem medo de falar a verdade) e autoestima.',
        sinalAlerta:
          'Seu parceiro disse algo leve e você ainda está ruminando 5 dias depois.',
      },
      {
        titulo: 'DEPRESSÃO E PESSIMISMO ☁️',
        descricao:
          'Você enxerga tudo o que pode dar errado antes de qualquer outra coisa. Imagina cenários catastróficos, espera o fracasso antecipado e deixa o ambiente pesado.',
        ondePrejudica:
          'Relacionamento (pesa a atmosfera conjugal), carreira (paralisação diante do risco) e bem-estar emocional.',
        sinalAlerta:
          '"Para que tentar? Vai dar errado de qualquer jeito."',
      },
      {
        titulo: 'ISOLAMENTO E EVITAÇÃO 🚫',
        descricao:
          'Quando as coisas ficam difíceis ou dolorosas, você se retira para dentro da concha. Não pede ajuda, guarda mágoa em silêncio e evita confrontar para resolver.',
        ondePrejudica:
          'Relacionamento (parceiro fica no escuro sem saber o que houve), resolução de conflitos e sofrimento solitário.',
        sinalAlerta:
          'Seu parceiro pergunta "O que há de errado?" e você diz "Nada" (quando na verdade há TUDO).',
      },
    ],
  },

  // PARTE 2: SEU DESENVOLVIMENTO PESSOAL
  parte2: {
    virtudes: [
      {
        numero: 1,
        titulo: 'AUTO-COMPAIXÃO E ACEITAÇÃO',
        emoji: '💚',
        porQueEssencial:
          'Seu maior crítico é você mesmo. Seu desenvolvimento real começa quando você aceita que "bom o bastante" realmente É bom, e que você é digno de amor mesmo sendo imperfeito.',
        oQueSignifica: [
          'NÃO significa abandonar a qualidade ou o rigor',
          'SIGNIFICA reconhecer que a perfeição absoluta é uma ilusão paralisante',
          'SIGNIFICA permitir-se errar e ser humano sem se autoflagelar',
          'SIGNIFICA falar consigo mesmo com a mesma gentileza que você fala com um amigo querido',
        ],
        comoSaber: [
          'Você terminou algo que não está 100% "perfeito" e publicou/entregou',
          'Você cometeu um erro e conseguiu dizer: "Tudo bem, sou humano, vou aprender"',
          'Você recebeu uma crítica construtiva sem passar dias remoendo',
          'Você conseguiu rir de si mesmo e de suas falhas sem culpa',
        ],
      },
      {
        numero: 2,
        titulo: 'AÇÃO APESAR DO MEDO',
        emoji: '🚀',
        porQueEssencial:
          'Você enxerga todos os riscos potenciais, mas isso pode paralisar sua vida em dúvidas intermináveis. Sua evolução só acontece quando você age APESAR do medo, e não esperando o medo desaparecer.',
        oQueSignifica: [
          'NÃO significa ausência total de medo',
          'SIGNIFICA dar o primeiro passo mesmo com incertezas no peito',
          'SIGNIFICA começar um projeto antes de se sentir 100% pronto',
          'SIGNIFICA expor sua arte e suas ideias mesmo sob risco de julgamento',
        ],
        comoSaber: [
          'Você iniciou aquele projeto que estava engavetado por perfeccionismo',
          'Você compartilhou uma ideia autêntica mesmo temendo a reação alheia',
          'Você não esperou todas as condições ideais para começar a agir',
          'Você realizou a tarefa primeiro e deixou o julgamento para depois',
        ],
      },
      {
        numero: 3,
        titulo: 'COMUNICAÇÃO HONESTA E VULNERABILIDADE',
        emoji: '💬',
        porQueEssencial:
          'Guardar mágoas corrói o coração e afasta quem você ama. A verdadeira intimidade e liberdade só existem quando você expressa o que sente com verdade e abertura.',
        oQueSignifica: [
          'NÃO significa explodir em acusações coléricas',
          'SIGNIFICA dizer com clareza "estou magoado(a)" em vez de se fechar no gelo',
          'SIGNIFICA pedir ajuda prontamente quando a carga estiver pesada',
          'SIGNIFICA expor suas fragilidades sem medo de ser um "fardo" para os outros',
        ],
        comoSaber: [
          'Você verbalizou sua dor na hora certa em vez de guardar por semanas',
          'Você pediu auxílio prático ou emocional quando precisou',
          'Seu parceiro disse: "Que bom que você se abriu e me contou o que estava sentindo"',
          'Você expressou seus sentimentos com autenticidade, superando o medo da rejeição',
        ],
      },
    ],
    planoDesenvolvimento: [
      {
        mesNumero: 1,
        tituloMes: 'Construir Auto-Compaixão e Aceitação',
        atividades: [
          {
            periodo: 'Semana 1-2',
            titulo: 'Exercício do "Bom o Bastante"',
            descricao:
              'Escolha uma tarefa ou projeto que você queira fazer. Defina previamente o que é "bom o bastante" e entregue/compartilhe em no máximo 1 semana, sem revisões excessivas.',
            duracaoOuFrequencia: '1 hora de dedicação máxima',
            meta: 'Experimentar na prática que o imperfeito concluído é infinitamente melhor que o perfeito não feito.',
          },
          {
            periodo: 'Semana 3-4',
            titulo: 'Journaling de Auto-Compaixão',
            descricao:
              'Todas as noites, anote: 1 coisa que você fez bem; 1 coisa imperfeita que aconteceu e está tudo bem; e 1 frase carinhosa para si mesmo(a).',
            duracaoOuFrequencia: '5 minutos todas as noites',
            meta: 'Treinar o cérebro para registrar o lado positivo e acolher os próprios limites.',
          },
        ],
      },
      {
        mesNumero: 2,
        tituloMes: 'Desenvolver Ação Apesar do Medo',
        atividades: [
          {
            periodo: 'Semana 5-6',
            titulo: 'Exercício da "Ação Imperfeita"',
            descricao:
              'Escolha algo importante que você vem adiando por receio de não sair excelente (iniciar um projeto, enviar um e-mail delicado, fazer uma ligação) e comece nesta semana sem buscar perfeição.',
            duracaoOuFrequencia: '1 hora no máximo',
            meta: 'Perceber que dar o pontapé inicial não gera o desastre que a mente imaginava.',
          },
          {
            periodo: 'Semana 7-8',
            titulo: 'Mapeamento Racional de Cenários ("E se?")',
            descricao:
              'Para cada medo catastrófico que sua mente criar, escreva ao lado: "E se isso realmente acontecer, o que eu posso fazer?".',
            duracaoOuFrequencia: 'Toda vez que o medo travar uma decisão',
            meta: 'Ver no papel que você tem capacidade e recursos para lidar com qualquer desfecho.',
          },
        ],
      },
      {
        mesNumero: 3,
        tituloMes: 'Construir Comunicação Honesta e Expressão',
        atividades: [
          {
            periodo: 'Semana 9-10',
            titulo: 'Exercício de Expressão Direta de Sentimentos',
            descricao:
              'Identifique 1 incômodo ou mágoa que você guardou e que seu parceiro não sabe. Tenha uma conversa tranquila usando a fórmula: "Eu me senti magoado(a) com... porque... e gostaria de compartilhar com você".',
            duracaoOuFrequencia: '10 minutos de conversa franca',
            meta: 'Colocar para fora o sentimento sem acusação, permitindo que o outro compreenda.',
          },
          {
            periodo: 'Semana 11-12',
            titulo: 'Prática Consciente de Pedir Ajuda',
            descricao:
              'Identifique uma tarefa que esteja te sobrecarregando e peça ajuda direta a alguém de confiança ("Estou tendo dificuldade com isso, você pode me ajudar?").',
            duracaoOuFrequencia: 'Uma conversa simples na semana',
            meta: 'Desmistificar a crença de que pedir ajuda é sinal de fraqueza.',
          },
        ],
      },
      {
        mesNumero: 4,
        tituloMes: 'Integração e Consolidação de Hábitos',
        atividades: [
          {
            periodo: 'Semana 13-14',
            titulo: 'Revisão Escrita de Crescimento',
            descricao:
              'Reflita por escrito: Que imperfeição você aceitou com paz? Que ação realizou com coragem? Que sentimento expressou com verdade? Como o parceiro reagiu?',
            duracaoOuFrequencia: '15 minutos de reflexão no caderno',
            meta: 'Solidificar a autopercepção da sua evolução emocional.',
          },
          {
            periodo: 'Semana 15-16',
            titulo: 'Prática Contínua de Autoacolhimento',
            descricao:
              'Dedique momentos semanais de arte, leitura e silêncio restaurador, usando sua profundidade para nutrir a si e ao casal.',
            meta: 'Transformar a sensibilidade em fonte de paz e conexão.',
          },
        ],
      },
      {
        mesNumero: 5,
        tituloMes: 'Prática Contínua e Sustentação',
        atividades: [
          {
            periodo: 'Semana 17-20 (Mês 5)',
            titulo: 'Sustentação dos 2 Hábitos Vitais',
            descricao:
              'Escolha as 2 práticas que mais trouxeram leveza e mantenha-as indefinidamente como parte da sua rotina conjugal.',
            meta: 'Fixar a comunicação aberta e a auto-compaixão de forma permanente.',
          },
        ],
      },
    ],
  },

  // PARTE 3: VOCÊ NO RELACIONAMENTO 💕
  parte3: {
    formaDeAmar: {
      titulo: 'Sua Forma de Amar: Profunda, Dedicada e Atenciosa',
      descricao:
        'Como melancólico, sua forma de amar é através da lealdade inabalável, da compreensão profunda e do cuidado minucioso com quem você escolheu para caminhar junto.',
      ladoLuminoso: [
        'Compreender profundamente: você quer conhecer a alma do parceiro, seus medos mais íntimos e suas aspirações reais.',
        'Cuidar nos detalhes: lembra de pequenos gestos com enorme significado afetivo e percebe sinais sutis de humor do parceiro.',
        'Ser leal inconteste: é a rocha que permanece ao lado nos momentos de tempestade e doença, sem hesitar.',
        'Criar significado: transforma a convivência em uma jornada de conexão de almas e propósito duradouro.',
      ],
      ladoDificil:
        'Você ama com tanta intensidade e expectativa de perfeição que pode gerar pressão sufocante no parceiro: quando algo sai imperfeito, você sofre excessivamente, guarda mágoas em silêncio ou faz com que o outro sinta que nunca consegue atingir o seu padrão.',
    },
    padroesConflito: [
      {
        numero: 1,
        titulo: 'Você guarda mágoa em vez de falar',
        descricao:
          'O parceiro tem uma atitude que te fere. Em vez de conversar na hora, você se cala, remoé sozinho por dias e fica frio e distante. O parceiro fica completamente perdido sem saber o motivo.',
        exemplo:
          'Parceiro: "Vou sair com amigos sexta, quer vir?"; você pensa: "Ele só perguntou por educação, não me quer lá" → responde "Não, fico em casa" e passa o fim de semana distante e magoado(a).',
      },
      {
        numero: 2,
        titulo: 'Você cria histórias sobre as intenções alheias',
        descricao:
          'Sua mente hiperanalítica pega um comportamento neutro do parceiro, imagina o pior cenário possível ("Ele não me ama mais", "Ele está me evitando") e passa a agir como se a história inventada fosse fato.',
        exemplo:
          'Parceiro chega exausto do trabalho e vai dormir cedo; você conclui: "O amor dele por mim acabou, nosso casamento está em crise", quando ele estava apenas com cansaço físico.',
      },
      {
        numero: 3,
        titulo: 'Você evita conflito até explodir de uma vez',
        descricao:
          'Para não criar desentendimento, você vai engolindo pequenas frustrações durante meses. De repente, por causa de uma bobagem cotidiana, você explode despejando meses de acusações acumuladas.',
        exemplo:
          '"Eu não aguento mais! Você SEMPRE faz isso!", deixando o parceiro chocado porque foi a primeira vez que você mencionou o assunto.',
      },
      {
        numero: 4,
        titulo: 'Você interpreta crítica construtiva como rejeição pessoal',
        descricao:
          'Quando o parceiro sugere uma melhoria ou ajuste na rotina, você não escuta o conselho — escuta "eu sou um fracasso e você não me ama". Você se fecha magoado por dias.',
        exemplo:
          'Parceiro sugere: "Que tal temperarmos a comida com menos sal?"; você pensa: "Ele acha tudo o que faço horrível, nada do que faço presta" e se recusa a cozinhar.',
      },
      {
        numero: 5,
        titulo: 'Você sofre em silêncio esperando que o parceiro adivinhe',
        descricao:
          'Você está triste ou sobrecarregado(a), mas acha que pedir carinho é um "fardo". Cria a expectativa de que se o parceiro te amasse, ele adivinharia sua dor sem você precisar falar.',
        exemplo:
          'Passar semanas deprimido(a) sem se abrir, e depois se ressentir com o parceiro: "Você nem percebeu o quanto eu estava sofrendo".',
      },
    ],
    oQueParceiroPrecisaSaber: [
      {
        topico: 'Você não é "pesado(a)" — você busca profundidade real',
        explicacao:
          'Quando você quer conversar sobre sentimentos, futuro e significado, não é para criar drama, mas para nutrir a conexão verdadeira.',
        fraseParaOParceiro:
          'Quando busco conversar sobre sentimentos, não é porque algo está errado. É porque para mim o amor se fortalece na profundidade emocional.',
      },
      {
        topico: 'Seu tempo de processamento é mais lento e analítico',
        explicacao:
          'Pressionar por respostas instantâneas no calor da discussão faz você se fechar. Você precisa de espaço para organizar os pensamentos.',
        fraseParaOParceiro:
          'Meu tempo para processar emoções é mais lento. Se você me der um momento de calma, vou conseguir me abrir e conversar com total clareza.',
      },
      {
        topico: 'Sua sensibilidade é sua maior força, não fraqueza',
        explicacao:
          'A mesma sensibilidade que se magoa fácil é a que te torna capaz de cuidar com dedicação, empatia e lealdade ímpar.',
        fraseParaOParceiro:
          'Minha sensibilidade é o motor do meu cuidado com você. Quando você fala com carinho e gentileza, eu floresço e me sinto seguro(a).',
      },
      {
        topico: 'Você se cala por medo da rejeição, não para castigar',
        explicacao:
          'O silêncio do melancólico é um escudo de proteção contra o medo de parecer exigente ou ser rejeitado.',
        fraseParaOParceiro:
          'Quando me calo, não é para te punir, é por medo. Me ajuda muito quando você pergunta com ternura e paciência o que está no meu coração.',
      },
      {
        topico: 'Seus padrões altos refletem a fé no potencial do casal',
        explicacao:
          'Quando você aponta algo a melhorar, não é por desprezo, mas porque acredita profundamente na grandeza do parceiro e da relação.',
        fraseParaOParceiro:
          'Quando aponto melhorias, é porque acredito no nosso melhor. Me avise se soar como cobrança, pois minha intenção é edificar nosso lar.',
      },
    ],
    acoesConcretas: [
      {
        numero: 1,
        titulo: 'Protocolo de Comunicação em 24 Horas',
        descricao:
          'Assuma o compromisso: quando algo machucar seu coração, você não guardará por mais de 24 horas. Marque um momento calmo e converse expressando seu sentir.',
      },
      {
        numero: 2,
        titulo: 'Semana de Verificação Profunda',
        descricao:
          'Uma vez por semana (ex: domingo às 19h), dediquem 30 a 45 minutos sem celular para conversar sobre sentimentos, vitórias e necessidades do coração.',
      },
      {
        numero: 3,
        titulo: 'Caderno de Apreciação do Parceiro',
        descricao:
          'Escreva duas vezes por semana uma nota com elogios a qualidades ou ações concretas do seu parceiro e deixe em um lugar visível para ele(a) encontrar.',
      },
      {
        numero: 4,
        titulo: 'Momentos de Qualidade Agendados',
        descricao:
          'Reservem duas sessões semanais de 30 a 60 minutos dedicadas exclusivamente à intimidade emocional e conversa conectiva sem telas por perto.',
      },
      {
        numero: 5,
        titulo: 'Técnica das Histórias Reescritas',
        descricao:
          'Sempre que sua mente criar uma interpretação negativa sobre o parceiro, force-se a listar 3 explicações alternativas e pergunte com carinho antes de concluir o pior.',
      },
      {
        numero: 6,
        titulo: 'Sessão Mensal de Aprofundamento Conjugal',
        descricao:
          'Uma vez por mês, marquem um encontro a dois em um lugar especial para conversarem com calma sobre sonhos futuros, medos e metas do casamento.',
      },
      {
        numero: 7,
        titulo: 'Sistema de Expressão Segura (Carta/Mensagem)',
        descricao:
          'Se estiver muito difícil falar verbalmente sobre uma dor, escreva uma carta com respeito e carinho para o parceiro ler antes da conversa a dois.',
      },
      {
        numero: 8,
        titulo: 'Separação entre Fato e Interpretação',
        descricao:
          'Treine separar o FATO ocorrido da INTERPRETAÇÃO catastrófica que sua mente criou, questionando suas conclusões automáticas.',
      },
      {
        numero: 9,
        titulo: 'Pacto da Permissão de Ser Imperfeito',
        descricao:
          'Estabeleçam como princípio conjugal que falhas e erros são oportunidades de aprendizado e perdão, e não motivos para distanciamento.',
      },
      {
        numero: 10,
        titulo: 'Revisão Trimestral Profunda',
        descricao:
          'A cada 3 meses, façam um alinhamento de 2 horas avaliando a saúde emocional do casal e renovando os objetivos afetivos para o próximo trimestre.',
      },
    ],
    compatibilidade: [
      {
        temperamentoAlvo: 'colerico',
        titulo: 'Melancólico com Colérico 💙 + 🔥',
        pontosPositivos:
          'O colérico te motiva a agir e superar a paralisia do medo; você equilibra a impulsividade dele com prudência, profundidade e planejamento.',
        pontosAtencao:
          'O colérico quer rapidez e fala sem filtro; você precisa de tempo para analisar e sente profundamente cada palavra dura.',
        dica: 'Compreenda que a urgência dele não é rejeição, e estabeleçam o acordo de manter um tom de voz calmo e respeitoso.',
      },
      {
        temperamentoAlvo: 'sanguineo',
        titulo: 'Melancólico com Sanguíneo 💙 + ⚡',
        pontosPositivos:
          'O sanguíneo ilumina seus dias com leveza, otimismo e humor; você ancora o mundo dele com estabilidade, lealdade e maturidade.',
        pontosAtencao:
          'O sanguíneo pode esquecer detalhes que você considera vitais ou fugir de conversas sérias com piadas.',
        dica: 'Incentive o parceiro a usar lembretes e valorize o carinho e o afeto caloroso que ele traz para o seu dia a dia.',
      },
      {
        temperamentoAlvo: 'melancolico',
        titulo: 'Melancólico com Melancólico 💙 + 💙',
        pontosPositivos:
          'Compreensão mútua profunda de sentimentos, respeito pelo silêncio, lealdade inabalável e busca conjunta pela excelência.',
        pontosAtencao:
          'Risco de ambos entrarem em espirais de pessimismo, remoerem mágoas passadas e se isolarem ao mesmo tempo.',
        dica: 'Um dos dois deve assumir intencionalmente o papel de resgatar o otimismo, e criem a regra de não reviver assuntos já resolvidos.',
      },
      {
        temperamentoAlvo: 'fleumatico',
        titulo: 'Melancólico com Fleumático 💙 + 🌿',
        pontosPositivos:
          'O fleumático traz a paz, paciência e calmaria que desarmam sua ansiedade; você traz paixão, direção e intensidade para a vida dele.',
        pontosAtencao:
          'A passividade do fleumático pode parecer desinteresse para você; sua intensidade pode soar sufocante para ele.',
        dica: 'Entenda que a calmaria dele é a forma dele de amar. Dê tempo e espaço para ele expressar suas vontades.',
      },
    ],
  },

  // PARTE 4: SEUS PRÓXIMOS PASSOS 🚀
  parte4: {
    proximosPassos: {
      duasSemanas: [
        'Leia este laudo na íntegra com calma, absorvendo cada detalhe com carinho por você mesmo(a)',
        'Identifique seus 2 padrões de conflito mais presentes (qual dos 5 reflete suas reações habituais?)',
        'Escolha 2 ações concretas imediatas (comece apenas por essas 2 para manter o foco)',
        'Compartilhe com seu parceiro e leiam juntos a seção "O que seu parceiro precisa saber"',
        'Agende a mentoria para casais para aprofundar esses pontos guiados profissionalmente',
      ],
      quatroSemanas: [
        'Implemente no cotidiano as 2 ações escolhidas com constância e paciência',
        'Inicie o exercício do "Bom o Bastante" e o journaling de auto-compaixão (Mês 1)',
        'Observe como o ambiente conjugal fica mais leve quando você expressa suas necessidades sem medo',
        'Traga suas reflexões e dúvidas para a próxima sessão de mentoria',
      ],
    },
    mensagemFinal:
      'Querido(a) Melancólico(a), você é um PRESENTE raro para o mundo. Sua capacidade de enxergar a profundidade das coisas, de amar com lealdade incondicional e de criar momentos com verdadeiro significado é uma dádiva. Mas você não precisa carregar o peso do mundo sozinho nem exigir perfeição de si ou dos outros para ser digno de amor. Sua missão agora não é ser perfeito — é ser livre. Livre das autocríticas implacáveis, livre das histórias que sua mente cria no medo, livre para expressar sua dor e para agir com coragem. Você é infinitamente mais forte do que imagina. Comece hoje, comece pequeno, mas comece.',
    recursos: {
      livrosRecomendados: [
        {
          titulo: 'A Coragem de Ser Imperfeito',
          autor: 'Brené Brown',
        },
        {
          titulo: 'Pensamentos que Curam (Feeling Good)',
          autor: 'David D. Burns',
        },
        {
          titulo: 'Os 5 Idiomas do Amor',
          autor: 'Gary Chapman',
        },
      ],
      exerciciosComplementares: [
        'Meditação guiada de respiração para desacelerar o fluxo de pensamentos analíticos',
        'Caminhada reflexiva ao ar livre sem telas para processar emoções com leveza',
        'Expressão criativa (escrita, música, arte) para canalizar a sensibilidade profunda',
      ],
      sinaisProgresso: [
        'Você concluiu e entregou uma tarefa que não estava 100% perfeita sem sentir culpa',
        'Você compartilhou uma mágoa ou incômodo na hora certa, em vez de se calar e guardar',
        'Você recebeu um feedback ou crítica construtiva sem passar dias ruminando',
        'Seu parceiro disse com alegria: "Como é bom quando você se abre e conversa comigo!"',
        'Você deu um passo importante em um projeto mesmo sentindo um frio na barriga',
      ],
    },
  },
};

/**
 * RELATÓRIO COMPLETO 4 DE 4 — FLEUMÁTICO 🌊
 */
export const FLEUMATICO_REPORT_DATA: TemperamentoReportData = {
  temperamento: 'fleumatico',
  nome: 'Fleumático',
  emoji: '🌊',
  tagline: 'O Pacificador Natural, Equilibrador e Confiável',

  // PARTE 1: QUEM VOCÊ É?
  parte1: {
    essencia: {
      titulo: 'O Fleumático em Essência',
      resumo:
        'Você é um PACIFICADOR NATURAL E EQUILIBRADOR. Seu temperamento é caracterizado pela calma inabalável, aceitação tranquila e capacidade de manter a paz. Fleumáticos são os "mediadores e ouvintes" do mundo — pessoas que trazem estabilidade, compreensão e conforto para qualquer ambiente.',
      descricao:
        'Você opera a partir da lógica calma E da emoção estável. Quando as coisas ficam caóticas, você permanece tranquilo. Você não é do tipo que reage ou explode — você absorve, reflete e segue em frente. Você é a âncora que as pessoas precisam.',
    },
    comoProcessaMundo: {
      velocidade: {
        titulo: 'Velocidade: Você processa informações METODICAMENTE',
        itens: [
          'Você não se apressa em decisões',
          'Você observa antes de agir',
          'Você gosta de ter tempo para pensar',
          'Você fica desconfortável com pressa',
        ],
      },
      objetivo: {
        titulo: 'Objetivo: Você é ORIENTADO PARA PAZ E HARMONIA',
        itens: [
          'Quer evitar conflito a todo custo',
          'Mede sucesso pela harmonia dos relacionamentos',
          'Não tolera drama e discussões acaloradas',
          'Precisa de um ambiente calmo e seguro para prosperar',
        ],
      },
      controle: {
        titulo: 'Estabilidade: Você VALORIZA CONSISTÊNCIA',
        itens: [
          'Você não gosta de mudanças abruptas',
          'Você prefere uma rotina previsível e pacífica',
          'Você busca equilíbrio e estabilidade constante',
          'Você é naturalmente resistente a riscos desnecessários',
        ],
      },
      comunicacao: {
        titulo: 'Comunicação: Você é QUIETO MAS PROFUNDO',
        itens: [
          'Você ouve muito e fala pouco',
          'Você pesa as palavras com muito cuidado',
          'Você prefere ações concretas a discursos longos',
          'Você é reservado, mas profundamente confiável',
        ],
      },
    },
    pontosFortes: [
      {
        titulo: 'CAPACIDADE DE OUVIR GENUINAMENTE 👂',
        descricao:
          'Você é um dos poucos que realmente OUVE quando alguém fala. Você não espera sua vez de falar — você está genuinamente interessado. Isso torna você o confidente perfeito, o amigo que as pessoas buscam em momentos difíceis.',
        ondeBrilha:
          'Aconselhamento, terapia, mentoria, relacionamentos profundos, mediação de conflitos, suporte emocional.',
      },
      {
        titulo: 'PACIÊNCIA INFINITA ⏳',
        descricao:
          'Você consegue esperar. Você consegue escutar alguém desabafar por horas sem interromper. Você consegue trabalhar em projetos longos sem se impacientar. Sua paciência permite que outros tenham espaço para crescer no seu próprio ritmo.',
        ondeBrilha:
          'Parentalidade, educação, cuidado com a família, projetos de longo prazo, construção de relacionamentos duradouros.',
      },
      {
        titulo: 'ESTABILIDADE E CONFIABILIDADE 🛡️',
        descricao:
          'Você é a rocha. Quando todos ao redor estão em pânico, você está calmo. Quando alguém precisa de um porto seguro, você está ali. Sua consistência faz as pessoas saberem que podem contar com você sempre.',
        ondeBrilha:
          'Posições de confiança, liderança em crises, apoio emocional consistente, família, equipes que precisam de segurança.',
      },
      {
        titulo: 'CAPACIDADE DE MANTER PERSPECTIVA 🎯',
        descricao:
          'Você não dramatiza. Quando alguém está em pânico, você consegue ver com clareza. Você não cai nas espirais emocionais que outros caem. Isso te torna excelente em situações que requerem pensamento claro e ponderado.',
        ondeBrilha:
          'Resolução de problemas calma, mediação, aconselhamento, lidar com emergências, tomar decisões difíceis sem estresse.',
      },
      {
        titulo: 'GENTILEZA E COMPAIXÃO GENUÍNA 💚',
        descricao:
          'Você não é gentil por convenção social — você é genuinamente compassivo. Você vê a humanidade nas pessoas. Você consegue ser empático sem ser invasivo. Você traz conforto apenas com sua presença serena.',
        ondeBrilha:
          'Suporte emocional, relacionamentos, criação de espaços seguros, cuidado com vulneráveis, liderança pelo acolhimento.',
      },
    ],
    desafios: [
      {
        titulo: 'PASSIVIDADE E FALTA DE ASSERTIVIDADE 🚫',
        descricao:
          'Você evita confronto tanto que acaba não expressando o que realmente pensa ou deseja. Concorda com coisas contrariado(a), não defende seus limites e permite que outros tomem a frente da sua vida.',
        ondePrejudica:
          'Relacionamento (o parceiro não sabe o que você realmente quer), carreira (estagnação) e ressentimento acumulado.',
        sinalAlerta:
          'Seu parceiro pergunta "O que você quer comer/fazer?" e você responde automaticamente: "Tanto faz, você escolhe".',
      },
      {
        titulo: 'NEGLIGÊNCIA PESSOAL 😔',
        descricao:
          'Você cuida das necessidades de todo mundo, MENOS das suas. Não reserva tempo para hobbies próprios, sacrifica seu descanso constantemente e se coloca sempre em último lugar.',
        ondePrejudica:
          'Relacionamento (você se sente vazio e ressentido), saúde (autocuidado zero) e autoestima (sensação de invisibilidade).',
        sinalAlerta:
          'Você não consegue se lembrar da última vez que fez algo puramente porque QUERIA, e não por obrigação.',
      },
      {
        titulo: 'FALTA DE MOTIVAÇÃO E LETARGIA 💤',
        descricao:
          'Você se acomoda no comodismo da rotina e perde o senso de urgência. Procrastina decisões e projetos cruciais, deixando os sonhos do casal e os seus adormecidos.',
        ondePrejudica:
          'Carreira (não avança), relacionamento (parceiro fica frustrado com sua inércia) e realização pessoal.',
        sinalAlerta:
          '"Vou fazer depois" é sua resposta favorita, e o "depois" nunca chega.',
      },
      {
        titulo: 'INDECISÃO CRÔNICA 🤔',
        descricao:
          'O medo de errar ou de gerar descontentamento faz você adiar escolhas até o último segundo ou terceirizar todas as decisões para o parceiro.',
        ondePrejudica:
          'Relacionamento (sobrecarga emocional do parceiro tendo que decidir tudo sozinho) e perda de oportunidades.',
        sinalAlerta:
          '"Qualquer coisa está boa para mim" é sua resposta padrão para tudo.',
      },
      {
        titulo: 'DESCONEXÃO EMOCIONAL 🚷',
        descricao:
          'Sua serenidade externa pode parecer frieza ou desinteresse para o parceiro. Você tem enorme dificuldade em expressar o que sente e esconde feridas profundas atrás do silêncio.',
        ondePrejudica:
          'Intimidade conjugal (o parceiro se sente solitário e rejeitado) e repressão emocional que adoece a mente.',
        sinalAlerta:
          'Seu parceiro desabafa: "Eu não sei o que você realmente sente por mim ou por nós".',
      },
    ],
  },

  // PARTE 2: SEU DESENVOLVIMENTO PESSOAL
  parte2: {
    virtudes: [
      {
        numero: 1,
        titulo: 'ASSERTIVIDADE COM COMPAIXÃO',
        emoji: '💪',
        porQueEssencial:
          'Você pode manter a paz E ser honesto ao mesmo tempo. Assertividade não é agressividade — é clareza com amor. Sua vida se transforma quando você diz "não" sem culpa e "sim" de coração.',
        oQueSignifica: [
          'NÃO significa ser rude, hostil ou mandão',
          'SIGNIFICA expressar suas vontades e limites com clareza e respeito',
          'SIGNIFICA dizer "não" quando algo viola sua paz ou capacidade',
          'SIGNIFICA defender seus direitos e posicionamentos com gentileza firme',
        ],
        comoSaber: [
          'Você disse um "não" sereno para algo que não queria fazer',
          'Você expressou uma opinião divergente sem sentir culpa ou medo de abandono',
          'Seu parceiro disse: "Que bom saber exatamente o que você prefere!"',
          'Você sentiu a paz interior de ter sido verdadeiro consigo mesmo',
        ],
      },
      {
        numero: 2,
        titulo: 'AÇÃO APESAR DO CONFORTO',
        emoji: '🚀',
        porQueEssencial:
          'A zona de conforto pode ser uma prisão disfarçada de calmaria. O verdadeiro crescimento e a vitalidade do seu relacionamento exigem movimento intencional e iniciativa ativa.',
        oQueSignifica: [
          'NÃO significa se tornar uma pessoa agitada ou estressada',
          'SIGNIFICA agir mesmo quando a inércia puxa para ficar parado',
          'SIGNIFICA tomar a iniciativa em projetos e momentos românticos',
          'SIGNIFICA investir energia no seu próprio desenvolvimento e no futuro do casal',
        ],
        comoSaber: [
          'Você tirou da gaveta e concluiu uma tarefa que vinha procrastinando',
          'Você tomou a iniciativa em uma decisão ou programa importante do casal',
          'Você se movimentou em direção a uma meta mesmo estando confortável',
          'Você percebeu que é capaz de realizar muito mais do que imaginava',
        ],
      },
      {
        numero: 3,
        titulo: 'EXPRESSÃO EMOCIONAL AUTÊNTICA',
        emoji: '💬',
        porQueEssencial:
          'Relacionamentos profundos não se alimentam de silêncio passivo. Vulnerabilidade não é fraqueza — é a maior ponte para a verdadeira intimidade e cumplicidade.',
        oQueSignifica: [
          'NÃO significa fazer drama ou perder a compostura',
          'SIGNIFICA abrir o coração e falar sobre seus sentimentos reais',
          'SIGNIFICA dizer com todas as letras "isso me machucou" em vez de engolir a dor',
          'SIGNIFICA permitir que seu parceiro realmente conheça seu mundo interior',
        ],
        comoSaber: [
          'Você compartilhou uma angústia ou mágoa que antes guardaria sozinho',
          'Seu parceiro disse: "Agora finalmente sinto que te conheço por inteiro"',
          'Você experimentou alívio e conexão profunda após conversar',
          'Seu parceiro acolheu sua vulnerabilidade com carinho e respeito',
        ],
      },
    ],
    planoDesenvolvimento: [
      {
        mesNumero: 1,
        tituloMes: 'Construir Assertividade e Limites Saudáveis',
        atividades: [
          {
            periodo: 'Semana 1-2',
            titulo: 'Exercício do "Não Gentil"',
            descricao:
              'Escolha 1 pedido ou convite que você normalmente aceitaria apenas por educação e responda com gentileza firme: "Agradeço muito por pensar em mim, mas desta vez não vou conseguir participar". Sem desculpas longas.',
            duracaoOuFrequencia: 'Uma conversa prática',
            meta: 'Experimentar na prática que dizer "não" com respeito não destrói o vínculo.',
          },
          {
            periodo: 'Semana 3-4',
            titulo: 'Journaling de Assertividade Diária',
            descricao:
              'Todas as noites, registre: uma situação em que você concordou por passividade; o que você realmente gostaria de ter dito; e como se sentiria sendo autêntico(a).',
            duracaoOuFrequencia: '5 minutos todas as noites',
            meta: 'Identificar os gatilhos onde sua voz é calada para começar a mudá-los.',
          },
        ],
      },
      {
        mesNumero: 2,
        tituloMes: 'Desenvolver Ação e Iniciativa Prática',
        atividades: [
          {
            periodo: 'Semana 5-6',
            titulo: 'Exercício da "Pequena Ação"',
            descricao:
              'Escolha 1 pendência adiada (marcar uma consulta médica, consertar algo na casa, enviar um documento) e execute o primeiro passo imediatamente nesta semana.',
            duracaoOuFrequencia: '1 hora no máximo',
            meta: 'Quebrar o ciclo de letargia com um pequeno passo concreto.',
          },
          {
            periodo: 'Semana 7-8',
            titulo: 'Mapeamento e Proposta de Iniciativa',
            descricao:
              'Liste 10 programas ou atividades que você adoraria fazer. Escolha 1 e tome a iniciativa de propor e organizar para você e seu parceiro.',
            duracaoOuFrequencia: 'Uma proposta e realização na semana',
            meta: 'Assumir a liderança em uma experiência do casal em vez de apenas esperar ser convidado.',
          },
        ],
      },
      {
        mesNumero: 3,
        tituloMes: 'Construir Expressão Emocional e Intimidade',
        atividades: [
          {
            periodo: 'Semana 9-10',
            titulo: 'Exercício de Vulnerabilidade a Dois',
            descricao:
              'Escolha 1 sentimento íntimo guardado (insegurança, medo ou tristeza) e compartilhe com seu parceiro: "Há algo no meu coração que gostaria de compartilhar com você para me sentir mais perto de você".',
            duracaoOuFrequencia: '15 minutos de conversa calma',
            meta: 'Permitir que o parceiro acesse seu mundo interior.',
          },
          {
            periodo: 'Semana 11-12',
            titulo: 'Prática de Expressão Emocional Diária',
            descricao:
              'Expresse verbalmente ao menos 1 sentimento por dia ao parceiro (ex: "Eu adorei esse momento com você", "Fiquei um pouco apreensivo hoje", "Estou muito grato pela sua presença").',
            duracaoOuFrequencia: 'Uma frase sincera por dia',
            meta: 'Tornar a manifestação verbal de sentimentos um hábito natural.',
          },
        ],
      },
      {
        mesNumero: 4,
        tituloMes: 'Integração e Revisão de Conquistas',
        atividades: [
          {
            periodo: 'Semana 13-14',
            titulo: 'Revisão de Conquistas Assertivas',
            descricao:
              'Reflita por escrito: Em qual situação você foi firme e respeitoso? Qual ação você tomou por iniciativa própria? Que sentimento expressou com coragem? Como o relacionamento floresceu?',
            duracaoOuFrequencia: '15 minutos de reflexão no caderno',
            meta: 'Reconhecer seu valor e consolidar o novo padrão ativo.',
          },
          {
            periodo: 'Semana 15-16',
            titulo: 'Prática do Tempo Sagrado Pessoal',
            descricao:
              'Reserve 2 horas na semana exclusivamente para um hobby ou atividade que nutra sua alma individual, sem culpa e sem obrigações.',
            meta: 'Restaurar a sua individualidade dentro do casamento.',
          },
        ],
      },
      {
        mesNumero: 5,
        tituloMes: 'Prática Contínua de Hábitos',
        atividades: [
          {
            periodo: 'Semana 17-20 (Mês 5)',
            titulo: 'Sustentação dos 2 Melhores Hábitos',
            descricao:
              'Selecione as 2 práticas que mais revitalizaram seu ânimo e a cumplicidade conjugal e mantenha-as permanentemente na rotina.',
            meta: 'Fixar a assertividade e a iniciativa como virtudes automáticas da sua vida.',
          },
        ],
      },
    ],
  },

  // PARTE 3: VOCÊ NO RELACIONAMENTO 💕
  parte3: {
    formaDeAmar: {
      titulo: 'Sua Forma de Amar: Consistente, Confortável e Protetora',
      descricao:
        'Como fleumático, sua forma de amar é através da presença inabalável, da aceitação incondicional e do suporte silencioso e leal.',
      ladoLuminoso: [
        'Estar presente: você é o refúgio de paz onde o parceiro descansa; não abandona nos momentos turbulentos.',
        'Ouvir sem julgar: escuta as dores e desabafos do parceiro com paciência acolhedora, sem críticas ou imposições.',
        'Agir consistentemente: demonstra afeto através da confiabilidade prática e de pequenos atos de cuidado diário.',
        'Permitir espaço: não é controlador nem invasivo, permitindo que o outro seja autêntico e respeitando o tempo de cada um.',
      ],
      ladoDificil:
        'Seu amor pode parecer excessivamente passivo ou desinteressado: a falta de iniciativa romântica, o silêncio diante de conflitos e o comodismo podem fazer o parceiro se sentir pouco desejado ou sozinho no leme do relacionamento.',
    },
    padroesConflito: [
      {
        numero: 1,
        titulo: 'Você evita confronto até explodir de repente',
        descricao:
          'Para não gerar atrito, você se cala e finge que está tudo bem. Vai acumulando frustrações por semanas até que, em um momento qualquer, você se fecha completamente ou solta uma lista de mágoas represadas.',
        exemplo:
          'Parceiro pergunta: "Por que você está tão quieto?"; você responde: "Está tudo bem" → dias depois, você explode: "Você nunca me escuta!", deixando o outro sem entender.',
      },
      {
        numero: 2,
        titulo: 'Você diz "sim" quando no fundo quer dizer "não"',
        descricao:
          'Para manter a harmonia no momento, você aceita programas ou compromissos que detesta. Depois comparece mal-humorado(a) e frio(a), gerando um conflito muito pior do que se tivesse sido sincero(a).',
        exemplo:
          'Aceitar ir a um evento exaustivo no sábado querendo descansar em casa; passar a noite emburrado(a) e o parceiro reclamar: "Era melhor não ter vindo!".',
      },
      {
        numero: 3,
        titulo: 'Você não expõe sentimentos até a dor ficar insuportável',
        descricao:
          'Você acha que falar sobre suas dores é "criar drama" ou ser um peso. Sofre em silêncio e se distancia emocionalmente, fazendo o parceiro se sentir excluído da sua vida íntima.',
        exemplo:
          'Passar semanas machucado(a) por um comentário sem falar nada, gerando um muro invisível de distanciamento no casal.',
      },
      {
        numero: 4,
        titulo: 'Você permite que o parceiro te controle "para ter paz"',
        descricao:
          'Para evitar discussões, você cede em todas as vontades do parceiro. Com o tempo, acumula um ressentimento silencioso e amargo, sentindo-se invisível na própria relação.',
        exemplo:
          'Ceder em decisões sobre viagens, casa ou rotina mesmo sendo contra, e depois ficar distante e amargurado(a) com a escolha.',
      },
      {
        numero: 5,
        titulo: 'Você se isola quando está sofrendo',
        descricao:
          'Diante de problemas difíceis ou estresse, seu impulso é sumir para dentro de si mesmo(a). Recusa ajuda com "não se preocupe, eu me viro", privando o parceiro de te apoiar.',
        exemplo:
          'Estar sobrecarregado(a) com trabalho e família e se trancar no quarto ou no silêncio, deixando o parceiro desamparado sem saber como ajudar.',
      },
    ],
    oQueParceiroPrecisaSaber: [
      {
        topico: 'Seu silêncio e calma não são desinteresse ou frieza',
        explicacao:
          'Sua tranquilidade é sua maneira natural de processar a vida e expressar segurança afetiva.',
        fraseParaOParceiro:
          'Quando fico calmo(a) e em silêncio, não é porque não me importo. É a minha forma de transmitir paz e segurança. Eu te amo profundamente.',
      },
      {
        topico: 'Você se cala por medo de incomodar ou criar conflito',
        explicacao:
          'O silêncio do fleumático é uma tentativa de proteger a paz, mas que precisa ser transformado em diálogo amoroso.',
        fraseParaOParceiro:
          'Estou aprendendo a compartilhar mais. Quando não falo, é por medo de criar atritos. Me ajuda muito quando você me convida com ternura a me abrir.',
      },
      {
        topico: 'Você precisa de tempo para decidir, mas estará presente',
        explicacao:
          'Pressionar por respostas imediatas gera travamento. Com um tempo para refletir, você toma decisões lúcidas e firmes.',
        fraseParaOParceiro:
          'Meu tempo para processar é mais compassado. Se você me der um momento para pensar, eu chego junto com total clareza e compromisso.',
      },
      {
        topico: 'Seu "sim" forçado para manter a paz gera amargura',
        explicacao:
          'Concordar contra a própria vontade destrói a harmonia real. O fleumático precisa ser encorajado a dizer o que realmente pensa.',
        fraseParaOParceiro:
          'Quando digo "sim" sem querer, acabo me ressentindo. Me incentive a ser sincero(a) sobre meus limites antes de concordar.',
      },
      {
        topico: 'Sua calma é um presente precioso em momentos de caos',
        explicacao:
          'Manter a serenidade quando tudo ao redor balança é uma capacidade extraordinária de equilíbrio para o casal.',
        fraseParaOParceiro:
          'Minha calma não é indiferença — é capacidade de manter a perspectiva em tempos difíceis. Você pode se apoiar nela com segurança.',
      },
    ],
    acoesConcretas: [
      {
        numero: 1,
        titulo: 'Protocolo de Honestidade Segura',
        descricao:
          'Quando sentir receio de falar, diga ao parceiro: "Preciso ser sincero(a), mas tenho receio da sua reação". O parceiro se compromete a ouvir com acolhimento e sem julgamentos.',
      },
      {
        numero: 2,
        titulo: 'Dia de Assertividade Semanal',
        descricao:
          'Escolha 1 dia fixo na semana (ex: terça-feira) para praticar expressar claramente 1 desejo, 1 recusa ou 1 opinião que normalmente guardaria.',
      },
      {
        numero: 3,
        titulo: 'Caderno de Iniciativa Própria',
        descricao:
          'Anote desejos, passeios e programas que VOCÊ gostaria de fazer e proponha pelo menos 1 iniciativa planejada por você a cada mês.',
      },
      {
        numero: 4,
        titulo: 'Conversa de Check-in Profundo Semanal',
        descricao:
          'Reservem 30 minutos no domingo à noite onde VOCÊ fala primeiro, respondendo com verdade à pergunta: "Como está seu coração de verdade?".',
      },
      {
        numero: 5,
        titulo: 'Regra dos 5 Segundos (Não Automático)',
        descricao:
          'Diante de qualquer pedido, pause 5 segundos antes de responder e pergunte-se: "Eu realmente quero isso?". Se não, diga: "Vou pensar e te aviso logo".',
      },
      {
        numero: 6,
        titulo: 'Momento de Vulnerabilidade Agendado',
        descricao:
          'Uma vez por mês, compartilhe com seu parceiro algo que faça você se sentir frágil ou inseguro(a), fortalecendo a intimidade emocional do casal.',
      },
      {
        numero: 7,
        titulo: 'Definição de Zonas Onde Você Decide',
        descricao:
          'Definam áreas da vida conjugal onde você terá a palavra final (rotina pessoal, lazer específico, hobbies), resgatando seu poder de escolha.',
      },
      {
        numero: 8,
        titulo: 'Pausa Reflexiva Antes de Aceitar',
        descricao:
          'Para decisões importantes, crie o hábito de não responder no calor do momento: "Deixe-me refletir hoje e amanhã conversamos com calma".',
      },
      {
        numero: 9,
        titulo: 'Dia da Iniciativa Romântica Mensal',
        descricao:
          'Uma vez por mês, assuma a liderança de planejar uma surpresa ou encontro romântico especial para o parceiro, demonstrando afeto ativo.',
      },
      {
        numero: 10,
        titulo: 'Revisão Trimestral Focada em Você',
        descricao:
          'A cada 3 meses, dediquem 2 horas para avaliar o casamento com foco especial nas SUAS necessidades emocionais e sonhos individuais.',
      },
    ],
    compatibilidade: [
      {
        temperamentoAlvo: 'colerico',
        titulo: 'Fleumático com Colérico 🌊 + 🔥',
        pontosPositivos:
          'O colérico traz iniciativa, coragem e direção para tirar seus planos do papel; você traz serenidade, escuta e equilíbrio para a intensidade dele.',
        pontosAtencao:
          'O colérico pode se irritar com sua lentidão ou atropelar suas decisões; você pode se retrair com a rispidez dele.',
        dica: 'Posicione-se com clareza e gentileza firme. O colérico respeita profundamente quem sabe expressar seus limites com serenidade.',
      },
      {
        temperamentoAlvo: 'sanguineo',
        titulo: 'Fleumático com Sanguíneo 🌊 + ⚡',
        pontosPositivos:
          'O sanguíneo traz alegria, energia contagiante e novidade para o seu mundo calmo; você oferece o porto seguro e a estabilidade que ancoram a vida dele.',
        pontosAtencao:
          'A agitação constante dele pode drenar sua energia; sua passividade pode entediar o parceiro.',
        dica: 'Permita-se embarcar nas aventuras do parceiro de vez em quando, e estabeleçam momentos sagrados de descanso e silêncio.',
      },
      {
        temperamentoAlvo: 'melancolico',
        titulo: 'Fleumático com Melancólico 🌊 + 💙',
        pontosPositivos:
          'Ambos valorizam a calma, a fidelidade incondicional, a profundidade e a vida em família sem dramas artificiais.',
        pontosAtencao:
          'O melancólico pode achar você emocionalmente distante; você pode se sentir sobrecarregado pela intensidade analítica dele.',
        dica: 'Abra seu coração e verbalize seus sentimentos. O melancólico se sente seguro quando você expressa o que sente.',
      },
      {
        temperamentoAlvo: 'fleumatico',
        titulo: 'Fleumático com Fleumático 🌊 + 🌊',
        pontosPositivos:
          'Paz absoluta, zero discussões agressivas, compreensão mútua impecável e um lar extremamente tranquilo e acolhedor.',
        pontosAtencao:
          'Risco severo de inércia mútua: ninguém toma decisões difíceis, projetos emperram e o romance pode virar monotonia.',
        dica: 'Definam papéis claros de iniciativa e estabeleçam metas conjuntas com prazos definidos no calendário.',
      },
    ],
  },

  // PARTE 4: SEUS PRÓXIMOS PASSOS 🚀
  parte4: {
    proximosPassos: {
      duasSemanas: [
        'Leia este laudo com calma na íntegra, reconhecendo o valor imenso da sua tranquilidade',
        'Identifique seus 2 padrões de conflito mais frequentes (qual dos 5 mais se repete?)',
        'Escolha 2 ações concretas imediatas (comece apenas com essas 2 para manter o foco)',
        'Compartilhe com seu parceiro e leiam juntos a seção "O que seu parceiro precisa saber"',
        'Agende a mentoria para casais para transformar sua serenidade em assertividade prática',
      ],
      quatroSemanas: [
        'Pratique o "Não Gentil" e a regra dos 5 segundos nas decisões cotidianas (Mês 1)',
        'Inicie o journaling de assertividade e observe os momentos em que você calou sua voz',
        'Avalie como a sua honestidade respeitosa trouxe mais verdade e alívio para o lar',
        'Traga suas vitórias e reflexões para a próxima sessão de mentoria',
      ],
    },
    mensagemFinal:
      'Querido(a) Fleumático(a), você é um PRESENTE inestimável para o mundo. Sua serenidade em meio à tempestade, sua paciência acolhedora e sua capacidade de harmonizar qualquer ambiente são virtudes raras e preciosas. Mas você não precisa desaparecer ou se calar para que haja paz. A verdadeira harmonia não nasce do silêncio passivo, mas da verdade dita com amor. Sua missão agora não é apenas manter todos confortáveis — é ser plenamente feliz e ter voz ativa na construção da sua própria história a dois. Você pode ser gentil E assertivo. Pode ser sereno E cheio de iniciativa. Comece hoje, comece pequeno, mas comece.',
    recursos: {
      livrosRecomendados: [
        {
          titulo: 'Limites: Quando Dizer Sim, Quando Dizer Não',
          autor: 'Henry Cloud & John Townsend',
        },
        {
          titulo: 'Assertividade: O Poder de se Posicionar com Respeito',
          autor: 'Vários Autores',
        },
        {
          titulo: 'Os 5 Idiomas do Amor',
          autor: 'Gary Chapman',
        },
      ],
      exerciciosComplementares: [
        'Práticas de respiração consciente e yoga suave para conectar corpo e mente',
        'Journaling reflexivo noturno para dar vazão às emoções que foram guardadas',
        'Caminhada contemplativa sozinho(a) para clarear os próprios desejos e prioridades',
      ],
      sinaisProgresso: [
        'Você disse um "não" gentil e sereno sem sentir o peso da culpa',
        'Você compartilhou um incômodo ou sentimento sincero que antes guardaria no silêncio',
        'Você tomou a iniciativa em uma decisão ou programa importante do casal',
        'Seu parceiro disse com alegria e admiração: "Como é bom saber o que você realmente quer!"',
        'Você reservou tempo e investiu em um momento só seu, com leveza e paz no coração',
      ],
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
