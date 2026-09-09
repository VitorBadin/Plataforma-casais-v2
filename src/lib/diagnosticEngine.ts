import { Quiz, DiagnosticRule, UserDiagnostic } from '@/types/database';

export function calculateQuizDiagnostic(
  quiz: Quiz,
  rules: DiagnosticRule[],
  userAnswers: Record<string, any>,
  userId: string
): UserDiagnostic {
  let score = 0;

  // Percorre as respostas do usuário e soma os valores numéricos
  quiz.questions?.forEach((q) => {
    const answer = userAnswers[q.id];
    if (answer !== undefined && answer !== null) {
      if (typeof answer === 'number') {
        score += answer;
      } else if (typeof answer === 'object' && answer.valor !== undefined) {
        const val = Number(answer.valor);
        if (!isNaN(val)) score += val;
      } else if (!isNaN(Number(answer))) {
        score += Number(answer);
      }
    }
  });

  // Filtra as regras cadastradas para este quiz
  const quizRules = rules.filter((r) => r.quiz_id === quiz.id);

  // Encontra a regra que melhor se ajusta à faixa de pontuação
  let matchedRule = quizRules.find(
    (r) => score >= r.min_pontos && score <= r.max_pontos
  );

  // Fallback se nenhuma regra bater exatamente
  if (!matchedRule && quizRules.length > 0) {
    matchedRule = quizRules[0];
  }

  const defaultTitle = 'Análise do Diagnóstico Concluída';
  const defaultText = `Obrigado por responder ao quiz "${quiz.titulo}". Suas respostas foram registradas e serão acompanhadas pela equipe da Psi Elaine Souza durante as sessões de mentoria.`;

  return {
    id: `diag-${Date.now()}`,
    user_id: userId,
    quiz_id: quiz.id,
    pontuacao_total: score,
    titulo_resultado: matchedRule?.titulo_resultado || defaultTitle,
    resultado_texto: matchedRule?.resultado_texto || defaultText,
    gerado_em: new Date().toISOString(),
    quiz_titulo: quiz.titulo,
  };
}
