// ========================================================
// CONTEÚDO DOS RELATÓRIOS PERSONALIZADOS — SEU IDIOMA DO AMOR
// Elaborado pela Psicóloga Elaine Souza — Casamento Conectado
// ========================================================

import {
  IdiomaAmor,
  LoveLanguageReportData,
  IdiomaSecundarioSnippet,
} from '@/types/idiomaAmorTypes';

/**
 * Tabela de referência para o idioma secundário e expressões de necessidade
 */
export const IDIOMA_SECUNDARIO_SNIPPETS: Record<IdiomaAmor, IdiomaSecundarioSnippet> = {
  palavras: {
    idioma: 'palavras',
    label: 'Palavras de Afirmação',
    descricaoQuandoSecundario: 'ouve elogios sinceros, reconhecimento e palavras de encorajamento',
    necessidadeExpressao: 'VALIDAÇÃO VERBAL',
  },
  servico: {
    idioma: 'servico',
    label: 'Atos de Serviço',
    descricaoQuandoSecundario: 'alguém antecipa suas necessidades e reduz sua carga de tarefas do dia a dia',
    necessidadeExpressao: 'AÇÕES CONCRETAS',
  },
  toque: {
    idioma: 'toque',
    label: 'Toque Físico',
    descricaoQuandoSecundario: 'recebe abraços, toques e proximidade física com frequência',
    necessidadeExpressao: 'CONTATO FÍSICO',
  },
  tempo: {
    idioma: 'tempo',
    label: 'Tempo de Qualidade',
    descricaoQuandoSecundario: 'alguém dedica tempo exclusivo e atenção total a você, sem distrações',
    necessidadeExpressao: 'PRESENÇA',
  },
  presentes: {
    idioma: 'presentes',
    label: 'Receber Presentes',
    descricaoQuandoSecundario: 'recebe presentes ou lembranças que mostram que pensaram em você',
    necessidadeExpressao: 'PENSAMENTO ESPECIAL',
  },
};

/**
 * Conteúdo completo dos 5 relatórios por idioma primário
 */
export const LOVE_LANGUAGE_REPORTS: Record<IdiomaAmor, LoveLanguageReportData> = {
  palavras: {
    idioma: 'palavras',
    titulo: 'Palavras de Afirmação',
    oQueSignifica:
      'Para você, palavras têm poder transformador. Elogios, reconhecimento, palavras de encorajamento e afirmações de amor comunicam valor, validação e importância em formas que palavras podem ser insuficientes para explicar.',
    comoSenteAmor: [
      'Você se sente especial quando ouve elogios genuínos',
      'Palavras de encorajamento te motivam profundamente',
      'Você se sente magoado(a) por críticas ou falta de reconhecimento',
      'Ouvir "eu te amo" frequentemente reafirma sua segurança',
      'Você precisa de validação verbal para se sentir amado(a)',
    ],
    comportamentosDemonstra: [
      'Você elogia seu cônjuge regularmente',
      'Você expressa verbalmente seu amor frequentemente',
      'Você reconhece os esforços e qualidades dele/a',
      'Você oferece palavras de encorajamento em momentos difíceis',
      'Você valoriza quando alguém reconhece suas qualidades',
      'Você se sente motivado(a) por validação verbal',
    ],
    importanciaIdioma:
      'Seu idioma primário (Palavras de Afirmação) é fundamental na forma como você se sente valorizado(a) no relacionamento. Quando você ouve palavras de amor, reconhecimento e encorajamento, sua segurança emocional é reafirmada. Isso não é vaidade. É uma necessidade emocional legítima. Assim como algumas pessoas precisam de toque físico para se sentir seguras, você precisa de validação verbal. E isso é absolutamente normal e válido. A questão agora é: seu cônjuge sabe disso? Ele/a fala seu idioma regularmente? Se não, você provavelmente se sente emocionalmente distante, inseguro(a) ou negligenciado(a), mesmo que ele/a a ame muito.',
  },

  servico: {
    idioma: 'servico',
    titulo: 'Atos de Serviço',
    oQueSignifica:
      'Para você, ações falam mais alto que palavras. O amor não é dito, é FEITO. Quando alguém tira uma tarefa de suas costas, facilita sua vida, ou cuida de algo que você estava preocupado(a), é naquele momento que você SENTE que é amado(a).',
    comoSenteAmor: [
      'Você se sente amado(a) quando alguém antecipa suas necessidades',
      'Quando seu cônjuge faz algo sem ser pedido, isso comunica "eu me importo com você"',
      'Você se sente negligenciado(a) quando as responsabilidades recaem sempre em você',
      'Quando alguém reduz sua carga de trabalho, você se sente seguro(a) e valorizado(a)',
      'Você mede o amor pelos esforços e ações concretas',
      'Você precisa de ajuda para se sentir amado(a)',
    ],
    comportamentosDemonstra: [
      'Você faz coisas pelo seu cônjuge sem ser pedido(a)',
      'Você antecipa o que precisa ser feito',
      'Você se oferece para ajudar em tarefas',
      'Você cuida dos detalhes práticos do relacionamento',
      'Você se sente satisfeito(a) quando consegue aliviar a carga do outro',
      'Você expressa amor através de ações concretas',
    ],
    importanciaIdioma:
      'Seu idioma primário (Atos de Serviço) é fundamental na forma como você se sente valorizado(a) no relacionamento. Quando seu cônjuge faz coisas por você, sem ser pedido, sem expectativa de retorno, apenas porque se importa, sua segurança emocional é reafirmada. Isso não é preguiça. É uma necessidade emocional legítima. Assim como algumas pessoas precisam de elogios para se sentir seguras, você precisa de ação. E isso é absolutamente normal e válido. A questão agora é: seu cônjuge faz coisas por você? Ele/a toma iniciativas? Ou você sempre é quem faz tudo? Se for assim, você provavelmente se sente esgotado(a), ressentido(a) ou negligenciado(a), mesmo que ele/a diga que o/a ama.',
  },

  toque: {
    idioma: 'toque',
    titulo: 'Toque Físico',
    oQueSignifica:
      'Para você, o contato físico é linguagem de amor. Abraços, beijos, mãos dadas, toques no braço, carícias — comunicam segurança, conexão e afeto de forma que palavras nunca poderiam. Quando alguém o/a toca com intenção, você SENTE que é amado(a).',
    comoSenteAmor: [
      'Você se sente amado(a) quando recebe abraços genuínos',
      'Mãos dadas comunicam segurança e pertencimento',
      'Toques casuais (mão nas costas, braço) reconfortam profundamente',
      'Intimidade física é essencial para sua segurança emocional',
      'Falta de toque físico faz você se sentir rejeitado(a) e distante',
      'Você precisa de contato para se sentir amado(a)',
    ],
    comportamentosDemonstra: [
      'Você é afetuoso(a) e toca naturalmente seu cônjuge',
      'Você gosta de abraços longos e toques prolongados',
      'Você alcança a mão dele/a durante conversas',
      'Você busca proximidade física frequentemente',
      'Você expressa amor através de beijos e carícias',
      'Você se sente confortável com demonstrações públicas de afeto',
    ],
    importanciaIdioma:
      'Seu idioma primário (Toque Físico) é fundamental na forma como você se sente valorizado(a) no relacionamento. Quando seu cônjuge o/a toca com intenção, carinho e consistência, sua segurança emocional é profundamente reafirmada. Isso não é superficial ou "apenas físico". É uma necessidade emocional legítima. Assim como algumas pessoas precisam de palavras para se sentir seguras, você precisa de toque. E isso é absolutamente normal e válido. A questão agora é: seu cônjuge o/a toca regularmente? Ele/a busca proximidade física? Ou você se sente distante fisicamente? Se for assim, você provavelmente se sente emocionalmente negligenciado(a), mesmo que ele/a diga que o/a ama.',
  },

  tempo: {
    idioma: 'tempo',
    titulo: 'Tempo de Qualidade',
    oQueSignifica:
      'Para você, o amor é PRESENÇA. Não é uma tarefa rápida ou um presente entregue. É estar TOTALMENTE com alguém, sem distrações, sem pressa, focado nessa pessoa. Quando alguém dedica tempo exclusivo para você, você SENTE que é importante, que é PRIORIDADE.',
    comoSenteAmor: [
      'Você se sente amado(a) quando alguém dedica tempo exclusivo para estar com você',
      'Conversas profundas e significativas são nutrição emocional',
      'Quando seu cônjuge desliga o celular e te foca completamente, você sente que é sua prioridade',
      'Atividades compartilhadas (caminhar, cozinhar, assistir algo junto) comunicam amor',
      'Falta de tempo dedicado faz você se sentir negligenciado(a) e menos importante',
      'Você precisa de presença para se sentir seguro(a) no relacionamento',
    ],
    comportamentosDemonstra: [
      'Você dedica tempo a quem ama sem hesitar',
      'Você sugere atividades juntos frequentemente',
      'Você desliga distrações quando está com pessoas importantes',
      'Você gosta de conversas profundas e significativas',
      'Você se sente frustrado(a) quando as pessoas estão "ocupadas"',
      'Você demonstra amor através de presença e atenção focada',
    ],
    importanciaIdioma:
      'Seu idioma primário (Tempo de Qualidade) é fundamental na forma como você se sente valorizado(a) no relacionamento. Quando seu cônjuge dedica tempo exclusivo para estar com você, sua segurança emocional é profundamente reafirmada. Isso não é egoísmo. É uma necessidade emocional legítima. Assim como algumas pessoas precisam de gestos para se sentir seguras, você precisa de presença. E isso é absolutamente normal e válido. A questão agora é: seu cônjuge dedica tempo exclusivo para você? Ele/a sugere atividades? Ou você sempre é quem marca encontros? Se for assim, você provavelmente se sente distante e negligenciado(a), mesmo que ele/a diga que o/a ama.',
  },

  presentes: {
    idioma: 'presentes',
    titulo: 'Receber Presentes',
    oQueSignifica:
      'Para você, presentes são símbolos de pensamento e valor. Não pelos presentes em si, mas pelo que eles representam: "Você estava em meu pensamento. Você é importante o suficiente para eu parar e trazer algo de volta para você." Presentes dizem: "Eu vejo você, penso em você, me importo com você."',
    comoSenteAmor: [
      'Você se sente amado(a) quando recebe surpresas e presentes',
      'Um presente pequeno comunica "você estava em minha mente"',
      'Presentes significativos mostram que alguém conhece seus gostos e necessidades',
      'A consistência de presentes comunica amor regular',
      'Falta de presentes faz você se sentir negligenciado(a) ou esquecido(a)',
      'Você precisa de símbolos de valor para se sentir amado(a)',
    ],
    comportamentosDemonstra: [
      'Você traz presentes para quem ama frequentemente',
      'Você escolhe presentes com intencionalidade e significado',
      'Você observa e anota coisas que as pessoas mencionam',
      'Você se sente feliz ao entregar um presente que é "perfeito"',
      'Você aprecia quando alguém traz presentes para você',
      'Você demonstra amor através de surpresas e presentes significativos',
    ],
    importanciaIdioma:
      'Seu idioma primário (Presentes) é fundamental na forma como você se sente valorizado(a) no relacionamento. Quando seu cônjuge traz presentes que mostram que o/a conhece e pensa em você, sua segurança emocional é profundamente reafirmada. Isso não é superficialidade. É uma necessidade emocional legítima. Assim como algumas pessoas precisam de abraços para se sentir seguras, você precisa de presentes. E isso é absolutamente normal e válido. A questão agora é: seu cônjuge traz presentes regularmente? Ele/a observa coisas que você menciona? Ou você se sente esquecido(a)? Se for assim, você provavelmente se sente emocionalmente negligenciado(a), mesmo que ele/a diga que o/a ama.',
  },
};

/**
 * Função utilitária para obter o relatório de um idioma primário
 */
export function getLoveLanguageReport(idioma: IdiomaAmor): LoveLanguageReportData {
  return LOVE_LANGUAGE_REPORTS[idioma] || LOVE_LANGUAGE_REPORTS.palavras;
}

/**
 * Função para gerar o texto da seção dinâmica do idioma secundário
 */
export function getDynamicSecondarySnippet(
  primario: IdiomaAmor,
  secundario: IdiomaAmor,
  percentualSecundario: number
): {
  titulo: string;
  paragrafo1: string;
  paragrafo2: string;
  necessidadePrimaria: string;
  necessidadeSecundaria: string;
  descricaoSecundaria: string;
} {
  const metaSecundario = IDIOMA_SECUNDARIO_SNIPPETS[secundario] || IDIOMA_SECUNDARIO_SNIPPETS.tempo;
  const metaPrimario = IDIOMA_SECUNDARIO_SNIPPETS[primario] || IDIOMA_SECUNDARIO_SNIPPETS.palavras;

  const necessidadePrimaria = metaPrimario.necessidadeExpressao;
  const necessidadeSecundaria = metaSecundario.necessidadeExpressao;
  const descricaoSecundaria = metaSecundario.descricaoQuandoSecundario;
  const labelSecundario = metaSecundario.label;

  const titulo = `O QUE SIGNIFICA SEU IDIOMA SECUNDÁRIO — ${labelSecundario.toUpperCase()}`;

  const paragrafo1 = `Você também tem forte conexão com o idioma de ${labelSecundario} (${percentualSecundario}%). Isso significa que você TAMBÉM se sente amado(a) quando: ${descricaoSecundaria}.`;

  const paragrafo2 = `Sua combinação de ${necessidadePrimaria} + ${labelSecundario} significa que você é uma pessoa que precisa de ${necessidadePrimaria} E ${necessidadeSecundaria}.`;

  return {
    titulo,
    paragrafo1,
    paragrafo2,
    necessidadePrimaria,
    necessidadeSecundaria,
    descricaoSecundaria,
  };
}
