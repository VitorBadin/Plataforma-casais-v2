'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import {
  COUPLE_HEALTH_META,
  COUPLE_HEALTH_PILLARS,
  INITIAL_HEALTH_MAP_FORM_DATA,
} from '@/lib/coupleHealthData';
import { CoupleHealthFormData, CoupleHealthMapResponse, CoupleHealthPillarKey } from '@/types/coupleHealthTypes';
import {
  Heart,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Activity,
  Layers,
} from 'lucide-react';

export default function MapaDaSaudePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [hasStarted, setHasStarted] = useState(false);
  const [formData, setFormData] = useState<CoupleHealthFormData>(INITIAL_HEALTH_MAP_FORM_DATA);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingExisting, setIsLoadingExisting] = useState(true);

  const authUserId = user?.user_id || user?.id;
  const profId = user?.id;

  // 1. Verifica se já respondeu
  useEffect(() => {
    async function checkExisting() {
      if (!authUserId) {
        setIsLoadingExisting(false);
        return;
      }

      // Verifica no localStorage
      const localResp =
        localStorage.getItem(`psi_couple_health_response_${profId}`) ||
        localStorage.getItem(`psi_couple_health_response_${authUserId}`);
      if (localResp) {
        router.replace('/quizzes/mapa-da-saude/resultado');
        return;
      }

      // Verifica no Supabase
      const supabase = createClient();
      if (supabase) {
        try {
          const { data } = await supabase
            .from('couple_health_map_responses')
            .select('id')
            .in('user_id', [authUserId, profId].filter(Boolean))
            .maybeSingle();

          if (data) {
            router.replace('/quizzes/mapa-da-saude/resultado');
            return;
          }
        } catch (err) {
          console.warn('Erro ao verificar resposta prévia:', err);
        }
      }

      setIsLoadingExisting(false);
    }

    checkExisting();
  }, [authUserId, profId, router]);

  // Contagem de pilares avaliados
  const answeredCount = Object.values(formData).filter((v) => v !== null).length;
  const totalCount = COUPLE_HEALTH_PILLARS.length; // 8
  const progressPct = Math.round((answeredCount / totalCount) * 100);

  const handleSelectScore = (key: CoupleHealthPillarKey, score: number) => {
    setFormData((prev) => ({ ...prev, [key]: score }));
    if (validationError) setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de todos os 8 pilares
    for (const pillar of COUPLE_HEALTH_PILLARS) {
      if (formData[pillar.key] === null) {
        setValidationError(`Por favor, selecione uma nota de 1 a 10 para o pilar: "${pillar.title}".`);
        const el = document.getElementById(`pillar-card-${pillar.key}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
    }

    if (!authUserId) {
      setValidationError('Usuário não autenticado. Faça login para enviar o mapa.');
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    const payload: Omit<CoupleHealthMapResponse, 'id' | 'criado_em'> = {
      user_id: authUserId,
      p01_financeira: formData.p01_financeira!,
      p02_rotina: formData.p02_rotina!,
      p03_familiar: formData.p03_familiar!,
      p04_dialogo: formData.p04_dialogo!,
      p05_tempo: formData.p05_tempo!,
      p06_conexao: formData.p06_conexao!,
      p07_quimica: formData.p07_quimica!,
      p08_valores: formData.p08_valores!,
      enviado_em: new Date().toISOString(),
    };

    try {
      // 1. Salva no Supabase
      const supabase = createClient();
      let savedId = `local-${Date.now()}`;

      if (supabase) {
        const { data, error } = await supabase
          .from('couple_health_map_responses')
          .insert(payload)
          .select('id')
          .single();

        if (error) {
          console.warn('Erro ao salvar no Supabase:', error);
        } else if (data) {
          savedId = data.id;
        }
      }

      // 2. Salva localmente para disponibilidade imediata e offline
      const completeResponse: CoupleHealthMapResponse = {
        ...payload,
        id: savedId,
      };

      if (profId) {
        localStorage.setItem(`psi_couple_health_response_${profId}`, JSON.stringify(completeResponse));
      }
      localStorage.setItem(`psi_couple_health_response_${authUserId}`, JSON.stringify(completeResponse));

      // 3. Redireciona para o resultado
      router.push('/quizzes/mapa-da-saude/resultado');
    } catch (err: any) {
      console.error('Erro no envio do Mapa da Saúde:', err);
      setValidationError('Ocorreu um erro ao salvar suas notas. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  if (isLoadingExisting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-9 h-9 border-3 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-sm font-medium text-warm-600">Carregando Mapa da Saúde...</p>
      </div>
    );
  }

  // ==========================================
  // TELA 1: ABERTURA (Antes das notas)
  // ==========================================
  if (!hasStarted) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-warm-500 font-medium">
          <Link href="/quizzes" className="hover:text-brand-600 transition-colors">
            Diagnósticos
          </Link>
          <span>/</span>
          <span className="text-warm-800 font-bold">{COUPLE_HEALTH_META.title}</span>
        </nav>

        {/* Header Acolhedor */}
        <header className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
            <Activity className="w-3.5 h-3.5 text-brand-600" />
            {COUPLE_HEALTH_META.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-warm-900 font-heading tracking-tight">
            {COUPLE_HEALTH_META.title}
          </h1>
          <p className="text-lg font-medium text-brand-600">
            {COUPLE_HEALTH_META.subtitle}
          </p>
          <p className="text-xs text-warm-500 font-medium">
            {COUPLE_HEALTH_META.author}
          </p>
        </header>

        {/* Citação em Destaque */}
        <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-rose-50 via-warm-50 to-white border border-brand-100 shadow-sm">
          <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-brand-600 text-white text-[11px] font-bold tracking-wide uppercase shadow-xs">
            Reflexão Clínica
          </div>
          <blockquote className="italic text-warm-800 text-base sm:text-lg leading-relaxed pt-2 font-medium">
            &ldquo;{COUPLE_HEALTH_META.quote}&rdquo;
          </blockquote>
        </div>

        {/* Orientações Clínicas */}
        <div className="space-y-4 bg-white p-6 sm:p-7 rounded-2xl border border-warm-200 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-warm-900 font-heading">
              {COUPLE_HEALTH_META.instructionsTitle}
            </h2>
          </div>

          <div className="space-y-4 pt-1">
            {COUPLE_HEALTH_META.instructions.map((inst, index) => (
              <div key={index} className="flex gap-3.5 items-start">
                <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-warm-900">{inst.title}</h3>
                  <p className="text-sm text-warm-700 leading-relaxed font-normal">
                    {inst.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Menu de Ações aviso */}
          <div className="p-4 rounded-xl bg-warm-50 border border-warm-200 text-xs sm:text-sm text-warm-700 leading-relaxed">
            <strong className="text-warm-900 font-semibold block mb-0.5">Menu de Ações Práticas:</strong>
            {COUPLE_HEALTH_META.menuAcoesNotice}
          </div>
        </div>

        {/* Card de Privacidade & Consentimento */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Privacidade & Comparação do Casal
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              {COUPLE_HEALTH_META.privacyText}
            </p>
          </div>
        </div>

        {/* Botão Começar */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => {
              setHasStarted(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#e41e94] hover:bg-[#c2187d] text-white font-bold text-base shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            <span>Começar</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // TELA 2: NOTAS (8 Pilares - Escala 1 a 10)
  // ==========================================
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Barra de Progresso Superior */}
      <div className="sticky top-2 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-warm-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-warm-800">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-600 animate-pulse" />
            Progresso da Avaliação
          </span>
          <span className="text-brand-700 font-extrabold">
            {answeredCount} de {totalCount} pilares avaliados ({progressPct}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-warm-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-[#e41e94] transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Introdução e Dica da Escala */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-warm-200 shadow-xs space-y-2">
        <h2 className="text-base sm:text-lg font-bold text-warm-900 font-heading flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-600" />
          Avalie cada pilar com uma nota de 1 a 10
        </h2>
        <p className="text-xs text-warm-600">
          Toque no número correspondente à sua percepção atual do relacionamento.{' '}
          <strong className="text-brand-700 font-semibold">{COUPLE_HEALTH_META.scaleExplanation}</strong>
        </p>
      </div>

      {/* Erro de Validação */}
      {validationError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-brand-200 flex items-start gap-3 animate-in shake duration-200">
          <AlertCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm font-semibold text-brand-800">
            {validationError}
          </div>
        </div>
      )}

      {/* Cards dos 8 Pilares */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {COUPLE_HEALTH_PILLARS.map((pillar) => {
          const currentScore = formData[pillar.key];
          const isSelected = currentScore !== null;

          return (
            <div
              key={pillar.key}
              id={`pillar-card-${pillar.key}`}
              className={`p-5 sm:p-6 rounded-2xl bg-white border transition-all duration-150 shadow-xs ${
                isSelected
                  ? 'border-brand-200 bg-rose-50/20'
                  : 'border-warm-200 hover:border-warm-300'
              }`}
            >
              {/* Cabeçalho do Pilar */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-7 h-7 rounded-lg font-extrabold text-xs flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#e41e94] text-white'
                        : 'bg-warm-100 text-warm-700'
                    }`}
                  >
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-warm-900 font-heading leading-tight">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                {isSelected && (
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                    Nota {currentScore}
                  </span>
                )}
              </div>

              {/* Legendas das Extremidades */}
              <div className="flex items-center justify-between text-[11px] text-warm-500 font-medium mb-2 px-1">
                <span className="text-warm-600 flex items-center gap-1">
                  ← 1: {COUPLE_HEALTH_META.scaleMinLabel}
                </span>
                <span className="text-brand-700 font-semibold flex items-center gap-1">
                  10: {COUPLE_HEALTH_META.scaleMaxLabel} →
                </span>
              </div>

              {/* Linha com 10 Botões Numerados (Mobile-First Touch Target) */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
                {Array.from({ length: 10 }, (_, idx) => {
                  const score = idx + 1;
                  const isCurrent = currentScore === score;

                  return (
                    <button
                      key={score}
                      type="button"
                      onClick={() => handleSelectScore(pillar.key, score)}
                      className={`h-11 sm:h-12 rounded-xl text-sm sm:text-base font-extrabold flex items-center justify-center transition-all active:scale-95 ${
                        isCurrent
                          ? 'bg-[#e41e94] text-white shadow-md shadow-brand-500/20 ring-2 ring-brand-300 scale-[1.03]'
                          : 'bg-warm-50 hover:bg-rose-50/70 text-warm-800 border border-warm-200 hover:border-brand-200'
                      }`}
                      aria-label={`${pillar.title} - Nota ${score}`}
                    >
                      {score}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Rodapé de Envio */}
        <div className="pt-4 space-y-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#e41e94] hover:bg-[#c2187d] text-white font-bold text-base shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Gravando suas notas e gerando mapa...</span>
              </>
            ) : (
              <>
                <span>Enviar minhas notas</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-warm-500">
            {answeredCount === totalCount
              ? 'Todos os 8 pilares foram avaliados. Pronto para enviar!'
              : `Faltam ${totalCount - answeredCount} pilares para preencher.`}
          </p>
        </div>
      </form>
    </div>
  );
}
