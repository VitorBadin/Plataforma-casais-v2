export interface DesireMapResponse {
  id?: string;
  user_id: string;
  exp_01: string;
  exp_02: string;
  exp_03: string;
  exp_04: string;
  exp_05: string;
  exp_06: string;
  exp_07: string;
  exp_08: string;
  exp_09: string;
  exp_10: string;
  q02_significado: string;
  q03_perdido: string;
  q04_autopercepcao: string;
  enviado_em?: string;
  criado_em?: string;
}

export type DesireMapFormValues = {
  exp_01: string;
  exp_02: string;
  exp_03: string;
  exp_04: string;
  exp_05: string;
  exp_06: string;
  exp_07: string;
  exp_08: string;
  exp_09: string;
  exp_10: string;
  q02_significado: string;
  q03_perdido: string;
  q04_autopercepcao: string;
};
