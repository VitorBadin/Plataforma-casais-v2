export type CoupleHealthPillarKey =
  | 'p01_financeira'
  | 'p02_rotina'
  | 'p03_familiar'
  | 'p04_dialogo'
  | 'p05_tempo'
  | 'p06_conexao'
  | 'p07_quimica'
  | 'p08_valores';

export interface CoupleHealthMapResponse {
  id: string;
  user_id: string;
  p01_financeira: number;
  p02_rotina: number;
  p03_familiar: number;
  p04_dialogo: number;
  p05_tempo: number;
  p06_conexao: number;
  p07_quimica: number;
  p08_valores: number;
  enviado_em: string;
  criado_em?: string;
}

export type CoupleHealthFormData = Record<CoupleHealthPillarKey, number | null>;

export interface CoupleHealthPillar {
  key: CoupleHealthPillarKey;
  number: number;
  title: string;
  shortTitle: string;
  actionPlan: string;
}

export interface CoupleHealthComparisonItem {
  pillar: CoupleHealthPillar;
  userScore: number;
  spouseScore: number;
  diff: number;
  isBlindSpot: boolean; // diff > 3 (i.e. >= 4)
  needsAttentionUser: boolean; // 1 <= userScore <= 6
  needsAttentionSpouse: boolean; // 1 <= spouseScore <= 6
  needsAttentionAny: boolean; // userScore <= 6 || spouseScore <= 6
}
