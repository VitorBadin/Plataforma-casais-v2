'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { calcularIdiomaAmor } from '@/lib/idiomaAmorEngine';
import {
  IDIOMA_AMOR_PERGUNTAS,
  IDIOMA_AMOR_META,
  OPCAO_PARA_IDIOMA,
  TOTAL_PERGUNTAS_IDIOMA_AMOR,
  INTRODUCAO_IDIOMA_AMOR,
} from '@/lib/idiomaAmorData';
import { IdiomaAmor, OpcaoABCDE } from '@/types/idiomaAmorTypes';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Heart,
  MessageCircle,
  Clock,
  Gift,
  Wrench,
  Smile,
  ShieldCheck,
} from 'lucide-react';

export default function IdiomaAmorQuizPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, OpcaoABCDE>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPergunta = IDIOMA_AMOR_PERGUNTAS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / TOTAL_PERGUNTAS_IDIOMA_AMOR) * 100
  );

  const handleStartQuiz = () => {
    setStarted(true);
    setCurrentIndex(0);
  };

  const handleAnswer = useCallback((questionNumber: number, value: OpcaoABCDE) => {
    setAnswers((prev) => ({ ...prev, [questionNumber]: value }));
  }, []);

  const handleNext = () => {
    if (currentIndex < TOTAL_PERGUNTAS_IDIOMA_AMOR - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);

    const authUserId = user.user_id || user.id;
    const resultado = calcularIdiomaAmor(answers, authUserId);

    // 1. Sincroniza e persiste no Supabase (se conectado)
    const supabase = createClient();
    if (supabase) {
      try {
        const { error: resErr } = await supabase
          .from('quiz_love_language_results')
          .upsert(
            {
              user_id: authUserId,
              palavras_pct: Math.round(resultado.percentuais.palavras || 0),
              tempo_pct: Math.round(resultado.percentuais.tempo || 0),
              presentes_pct: Math.round(resultado.percentuais.presentes || 0),
              servico_pct: Math.round(resultado.percentuais.servico || 0),
              toque_pct: Math.round(resultado.percentuais.toque || 0),
              idioma_primario: resultado.idioma_primario,
              idioma_secundario: resultado.idioma_secundario,
              calculado_em: resultado.calculado_em,
            },
            { onConflict: 'user_id' }
          );

        if (resErr) {
          // Se onConflict der fallback para insert direto
          await supabase.from('quiz_love_language_results').insert({
            user_id: authUserId,
            palavras_pct: Math.round(resultado.percentuais.palavras || 0),
            tempo_pct: Math.round(resultado.percentuais.tempo || 0),
            presentes_pct: Math.round(resultado.percentuais.presentes || 0),
            servico_pct: Math.round(resultado.percentuais.servico || 0),
            toque_pct: Math.round(resultado.percentuais.toque || 0),
            idioma_primario: resultado.idioma_primario,
            idioma_secundario: resultado.idioma_secundario,
            calculado_em: resultado.calculado_em,
          });
        }

        // Salva respostas detalhadas
        const answersPayload = Object.entries(answers).map(([qNum, letra]) => ({
          user_id: authUserId,
          question_number: parseInt(qNum, 10),
          opcao_escolhida: letra,
          idioma_atribuido: OPCAO_PARA_IDIOMA[letra] || 'tempo',
        }));

        await supabase.from('quiz_love_language_answers').delete().eq('user_id', authUserId);
        await supabase.from('quiz_love_language_answers').insert(answersPayload);
      } catch (err) {
        console.warn('Persistindo localmente (fallback):', err);
      }
    }

    // 2. Persiste resultado no localStorage (para ambos IDs: id e user_id)
    localStorage.setItem(`psi_idioma_amor_result_${user.id}`, JSON.stringify(resultado));
    localStorage.setItem(`psi_idioma_amor_result_${authUserId}`, JSON.stringify(resultado));

    // Persiste respostas individuais
    localStorage.setItem(`psi_idioma_amor_answers_${user.id}`, JSON.stringify(answers));
    localStorage.setItem(`psi_idioma_amor_answers_${authUserId}`, JSON.stringify(answers));

    // Sincroniza com diagnósticos para visualização unificada no histórico
    const primarioMeta = IDIOMA_AMOR_META[resultado.idioma_primario];
    const secundarioMeta = IDIOMA_AMOR_META[resultado.idioma_secundario];

    const idiomaDiag = {
      id: resultado.id,
      user_id: authUserId,
      quiz_id: 'quiz-idioma-amor',
      pontuacao_total: resultado.percentuais[resultado.idioma_primario],
      titulo_resultado: `${primarioMeta.label} (${resultado.percentuais[resultado.idioma_primario]}%)`,
      resultado_texto: `Idioma Primário: ${primarioMeta.label} (${resultado.percentuais[resultado.idioma_primario]}%)\nIdioma Secundário: ${secundarioMeta.label} (${resultado.percentuais[resultado.idioma_secundario]}%)\n\nDistribuição Completa:\n${resultado.distribuicao_ordenada
        .map((d) => `• ${d.label}: ${d.percentual}%`)
        .join('\n')}`,
      gerado_em: resultado.calculado_em,
      quiz_titulo: 'Seu Idioma do Amor',
    };

    const diagKey1 = `psi_diagnostics_${user.id}`;
    const diagKey2 = `psi_diagnostics_${authUserId}`;
    const existingDiags = JSON.parse(localStorage.getItem(diagKey1) || localStorage.getItem(diagKey2) || '[]');
    
    const updatedDiags = [
      idiomaDiag,
      ...existingDiags.filter(
        (d: { quiz_id: string }) => d.quiz_id !== 'quiz-idioma-amor'
      ),
    ];
    localStorage.setItem(diagKey1, JSON.stringify(updatedDiags));
    localStorage.setItem(diagKey2, JSON.stringify(updatedDiags));

    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/quizzes/idioma-do-amor/resultado');
    }, 800);
  };

  const isCurrentAnswered = answers[currentPergunta?.number] !== undefined;

  // ============================================================
  // TELA DE BOAS-VINDAS / INTRODUÇÃO
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
          {/* Decorative blur elements */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-56 h-56 bg-gradient-to-br from-pink-100 via-purple-50 to-amber-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-40 h-40 bg-gradient-to-tr from-emerald-50 via-rose-50 to-indigo-50 rounded-full blur-2xl opacity-60 pointer-events-none" />

          <div className="relative space-y-6">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-200 px-3 py-1.5 rounded-full">
                <Heart className="w-4 h-4 text-pink-600 fill-pink-500" />
                <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">
                  Linguagens do Relacionamento
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-warm-900 font-heading">
                Seu Idioma do Amor
              </h1>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-brand-200/80 text-warm-800 text-xs sm:text-sm leading-relaxed text-left sm:text-center italic">
                &ldquo;{INTRODUCAO_IDIOMA_AMOR}&rdquo;
              </div>
            </div>

            {/* Os 5 Idiomas do Amor */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-warm-700">
                Os 5 Idiomas Mapeados no Quiz:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(['palavras', 'tempo', 'presentes', 'servico', 'toque'] as const).map((key) => {
                  const meta = IDIOMA_AMOR_META[key];
                  return (
                    <div
                      key={key}
                      className={`p-3 rounded-2xl ${meta.bgLight} border ${meta.borderColor} transition-all hover:scale-[1.01] flex items-start gap-3`}
                    >
                      <span className="text-2xl shrink-0 mt-0.5">{meta.emoji}</span>
                      <div>
                        <span className={`text-xs font-bold ${meta.textColor} block`}>
                          {meta.label}
                        </span>
                        <p className="text-[11px] text-warm-700 leading-tight mt-0.5">
                          {meta.descricaoCurta}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Info Cards */}
            <div className="p-4 rounded-2xl bg-rose-soft/60 border border-brand-100 flex items-center justify-between text-xs text-warm-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-600" />
                <span>20 Cenários Práticos</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Sem respostas certas ou erradas</span>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-2">
              <button
                onClick={handleStartQuiz}
                className="px-8 py-3.5 rounded-2xl brand-gradient text-white text-sm font-bold shadow-md hover:opacity-95 transition-all inline-flex items-center gap-2.5 hover:shadow-soft-hover cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>Iniciar Quiz dos Idiomas do Amor</span>
              </button>
              <p className="text-[11px] text-warm-700 mt-3">
                Tempo estimado: 4 a 6 minutos
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // QUIZ RUNNER — Pergunta a Pergunta
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
              <span className="text-pink-600 font-bold flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-pink-500" />
                Seu Idioma do Amor
              </span>
              <span className="text-warm-700">•</span>
              <span className="text-warm-700 font-medium">
                Cenário {currentPergunta.number}
              </span>
            </div>
            <span className="font-bold text-warm-800">
              {currentIndex + 1} de {TOTAL_PERGUNTAS_IDIOMA_AMOR} ({progressPercent}%)
            </span>
          </div>

          <div className="w-full bg-rose-soft rounded-full h-2.5 overflow-hidden border border-brand-100">
            <div
              className="bg-gradient-to-r from-pink-500 via-brand-500 to-purple-600 h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Cartão do Cenário Atual */}
      <div
        key={currentPergunta.number}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-soft space-y-6 animate-slide-in"
      >
        {/* Título do Cenário */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full inline-block">
            Cenário {currentPergunta.number}: {currentPergunta.tituloCenario}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading leading-snug pt-2">
            &ldquo;{currentPergunta.cenario}&rdquo;
          </h2>
        </div>

        {/* 5 Opções A a E */}
        <div className="space-y-3">
          {currentPergunta.opcoes.map((op) => {
            const selected = answers[currentPergunta.number] === op.letra;
            const meta = IDIOMA_AMOR_META[op.idioma];

            return (
              <button
                key={op.letra}
                onClick={() => handleAnswer(currentPergunta.number, op.letra)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all text-xs sm:text-sm font-medium flex items-start gap-3 group cursor-pointer ${
                  selected
                    ? `${meta.borderColor} ${meta.bgLight} ${meta.textColor} font-bold shadow-xs scale-[1.01]`
                    : 'border-warm-200 bg-white text-warm-800 hover:border-pink-300 hover:bg-rose-50/40'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-all ${
                    selected
                      ? `${meta.textColor} border-current bg-white shadow-xs`
                      : 'border-warm-300 text-warm-600 group-hover:border-pink-400 group-hover:text-pink-600'
                  }`}
                >
                  {op.letra}
                </div>

                <div className="flex-1 space-y-0.5">
                  <span className="leading-relaxed block">{op.texto}</span>
                </div>

                {selected && (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-current mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Botões de Navegação */}
        <div className="pt-4 border-t border-warm-100 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-warm-400'
                : 'text-warm-700 hover:bg-warm-100 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentAnswered || isSubmitting}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
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
                Calculando Idiomas do Amor...
              </span>
            ) : currentIndex === TOTAL_PERGUNTAS_IDIOMA_AMOR - 1 ? (
              <>
                <span>Finalizar e Ver Resultado</span>
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Próximo Cenário</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
