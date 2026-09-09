'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getStoredQuizzes, INITIAL_DIAGNOSTIC_RULES, INITIAL_DIAGNOSTICS } from '@/lib/mockData';
import { Quiz, Question, UserDiagnostic } from '@/types/database';
import { calculateQuizDiagnostic } from '@/lib/diagnosticEngine';
import { ArrowLeft, ArrowRight, CheckCircle2, HeartHandshake, Sparkles } from 'lucide-react';

export default function QuizRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Guard: quiz de temperamento tem rota dedicada
    if (quizId === 'quiz-temperamento') {
      router.replace('/quizzes/temperamento');
      return;
    }

    const loadedQuizzes = getStoredQuizzes();
    const found = loadedQuizzes.find((q) => q.id === quizId);
    if (found) {
      setQuiz(found);
    }
  }, [quizId, router]);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-warm-700">Carregando quiz...</p>
        <Link href="/quizzes" className="text-brand-600 font-bold hover:underline">
          Voltar para a lista
        </Link>
      </div>
    );
  }

  const currentQuestion: Question = quiz.questions[currentStep];
  const totalQuestions = quiz.questions.length;
  const progressPercent = Math.round(((currentStep + 1) / totalQuestions) * 100);

  const handleSelectOption = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);

    // Calcula o diagnóstico baseado nas respostas acumuladas
    const newDiagnostic = calculateQuizDiagnostic(
      quiz,
      INITIAL_DIAGNOSTIC_RULES,
      answers,
      user.id
    );

    // Persiste o resultado no histórico do usuário
    const storageKey = `psi_diagnostics_${user.id}`;
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updated = [newDiagnostic, ...existing.filter((d: UserDiagnostic) => d.quiz_id !== quiz.id)];
    localStorage.setItem(storageKey, JSON.stringify(updated));

    /*
      [EXPANSÃO FUTURA - SUPABASE SYNC]
      Aqui as respostas serão salvas na tabela `answers` e o diagnóstico gerado será salvo na tabela `user_diagnostics` via Supabase RLS.
    */

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/diagnosticos/${newDiagnostic.id}`);
    }, 600);
  };

  const isCurrentAnswered = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== '';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header & Progresso */}
      <div>
        <Link href="/quizzes" className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold mb-3">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Quizzes
        </Link>

        <div className="bg-white p-5 rounded-3xl border border-brand-100 shadow-card">
          <div className="flex items-center justify-between text-xs font-semibold text-warm-900 mb-2">
            <span className="text-brand-700 font-bold">{quiz.categoria}</span>
            <span>Pergunta {currentStep + 1} de {totalQuestions}</span>
          </div>

          <div className="w-full bg-rose-soft rounded-full h-2 overflow-hidden border border-brand-100">
            <div
              className="brand-gradient h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Pergunta Atual */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-soft space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading leading-snug">
          {currentQuestion.texto}
        </h2>

        {/* Renderização pelo Tipo da Pergunta */}
        {currentQuestion.tipo === 'escala' && (
          <div className="space-y-2.5">
            {currentQuestion.opcoes?.map((op) => {
              const selected = answers[currentQuestion.id] === op.valor;
              return (
                <button
                  key={String(op.valor)}
                  onClick={() => handleSelectOption(currentQuestion.id, op.valor)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs font-medium flex items-center justify-between ${
                    selected
                      ? 'border-brand-500 bg-brand-50/80 text-brand-900 font-bold shadow-xs'
                      : 'border-warm-200 bg-rose-soft/40 text-warm-800 hover:border-brand-300 hover:bg-rose-soft'
                  }`}
                >
                  <span>{op.texto}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selected ? 'border-brand-600 bg-brand-600 text-white' : 'border-warm-300'
                  }`}>
                    {selected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {currentQuestion.tipo === 'multipla_escolha' && (
          <div className="space-y-2.5">
            {currentQuestion.opcoes?.map((op) => {
              const selected = answers[currentQuestion.id] === op.valor;
              return (
                <button
                  key={String(op.valor)}
                  onClick={() => handleSelectOption(currentQuestion.id, op.valor)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs font-medium flex items-center justify-between ${
                    selected
                      ? 'border-brand-500 bg-brand-50/80 text-brand-900 font-bold shadow-xs'
                      : 'border-warm-200 bg-rose-soft/40 text-warm-800 hover:border-brand-300 hover:bg-rose-soft'
                  }`}
                >
                  <span>{op.texto}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selected ? 'border-brand-600 bg-brand-600 text-white' : 'border-warm-300'
                  }`}>
                    {selected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {currentQuestion.tipo === 'texto' && (
          <div>
            <textarea
              rows={4}
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleSelectOption(currentQuestion.id, e.target.value)}
              placeholder="Escreva sua reflexão com tranquilidade..."
              className="w-full p-4 rounded-2xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-warm-700/60"
            />
          </div>
        )}

        {/* Botões de Navegação */}
        <div className="pt-4 border-t border-warm-100 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed text-warm-400'
                : 'text-warm-700 hover:bg-warm-100'
            }`}
          >
            Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentAnswered || isSubmitting}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              !isCurrentAnswered
                ? 'bg-warm-200 text-warm-400 cursor-not-allowed'
                : 'brand-gradient text-white shadow-md hover:opacity-95'
            }`}
          >
            {isSubmitting ? (
              <span>Gerando Diagnóstico...</span>
            ) : currentStep === totalQuestions - 1 ? (
              <>
                <span>Finalizar e Ver Resultado</span>
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Próxima Pergunta</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
