import { Temperamento } from './temperamentoTypes';

export interface PontoForteReport {
  titulo: string;
  descricao: string;
  ondeBrilha: string;
}

export interface DesafioReport {
  titulo: string;
  descricao: string;
  ondePrejudica: string;
  sinalAlerta: string;
}

export interface VirtudeReport {
  numero: number;
  titulo: string;
  emoji: string;
  porQueEssencial: string;
  oQueSignifica: string[];
  comoSaber: string[];
}

export interface AtividadePraticaReport {
  periodo: string; // Ex: "Semana 1-2", "Mês 1"
  titulo: string;
  descricao: string;
  duracaoOuFrequencia?: string;
  meta: string;
}

export interface MesDesenvolvimentoReport {
  mesNumero: number;
  tituloMes: string;
  atividades: AtividadePraticaReport[];
}

export interface PadraoConflitoReport {
  numero: number;
  titulo: string;
  descricao: string;
  exemplo: string;
}

export interface OQueParceiroPrecisaSaberReport {
  topico: string;
  explicacao: string;
  fraseParaOParceiro: string;
}

export interface AcaoConcretaReport {
  numero: number;
  titulo: string;
  descricao: string;
}

export interface CompatibilidadeItemReport {
  temperamentoAlvo: Temperamento;
  titulo: string;
  pontosPositivos: string;
  pontosAtencao: string;
  dica: string;
}

export interface ProximosPassosReport {
  duasSemanas: string[];
  quatroSemanas: string[];
}

export interface RecursosApindiceReport {
  livrosRecomendados: Array<{ titulo: string; autor: string }>;
  exerciciosComplementares: string[];
  sinaisProgresso: string[];
}

export interface MentorConfig {
  nome: string;
  titulo: string;
  registro?: string;
  bio?: string;
}

export interface TemperamentoReportData {
  temperamento: Temperamento;
  nome: string;
  emoji: string;
  tagline: string;
  
  // PARTE 1: Quem você é?
  parte1: {
    essencia: {
      titulo: string;
      resumo: string;
      descricao: string;
    };
    comoProcessaMundo: {
      velocidade: { titulo: string; itens: string[] };
      objetivo: { titulo: string; itens: string[] };
      controle: { titulo: string; itens: string[] };
      comunicacao: { titulo: string; itens: string[] };
    };
    pontosFortes: PontoForteReport[];
    desafios: DesafioReport[];
  };

  // PARTE 2: Seu desenvolvimento pessoal
  parte2: {
    virtudes: VirtudeReport[];
    planoDesenvolvimento: MesDesenvolvimentoReport[];
  };

  // PARTE 3: Você no relacionamento
  parte3: {
    formaDeAmar: {
      titulo: string;
      descricao: string;
      ladoLuminoso: string[];
      ladoDificil: string;
    };
    padroesConflito: PadraoConflitoReport[];
    oQueParceiroPrecisaSaber: OQueParceiroPrecisaSaberReport[];
    acoesConcretas: AcaoConcretaReport[];
    compatibilidade: CompatibilidadeItemReport[];
  };

  // PARTE 4: Seus próximos passos
  parte4: {
    proximosPassos: ProximosPassosReport;
    mensagemFinal: string;
    recursos: RecursosApindiceReport;
  };
}
