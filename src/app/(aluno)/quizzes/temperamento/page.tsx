'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { calcularTemperamento } from '@/lib/temperamentoEngine';
import {
  TEMPERAMENTO_PERGUNTAS,
  BLOCOS_INFO,
  TOTAL_PERGUNTAS,
  ESCALA_BLOCO2_OPCOES,
  TEMPERAMENTO_META,
} from '@/lib/temperamentoData';
import { TemperamentoPergunta, OpcaoABCD, EscalaBloco2 } from '@/types/temperamentoTypes';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Brain,
  Zap,
  Target,
  Heart,
} from 'lucide-react';

// ========================================================
// QUIZ RUNNER — TESTE DE TEMPERAMENTO
// 23 perguntas em 3 blocos com UX premium
// ========================================================

export default function TemperamentoQuizPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const currentPergunta = TEMPERAMENTO_PERGUNTAS[currentIndex];
  const currentBloco = BLOCOS_INFO.find((b) => b.id === currentPergunta?.bloco);
  const progressPercent = Math.round(((currentIndex + 1) / TOTAL_PERGUNTAS) * 100);

  // Track which block we're transitioning into
  const [showBlocoIntro, setShowBlocoIntro] = useState(false);
  const [prevBloco, setPrevBloco] = useState<number | null>(null);

  useEffect(() => {
    if (!started) return;
    const blocoAtual = currentPergunta?.bloco;
    if (blocoAtual && blocoAtual !== prevBloco) {
      setShowBlocoIntro(true);
      setPrevBloco(blocoAtual);
      const timer = setTimeout(() => setShowBlocoIntro(false), 2200);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, started, currentPergunta, prevBloco]);

  const handleAnswer = useCallback((questionNumber: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionNumber]: value }));
  }, []);

  const handleNext = () => {
    if (currentIndex < TOTAL_PERGUNTAS - 1) {
      setDirection('next');
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);

    const resultado = calcularTemperamento(answers, user.id);

    // Persiste resultado no localStorage
    const storageKey = `psi_temperamento_result_${user.id}`;
    localStorage.setItem(storageKey, JSON.stringify(resultado));

    // Persiste respostas individuais
    const answersKey = `psi_temperamento_answers_${user.id}`;
    localStorage.setItem(answersKey, JSON.stringify(answers));

    // Marca como respondido no sistema de diagnósticos para compatibilidade
    const diagKey = `psi_diagnostics_${user.id}`;
    const existingDiags = JSON.parse(localStorage.getItem(diagKey) || '[]');
    const tempDiag = {
      id: resultado.id,
      user_id: user.id,
      quiz_id: 'quiz-temperamento',
      pontuacao_total: Math.max(
        resultado.pontuacoes.colerico,
        resultado.pontuacoes.sanguineo,
        resultado.pontuacoes.melancolico,
        resultado.pontuacoes.fleumatico
      ),
      titulo_resultado: resultado.frase_resumo,
      resultado_texto: `Temperamento Primário: ${TEMPERAMENTO_META[resultado.temperamento_primario].label} (${resultado.pontuacoes[resultado.temperamento_primario]} pts) — ${resultado.intensidade_primario}\nTemperamento Secundário: ${TEMPERAMENTO_META[resultado.temperamento_secundario].label} (${resultado.pontuacoes[resultado.temperamento_secundario]} pts) — ${resultado.intensidade_secundario}`,
      gerado_em: resultado.calculado_em,
      quiz_titulo: 'Teste de Temperamento',
    };

    const updatedDiags = [
      tempDiag,
      ...existingDiags.filter((d: { quiz_id: string }) => d.quiz_id !== 'quiz-temperamento'),
    ];
    localStorage.setItem(diagKey, JSON.stringify(updatedDiags));

    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/quizzes/temperamento/resultado');
    }, 800);
  };

  const isCurrentAnswered = answers[currentPergunta?.number] !== undefined;

  // ============================================================
  // TELA DE BOAS-VINDAS (antes de iniciar o quiz)
  // ============================================================
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Quizzes
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-100 shadow-soft relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-56 h-56 bg-gradient-to-br from-red-100 via-amber-50 to-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-40 h-40 bg-gradient-to-tr from-emerald-50 via-brand-50 to-purple-50 rounded-full blur-2xl opacity-50 pointer-events-none" />

          <div className="relative space-y-6">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-full">
                <Brain className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                  Autoconhecimento
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-warm-900 font-heading">
                Teste de Temperamento
              </h1>

              <p className="text-sm text-warm-700 max-w-md mx-auto leading-relaxed">
                Descubra seu temperamento predominante e entenda como ele influencia
                suas reações, decisões e relacionamentos.
              </p>
            </div>

            {/* Temperamento preview cards */}
            <div className="grid grid-cols-2 gap-3">
              {(['colerico', 'sanguineo', 'melancolico', 'fleumatico'] as const).map((t) => {
                const meta = TEMPERAMENTO_META[t];
                return (
                  <div
                    key={t}
                    className={`p-3 rounded-2xl ${meta.bgLight} border ${meta.borderColor} transition-all hover:scale-[1.02]`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{meta.emoji}</span>
                      <span className={`text-xs font-bold ${meta.textColor}`}>{meta.label}</span>
                    </div>
                    <p className="text-[11px] text-warm-700 leading-relaxed line-clamp-2">
                      {meta.descricaoCurta}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Blocos info */}
            <div className="space-y-2.5">
              <h3 className="text-sm font-bold text-warm-900 font-heading">Como funciona:</h3>
              {BLOCOS_INFO.map((bloco) => (
                <div
                  key={bloco.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-rose-soft/60 border border-brand-100"
                >
                  <span className="text-lg shrink-0 mt-0.5">{bloco.emoji}</span>
                  <div>
                    <span className="text-xs font-bold text-warm-900">
                      Bloco {bloco.id}: {bloco.titulo}
                    </span>
                    <p className="text-[11px] text-warm-700 mt-0.5">
                      {bloco.perguntas.length} pergunta{bloco.perguntas.length > 1 ? 's' : ''} — {bloco.instrucao}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center pt-2">
              <button
                onClick={() => setStarted(true)}
                className="px-8 py-3.5 rounded-2xl brand-gradient text-white text-sm font-bold shadow-md hover:opacity-95 transition-all inline-flex items-center gap-2.5 hover:shadow-soft-hover"
              >
                <Sparkles className="w-5 h-5" />
                Iniciar Teste de Temperamento
              </button>
              <p className="text-[11px] text-warm-700 mt-3">
                Tempo estimado: 5 a 8 minutos • {TOTAL_PERGUNTAS} perguntas
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // TELA DE TRANSIÇÃO DE BLOCO
  // ============================================================
  if (showBlocoIntro && currentBloco) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-10 border border-brand-100 shadow-soft text-center space-y-4 animate-fade-in">
          <span className="text-5xl block">{currentBloco.emoji}</span>
          <h2 className="text-xl font-bold text-warm-900 font-heading">
            Bloco {currentBloco.id}: {currentBloco.titulo}
          </h2>
          <p className="text-sm text-warm-700 max-w-sm mx-auto">
            {currentBloco.instrucao}
          </p>
          <div className="text-xs text-warm-700 pt-2">
            {currentBloco.perguntas.length} pergunta{currentBloco.perguntas.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // QUIZ RUNNER — Pergunta a pergunta
  // ============================================================
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header & Progresso */}
      <div>
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Quizzes
        </Link>

        <div className="bg-white p-5 rounded-3xl border border-brand-100 shadow-card">
          <div className="flex items-center justify-between text-xs font-semibold text-warm-900 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-brand-700 font-bold">Temperamento</span>
              <span className="text-warm-700">•</span>
              <span className="inline-flex items-center gap-1 text-warm-700">
                {currentBloco?.emoji} Bloco {currentPergunta.bloco}
              </span>
            </div>
            <span>
              Pergunta {currentIndex + 1} de {TOTAL_PERGUNTAS}
            </span>
          </div>

          <div className="w-full bg-rose-soft rounded-full h-2.5 overflow-hidden border border-brand-100">
            <div
              className="brand-gradient h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Block indicators */}
          <div className="flex items-center gap-1.5 mt-2.5">
            {BLOCOS_INFO.map((b) => {
              const isActive = currentPergunta.bloco === b.id;
              const isDone = currentPergunta.bloco > b.id;
              return (
                <div
                  key={b.id}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 border border-brand-200'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-warm-50 text-warm-700 border border-warm-200'
                  }`}
                >
                  <span>{b.emoji}</span>
                  <span className="hidden sm:inline">{b.titulo}</span>
                  {isDone && <CheckCircle2 className="w-3 h-3" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pergunta Atual */}
      <div
        key={currentPergunta.number}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-soft space-y-6 animate-slide-in"
      >
        {/* Instruction reminder */}
        {currentBloco && (
          <div className="text-[11px] text-warm-700 bg-rose-soft/60 border border-brand-100 px-3 py-2 rounded-xl italic">
            💡 {currentBloco.instrucao}
          </div>
        )}

        <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading leading-snug">
          <span className="text-brand-500 mr-1.5">{currentPergunta.number}.</span>
          {currentPergunta.texto}
        </h2>

        {/* ---- BLOCO 1 / BLOCO 3: Opções A/B/C/D ---- */}
        {(currentPergunta.bloco === 1 || currentPergunta.bloco === 3) &&
          currentPergunta.opcoes && (
            <div className="space-y-2.5">
              {currentPergunta.opcoes.map((op) => {
                const selected = answers[currentPergunta.number] === op.letra;
                const meta = TEMPERAMENTO_META[
                  op.letra === 'A' ? 'colerico' : op.letra === 'B' ? 'sanguineo' : op.letra === 'C' ? 'melancolico' : 'fleumatico'
                ];
                return (
                  <button
                    key={op.letra}
                    onClick={() => handleAnswer(currentPergunta.number, op.letra)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all text-xs font-medium flex items-center gap-3 group ${
                      selected
                        ? `${meta.borderColor} ${meta.bgLight} ${meta.textColor} font-bold shadow-xs`
                        : 'border-warm-200 bg-rose-soft/40 text-warm-800 hover:border-brand-300 hover:bg-rose-soft'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                        selected
                          ? `border-current bg-current`
                          : 'border-warm-300 group-hover:border-brand-400'
                      }`}
                    >
                      <span className={selected ? 'text-white' : ''}>{op.letra}</span>
                    </div>
                    <span className="flex-1">{op.texto}</span>
                    {selected && (
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

        {/* ---- BLOCO 2: Escala de 3 pontos ---- */}
        {currentPergunta.bloco === 2 && (
          <div className="space-y-2.5">
            {ESCALA_BLOCO2_OPCOES.map((op) => {
              const selected = answers[currentPergunta.number] === op.key;
              const colorMap = {
                MUITO: { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-800', activeBg: 'bg-emerald-100' },
                MAIS_OU_MENOS: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800', activeBg: 'bg-amber-100' },
                NAO: { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-800', activeBg: 'bg-rose-100' },
              };
              const colors = colorMap[op.key];
              return (
                <button
                  key={op.key}
                  onClick={() => handleAnswer(currentPergunta.number, op.key)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all text-sm font-medium flex items-center justify-between ${
                    selected
                      ? `${colors.border} ${colors.activeBg} ${colors.text} font-bold shadow-xs`
                      : 'border-warm-200 bg-rose-soft/40 text-warm-800 hover:border-warm-300 hover:bg-rose-soft'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selected
                          ? `${colors.border} ${colors.bg}`
                          : 'border-warm-300'
                      }`}
                    >
                      {selected && (
                        <div className={`w-3 h-3 rounded-full ${colors.border.replace('border-', 'bg-')}`} />
                      )}
                    </div>
                    <span>{op.label}</span>
                  </div>
                  {selected && <CheckCircle2 className={`w-5 h-5 ${colors.text}`} />}
                </button>
              );
            })}
          </div>
        )}

        {/* Botões de Navegação */}
        <div className="pt-4 border-t border-warm-100 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-warm-400'
                : 'text-warm-700 hover:bg-warm-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentAnswered || isSubmitting}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              !isCurrentAnswered
                ? 'bg-warm-200 text-warm-400 cursor-not-allowed'
                : 'brand-gradient text-white shadow-md hover:opacity-95 hover:shadow-soft-hover'
            }`}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Calculando Temperamento...
              </span>
            ) : currentIndex === TOTAL_PERGUNTAS - 1 ? (
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
