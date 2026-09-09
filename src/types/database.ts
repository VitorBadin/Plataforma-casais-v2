export type StatusAcesso = 'pendente' | 'ativo' | 'bloqueado';
export type UserRole = 'aluno' | 'admin';
export type TipoPergunta = 'multipla_escolha' | 'escala' | 'texto';

export interface Profile {
  id: string;
  user_id: string;
  nome: string;
  email: string;
  status_acesso: StatusAcesso;
  role: UserRole;
  criado_em: string;
}

export interface OpcaoPergunta {
  id?: string;
  valor: number | string;
  texto: string;
}

export interface Question {
  id: string;
  quiz_id: string;
  texto: string;
  tipo: TipoPergunta;
  opcoes?: OpcaoPergunta[];
  ordem: number;
  criado_em?: string;
}

export interface Quiz {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  ativo: boolean;
  criado_em: string;
  questions?: Question[];
}

export interface Answer {
  id: string;
  user_id: string;
  quiz_id: string;
  question_id: string;
  resposta: {
    valor: number | string;
    texto_opcao?: string;
  };
  respondido_em: string;
}

export interface DiagnosticRule {
  id: string;
  quiz_id: string;
  min_pontos: number;
  max_pontos: number;
  titulo_resultado: string;
  resultado_texto: string;
  condicao?: Record<string, any>;
  criado_em?: string;
}

export interface UserDiagnostic {
  id: string;
  user_id: string;
  quiz_id: string;
  pontuacao_total: number;
  titulo_resultado: string;
  resultado_texto: string;
  gerado_em: string;
  quiz_titulo?: string;
}

export interface ResourceItem {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string; // Ex: 'Ebook', 'Guia Prático', 'Exercício', 'PDF'
  arquivo_url: string;
  criado_em: string;
  tamanho?: string;
  visualizado?: boolean;
}

export interface ResourceView {
  id: string;
  user_id: string;
  resource_id: string;
  visualizado_em: string;
}
