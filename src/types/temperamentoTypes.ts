// ========================================================
// TIPOS TYPESCRIPT — QUIZ "TESTE DE TEMPERAMENTO"
// ========================================================

export type Temperamento = 'colerico' | 'sanguineo' | 'melancolico' | 'fleumatico';

export type IntensidadeTemperamento =
  | 'Traço leve'
  | 'Presente e notável'
  | 'Temperamento forte'
  | 'Temperamento MUITO dominante';

/** Resposta possível do Bloco 1 e Bloco 3 (múltipla escolha A/B/C/D) */
export type OpcaoABCD = 'A' | 'B' | 'C' | 'D';

/** Resposta possível do Bloco 2 (escala de 3 pontos) */
export type EscalaBloco2 = 'MUITO' | 'MAIS_OU_MENOS' | 'NAO';

/** Metadados visuais de cada temperamento */
export interface TemperamentoMeta {
  key: Temperamento;
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

/** Uma pergunta do quiz de temperamento */
export interface TemperamentoPergunta {
  number: number;
  bloco: 1 | 2 | 3;
  texto: string;
  /** Para blocos 1 e 3: opções A/B/C/D com texto */
  opcoes?: { letra: OpcaoABCD; texto: string }[];
  /** Para bloco 2: temperamento ao qual esta pergunta pertence */
  temperamentoAlvo?: Temperamento;
}

/** Resultado calculado do quiz de temperamento */
export interface TemperamentoResult {
  id: string;
  user_id: string;
  pontuacoes: Record<Temperamento, number>;
  temperamento_primario: Temperamento;
  intensidade_primario: IntensidadeTemperamento;
  temperamento_secundario: Temperamento;
  intensidade_secundario: IntensidadeTemperamento;
  frase_resumo: string;
  calculado_em: string;
}

/** Registro individual de resposta (para persistência) */
export interface TemperamentoAnswer {
  user_id: string;
  question_number: number;
  resposta: string;
  pontos_atribuidos: number;
  temperamento_atribuido: Temperamento;
}
