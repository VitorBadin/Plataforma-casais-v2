'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { 
  DESIRE_MAP_META, 
  SECTION_1, 
  SECTION_2, 
  SECTION_3 
} from '@/lib/desireMapData';
import { DesireMapResponse, DesireMapFormValues } from '@/types/desireMapTypes';
import { 
  Heart, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Quote, 
  HelpCircle,
  FileText,
  BookmarkCheck,
  Send
} from 'lucide-react';

const INITIAL_FORM: DesireMapFormValues = {
  exp_01: '',
  exp_02: '',
  exp_03: '',
  exp_04: '',
  exp_05: '',
  exp_06: '',
  exp_07: '',
  exp_08: '',
  exp_09: '',
  exp_10: '',
  q02_significado: '',
  q03_perdido: '',
  q04_autopercepcao: '',
};

export default function MapaDoDesejoPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [hasAnswered, setHasAnswered] = useState(false);
  const [existingResponse, setExistingResponse] = useState<DesireMapResponse | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Estados de navegação do formulário
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formValues, setFormValues] = useState<DesireMapFormValues>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const authUserId = user?.user_id || user?.id || '';
  const profId = user?.id || '';

  // Checa se o usuário já preencheu anteriormente
  useEffect(() => {
    let isMounted = true;
    async function checkExistingSubmission() {
      if (!user) {
        setLoadingInitial(false);
        return;
      }

      const validIds = Array.from(new Set([authUserId, profId])).filter(Boolean);
      const supabase = createClient();

      // 1. Tenta carregar do Supabase
      if (supabase && validIds.length > 0) {
        try {
          const { data, error } = await supabase
            .from('desire_map_responses')
            .select('*')
            .in('user_id', validIds)
            .order('enviado_em', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (data && isMounted) {
            setExistingResponse(data as DesireMapResponse);
            setHasAnswered(true);
            setLoadingInitial(false);
            return;
          }
        } catch (err) {
          console.warn('Erro ao consultar desire_map_responses no Supabase:', err);
        }
      }

      // 2. Fallback localStorage
      const localSaved =
        localStorage.getItem(`psi_desire_map_response_${profId}`) ||
        localStorage.getItem(`psi_desire_map_response_${authUserId}`);

      if (localSaved && isMounted) {
        try {
          const parsed = JSON.parse(localSaved);
          setExistingResponse(parsed);
          setHasAnswered(true);
        } catch {}
      }

      if (isMounted) setLoadingInitial(false);
    }

    checkExistingSubmission();
    return () => {
      isMounted = false;
    };
  }, [user, authUserId, profId]);

  const handleInputChange = (field: keyof DesireMapFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  // Validação por seção
  const validateStep = (step: 1 | 2 | 3): boolean => {
    setErrorMessage(null);

    if (step === 1) {
      const emptyExperiences: number[] = [];
      for (let i = 1; i <= 10; i++) {
        const key = `exp_${String(i).padStart(2, '0')}` as keyof DesireMapFormValues;
        if (!formValues[key]?.trim()) {
          emptyExperiences.push(i);
        }
      }

      if (emptyExperiences.length > 0) {
        if (emptyExperiences.length === 10) {
          setErrorMessage('Por favor, preencha as 10 experiências da Seção 1 antes de avançar.');
        } else {
          setErrorMessage(
            `Atenção: Por favor, preencha a(s) Experiência(s): ${emptyExperiences.map((n) => `#${n}`).join(', ')}.`
          );
        }
        return false;
      }
    }

    if (step === 2) {
      if (!formValues.q02_significado?.trim() && !formValues.q03_perdido?.trim()) {
        setErrorMessage('Por favor, responda à Questão 02 e à Questão 03 da Seção 2.');
        return false;
      }
      if (!formValues.q02_significado?.trim()) {
        setErrorMessage('Por favor, responda à Questão 02 antes de prosseguir.');
        return false;
      }
      if (!formValues.q03_perdido?.trim()) {
        setErrorMessage('Por favor, responda à Questão 03 antes de prosseguir.');
        return false;
      }
    }

    if (step === 3) {
      if (!formValues.q04_autopercepcao?.trim()) {
        setErrorMessage('Por favor, responda à Questão 04 antes de enviar suas respostas.');
        return false;
      }
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1) setCurrentStep(2);
      else if (currentStep === 2) setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    if (currentStep === 3) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const nowIso = new Date().toISOString();
    const payload: DesireMapResponse = {
      user_id: authUserId,
      exp_01: formValues.exp_01.trim(),
      exp_02: formValues.exp_02.trim(),
      exp_03: formValues.exp_03.trim(),
      exp_04: formValues.exp_04.trim(),
      exp_05: formValues.exp_05.trim(),
      exp_06: formValues.exp_06.trim(),
      exp_07: formValues.exp_07.trim(),
      exp_08: formValues.exp_08.trim(),
      exp_09: formValues.exp_09.trim(),
      exp_10: formValues.exp_10.trim(),
      q02_significado: formValues.q02_significado.trim(),
      q03_perdido: formValues.q03_perdido.trim(),
      q04_autopercepcao: formValues.q04_autopercepcao.trim(),
      enviado_em: nowIso,
      criado_em: nowIso,
    };

    // 1. Persiste no Supabase
    const supabase = createClient();
    if (supabase && authUserId) {
      try {
        const { error: insertErr } = await supabase
          .from('desire_map_responses')
          .insert({
            user_id: authUserId,
            exp_01: payload.exp_01,
            exp_02: payload.exp_02,
            exp_03: payload.exp_03,
            exp_04: payload.exp_04,
            exp_05: payload.exp_05,
            exp_06: payload.exp_06,
            exp_07: payload.exp_07,
            exp_08: payload.exp_08,
            exp_09: payload.exp_09,
            exp_10: payload.exp_10,
            q02_significado: payload.q02_significado,
            q03_perdido: payload.q03_perdido,
            q04_autopercepcao: payload.q04_autopercepcao,
            enviado_em: nowIso,
          });

        if (insertErr) {
          console.warn('Erro ao inserir no Supabase desire_map_responses:', insertErr);
        }
      } catch (err) {
        console.warn('Falha na requisição ao Supabase:', err);
      }
    }

    // 2. Persiste no localStorage (para ambos IDs do perfil)
    localStorage.setItem(`psi_desire_map_response_${profId}`, JSON.stringify(payload));
    localStorage.setItem(`psi_desire_map_response_${authUserId}`, JSON.stringify(payload));

    // 3. Adiciona item aos diagnósticos do usuário para aparecer em "Meus diagnósticos"
    const desireDiag = {
      id: `desire-map-${authUserId}`,
      user_id: authUserId,
      quiz_id: 'mapa-do-desejo',
      pontuacao_total: 0,
      titulo_resultado: 'Mapa do Desejo do Casal',
      resultado_texto: 'Exercício individual confidencial de imaginação, significado emocional e intimidade. Suas respostas estão guardadas na Pasta do Casal para o ritual prático da Semana 8.',
      gerado_em: nowIso,
      quiz_titulo: 'Mapa do Desejo do Casal',
    };

    const diagKey1 = `psi_diagnostics_${profId}`;
    const diagKey2 = `psi_diagnostics_${authUserId}`;
    const existingDiags1 = JSON.parse(localStorage.getItem(diagKey1) || '[]');
    const existingDiags2 = JSON.parse(localStorage.getItem(diagKey2) || '[]');

    const updatedDiags1 = [
      desireDiag,
      ...existingDiags1.filter((d: { quiz_id: string }) => d.quiz_id !== 'mapa-do-desejo' && d.quiz_id !== 'quiz-mapa-do-desejo'),
    ];
    const updatedDiags2 = [
      desireDiag,
      ...existingDiags2.filter((d: { quiz_id: string }) => d.quiz_id !== 'mapa-do-desejo' && d.quiz_id !== 'quiz-mapa-do-desejo'),
    ];

    localStorage.setItem(diagKey1, JSON.stringify(updatedDiags1));
    localStorage.setItem(diagKey2, JSON.stringify(updatedDiags2));

    setIsSubmitting(false);
    setSubmittedSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Carregamento inicial
  if (loadingInitial) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-3">
        <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-warm-700 font-medium">Carregando formulário...</p>
      </div>
    );
  }

  // ============================================================
  // CENÁRIO: USUÁRIO JÁ RESPONDEU ANTERIORMENTE
  // ============================================================
  if (hasAnswered && existingResponse) {
    const formattedDate = existingResponse.enviado_em
      ? new Date(existingResponse.enviado_em).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Salvo com sucesso';

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Quizzes
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-card text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-brand-50/70 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto border border-brand-200 shadow-xs">
            <BookmarkCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Exercício Individual Concluído
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-warm-900 font-heading">
              {DESIRE_MAP_META.titulo}
            </h1>
            <p className="text-xs text-warm-700 max-w-md mx-auto">
              Você já preencheu suas respostas em <strong>{formattedDate}</strong>. Por orientação clínica, este formulário não pode ser reeditado e é mantido em sigilo até o ritual da Semana 8.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-rose-soft/70 border border-brand-100 text-left space-y-2">
            <p className="text-xs font-bold text-warm-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              Pasta do Casal (Acesso Confidencial)
            </p>
            <p className="text-xs text-warm-700 leading-relaxed">
              Suas respostas estão arquivadas com segurança na plataforma. Elas só são acessíveis por você e pela <strong>Psicóloga Elaine Souza</strong> para o momento terapêutico oportuno.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/quizzes/mapa-do-desejo/respostas"
              className="w-full sm:w-auto px-6 py-3 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all inline-flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Visualizar Minhas Respostas</span>
            </Link>
            <Link
              href="/historico"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-warm-50 text-warm-800 hover:bg-warm-100 text-xs font-semibold transition-all inline-flex items-center justify-center gap-1.5"
            >
              <span>Ir para Meus Diagnósticos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // CENÁRIO: TELA DE CONFIRMAÇÃO DE ENVIO
  // ============================================================
  if (submittedSuccess) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-card text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              Salvo na Pasta do Casal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-warm-900 font-heading">
              Respostas Salvas com Sucesso!
            </h1>
            <p className="text-xs sm:text-sm text-warm-700 max-w-lg mx-auto leading-relaxed pt-1">
              {DESIRE_MAP_META.confirmacaoEnvio}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-left space-y-1.5 text-xs text-amber-900">
            <p className="font-bold flex items-center gap-1.5 text-amber-800">
              <Lock className="w-3.5 h-3.5" />
              Lembrete Importante de Sigilo:
            </p>
            <p className="leading-relaxed">
              Não compartilhe ou mostre suas anotações para o seu parceiro(a) por enquanto. O ritual guiado na Semana 8 criará o espaço seguro e apropriado para a revelação dessas vontades.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/historico"
              className="w-full sm:w-auto px-6 py-3 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Ir para Meus Diagnósticos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/quizzes/mapa-do-desejo/respostas"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-warm-50 text-warm-800 hover:bg-warm-100 text-xs font-semibold transition-all inline-flex items-center justify-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Ver Minhas Respostas Salvas</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // TELA DE ABERTURA (ANTES DE INICIAR O FORMULÁRIO)
  // ============================================================
  if (!started) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Quizzes
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-card space-y-8 relative overflow-hidden">
          {/* Fundo sutil com gradiente visual do projeto (#e41e94) */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-gradient-to-br from-brand-100/50 via-rose-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Cabeçalho */}
          <div className="space-y-3 relative z-10 border-b border-brand-100/80 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                {DESIRE_MAP_META.categoria}
              </span>
              <span className="text-[11px] font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 inline-flex items-center gap-1">
                <Lock className="w-3 h-3 text-purple-600" />
                Individual & Confidencial
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-warm-900 font-heading tracking-tight">
              {DESIRE_MAP_META.titulo}
            </h1>

            <p className="text-base sm:text-lg font-semibold text-brand-600 font-heading">
              {DESIRE_MAP_META.subtitulo}
            </p>

            <p className="text-xs text-warm-700 pt-1 font-body">
              {DESIRE_MAP_META.autoria} • {DESIRE_MAP_META.crp}
            </p>
          </div>

          {/* Citação em Destaque */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-brand-50/80 via-rose-50/60 to-brand-50/40 border-l-4 border-brand-500 shadow-2xs relative">
            <Quote className="w-8 h-8 text-brand-300 absolute top-3 right-4 opacity-50 pointer-events-none" />
            <p className="text-sm sm:text-base italic text-warm-900 font-medium leading-relaxed font-body">
              {DESIRE_MAP_META.citacao}
            </p>
          </div>

          {/* Orientações Clínicas Importantes */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-warm-900">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <h2 className="text-base sm:text-lg font-bold font-heading">
                Orientações Clínicas Importantes
              </h2>
            </div>

            <ol className="space-y-3 pl-1 font-body text-xs sm:text-sm text-warm-700">
              {DESIRE_MAP_META.orientacoesClinicas.map((orientacao, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{orientacao}</span>
                </li>
              ))}
            </ol>

            <p className="text-xs sm:text-sm text-warm-800 font-medium pt-2 italic leading-relaxed pl-1">
              {DESIRE_MAP_META.fechamentoOrientacoes}
            </p>
          </div>

          {/* Observação da Mentora (Card em Destaque) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-brand-50/90 border border-brand-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-brand-700 font-bold text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4 text-brand-500 fill-brand-200" />
              <span>Observação da Mentora</span>
            </div>
            <p className="text-xs sm:text-sm text-warm-900 font-medium leading-relaxed">
              {DESIRE_MAP_META.observacaoMentora}
            </p>
          </div>

          {/* Aviso Curto de Confidencialidade e Privacidade */}
          <div className="p-3.5 rounded-xl bg-warm-50 border border-warm-200/80 flex items-center gap-2.5 text-xs text-warm-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{DESIRE_MAP_META.avisoPrivacidade}</span>
          </div>

          {/* Ação de Início */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-warm-600">
              Tempo estimado: 15 a 20 minutos de reflexão tranquila.
            </p>

            <button
              onClick={() => {
                setStarted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-xl brand-gradient text-white text-sm font-bold shadow-md hover:opacity-95 transition-all inline-flex items-center justify-center gap-2 self-stretch sm:self-auto cursor-pointer"
            >
              <span>Começar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // TELA DE PERGUNTAS (3 SEÇÕES STEP-BY-STEP MOBILE-FIRST)
  // ============================================================
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Barra de Navegação Superior */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => {
            if (confirm('Deseja retornar à introdução? Seus textos digitados nesta sessão serão mantidos.')) {
              setStarted(false);
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Início</span>
        </button>

        <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-brand-600" />
          Mapa do Desejo • Passo {currentStep} de 3
        </span>
      </div>

      {/* Barra de Progresso Visual */}
      <div className="bg-white p-4 rounded-2xl border border-brand-100 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-warm-800">
          <span className={currentStep === 1 ? 'text-brand-600 font-bold' : ''}>
            1. As 10 Experiências
          </span>
          <span className={currentStep === 2 ? 'text-brand-600 font-bold' : ''}>
            2. Significado Emocional
          </span>
          <span className={currentStep === 3 ? 'text-brand-600 font-bold' : ''}>
            3. Autopercepção
          </span>
        </div>
        <div className="h-2 w-full bg-warm-100 rounded-full overflow-hidden">
          <div
            className="h-full brand-gradient transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Card do Formulário */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-card space-y-8">
        {/* ======================================================== */}
        {/* SEÇÃO 1: 10 EXPERIÊNCIAS */}
        {/* ======================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-warm-100 pb-5 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200 inline-block">
                Seção 1
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
                Questão 01 — O Que Eu Gostaria De Construir Com Você
              </h2>
              <div className="p-4 rounded-2xl bg-rose-soft/70 border border-brand-100 text-xs text-warm-700 leading-relaxed font-body">
                {SECTION_1.supportText}
              </div>
            </div>

            <div className="space-y-4">
              {SECTION_1.experiences.map((exp, idx) => {
                const currentVal = formValues[exp.key] || '';
                const maxChars = SECTION_1.fieldMaxChars;

                return (
                  <div
                    key={exp.key}
                    className="p-4 sm:p-5 rounded-2xl bg-warm-50/60 border border-warm-200/80 hover:border-brand-200 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={exp.key}
                        className="text-xs sm:text-sm font-bold text-warm-900 flex items-center gap-2"
                      >
                        <span className="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        {exp.label}
                        <span className="text-brand-500 font-bold">*</span>
                      </label>
                      <span className="text-[11px] text-warm-400 font-mono">
                        {currentVal.length}/{maxChars}
                      </span>
                    </div>

                    <textarea
                      id={exp.key}
                      rows={2}
                      maxLength={maxChars}
                      placeholder={exp.placeholder}
                      value={currentVal}
                      onChange={(e) => handleInputChange(exp.key, e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-warm-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 text-warm-900 placeholder:text-warm-400 resize-y transition-all"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SEÇÃO 2: SIGNIFICADO EMOCIONAL */}
        {/* ======================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-warm-100 pb-5 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200 inline-block">
                Seção 2
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
                O Significado Emocional Do Meu Desejo
              </h2>
              <div className="p-4 rounded-2xl bg-rose-soft/70 border border-brand-100 text-xs text-warm-700 leading-relaxed font-body">
                {SECTION_2.supportText}
              </div>
            </div>

            {/* Questão 02 */}
            <div className="p-5 rounded-2xl bg-warm-50/60 border border-warm-200/80 space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider">
                    {SECTION_2.questions[0].number}
                  </span>
                  <span className="text-[11px] text-warm-400 font-mono">
                    {formValues.q02_significado.length}/{SECTION_2.questions[0].maxChars}
                  </span>
                </div>
                <label
                  htmlFor="q02_significado"
                  className="block text-sm sm:text-base font-bold text-warm-900 leading-snug"
                >
                  {SECTION_2.questions[0].prompt}
                  <span className="text-brand-500 font-bold ml-1">*</span>
                </label>
                <p className="text-xs text-warm-700 italic">
                  {SECTION_2.questions[0].hint}
                </p>
              </div>

              <textarea
                id="q02_significado"
                rows={6}
                maxLength={SECTION_2.questions[0].maxChars}
                placeholder={SECTION_2.questions[0].placeholder}
                value={formValues.q02_significado}
                onChange={(e) => handleInputChange('q02_significado', e.target.value)}
                className="w-full px-4 py-3 text-xs sm:text-sm bg-white border border-warm-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 text-warm-900 placeholder:text-warm-400 resize-y transition-all"
              />
            </div>

            {/* Questão 03 */}
            <div className="p-5 rounded-2xl bg-warm-50/60 border border-warm-200/80 space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider">
                    {SECTION_2.questions[1].number}
                  </span>
                  <span className="text-[11px] text-warm-400 font-mono">
                    {formValues.q03_perdido.length}/{SECTION_2.questions[1].maxChars}
                  </span>
                </div>
                <label
                  htmlFor="q03_perdido"
                  className="block text-sm sm:text-base font-bold text-warm-900 leading-snug"
                >
                  {SECTION_2.questions[1].prompt}
                  <span className="text-brand-500 font-bold ml-1">*</span>
                </label>
              </div>

              <textarea
                id="q03_perdido"
                rows={6}
                maxLength={SECTION_2.questions[1].maxChars}
                placeholder={SECTION_2.questions[1].placeholder}
                value={formValues.q03_perdido}
                onChange={(e) => handleInputChange('q03_perdido', e.target.value)}
                className="w-full px-4 py-3 text-xs sm:text-sm bg-white border border-warm-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 text-warm-900 placeholder:text-warm-400 resize-y transition-all"
              />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SEÇÃO 3: AUTOPERCEPÇÃO */}
        {/* ======================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-warm-100 pb-5 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200 inline-block">
                Seção 3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
                Autopercepção
              </h2>
              <div className="p-4 rounded-2xl bg-rose-soft/70 border border-brand-100 text-xs text-warm-700 leading-relaxed font-body">
                {SECTION_3.supportText}
              </div>
            </div>

            {/* Questão 04 */}
            <div className="p-5 rounded-2xl bg-warm-50/60 border border-warm-200/80 space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider">
                    {SECTION_3.questions[0].number}
                  </span>
                  <span className="text-[11px] text-warm-400 font-mono">
                    {formValues.q04_autopercepcao.length}/{SECTION_3.questions[0].maxChars}
                  </span>
                </div>
                <label
                  htmlFor="q04_autopercepcao"
                  className="block text-sm sm:text-base font-bold text-warm-900 leading-snug"
                >
                  {SECTION_3.questions[0].prompt}
                  <span className="text-brand-500 font-bold ml-1">*</span>
                </label>
              </div>

              <textarea
                id="q04_autopercepcao"
                rows={6}
                maxLength={SECTION_3.questions[0].maxChars}
                placeholder={SECTION_3.questions[0].placeholder}
                value={formValues.q04_autopercepcao}
                onChange={(e) => handleInputChange('q04_autopercepcao', e.target.value)}
                className="w-full px-4 py-3 text-xs sm:text-sm bg-white border border-warm-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 text-warm-900 placeholder:text-warm-400 resize-y transition-all"
              />
            </div>

            {/* Resumo Final & Alerta de Envio */}
            <div className="p-5 rounded-2xl bg-brand-50/80 border border-brand-200 space-y-2">
              <p className="text-xs font-bold text-brand-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                Confirmação do Sigilo na Pasta do Casal
              </p>
              <p className="text-xs text-warm-800 leading-relaxed">
                Ao clicar em &quot;Enviar minhas respostas&quot;, suas anotações serão arquivadas de forma definitiva para o ritual prático da <strong>Semana 8</strong>. Nesta versão inicial, não será permitido editar as respostas após o envio.
              </p>
            </div>
          </div>
        )}

        {/* Mensagem de Erro de Validação */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Controles de Navegação e Envio */}
        <div className="pt-4 border-t border-warm-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-warm-100 text-warm-800 hover:bg-warm-200 text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Seção Anterior</span>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full sm:w-auto px-7 py-3 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Próxima Seção</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-lg hover:opacity-95 transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Salvando respostas...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar minhas respostas</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
