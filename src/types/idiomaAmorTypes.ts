// ========================================================
// TIPOS TYPESCRIPT — QUIZ "SEU IDIOMA DO AMOR"
// ========================================================

export type IdiomaAmor =
  | 'palavras'     // Palavras de Afirmação (Opção E)
  | 'tempo'        // Tempo de Qualidade (Opção D)
  | 'presentes'    // Receber Presentes (Opção A)
  | 'servico'      // Atos de Serviço (Opção B)
  | 'toque';       // Toque Físico (Opção C)

/** Respostas possíveis para cada cenário (A a E) */
export type OpcaoABCDE = 'A' | 'B' | 'C' | 'D' | 'E';

/** Metadados visuais e conceituais de cada idioma do amor */
export interface IdiomaAmorMeta {
  key: IdiomaAmor;
  label: string;
  emoji: string;
  color: string;        // cor hex principal
  gradientFrom: string; // Tailwind class
  gradientTo: string;   // Tailwind class
  bgLight: string;      // Tailwind bg class suave
  textColor: string;    // Tailwind text class
  borderColor: string;  // Tailwind border class
  descricaoCurta: string;
}

/** Opção de resposta individual para uma pergunta */
export interface IdiomaAmorOpcao {
  letra: OpcaoABCDE;
  idioma: IdiomaAmor;
  texto: string;
}

/** Pergunta/Cenário do quiz */
export interface IdiomaAmorPergunta {
  number: number;
  tituloCenario: string;
  cenario: string;
  opcoes: IdiomaAmorOpcao[];
}

/** Resultado calculado do quiz */
export interface IdiomaAmorResult {
  id: string;
  user_id: string;
  pontuacoes: Record<IdiomaAmor, number>;
  percentuais: Record<IdiomaAmor, number>;
  idioma_primario: IdiomaAmor;
  idioma_secundario: IdiomaAmor;
  distribuicao_ordenada: {
    idioma: IdiomaAmor;
    label: string;
    emoji: string;
    pontos: number;
    percentual: number;
  }[];
  frase_resumo: string;
  calculado_em: string;
}

/** Registro de resposta individual para persistência */
export interface IdiomaAmorAnswer {
  user_id: string;
  question_number: number;
  opcao_escolhida: OpcaoABCDE;
  idioma_atribuido: IdiomaAmor;
}

/** Estrutura base de relatório (Parte 2) */
export interface LoveLanguageReportData {
  idioma: IdiomaAmor;
  titulo: string;
  tagline: string;
  em_preparacao?: boolean;
  resumo?: string;
  secoes?: {
    titulo: string;
    conteudo: string;
  }[];
  atualizado_em?: string;
}
