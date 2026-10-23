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
import { DesireMapResponse } from '@/types/desireMapTypes';
import { 
  ArrowLeft, 
  Lock, 
  ShieldCheck, 
  Calendar, 
  Heart, 
  Sparkles, 
  Printer, 
  FolderLock, 
  Quote,
  FileCheck2
} from 'lucide-react';

export default function MapaDoDesejoRespostasPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [response, setResponse] = useState<DesireMapResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const authUserId = user?.user_id || user?.id || '';
  const profId = user?.id || '';

  useEffect(() => {
    let isMounted = true;
    async function loadResponses() {
      if (!user) {
        setLoading(false);
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
            setResponse(data as DesireMapResponse);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Erro ao carregar desire_map_responses do Supabase:', err);
        }
      }

      // 2. Fallback localStorage
      const localSaved =
        localStorage.getItem(`psi_desire_map_response_${profId}`) ||
        localStorage.getItem(`psi_desire_map_response_${authUserId}`);

      if (localSaved && isMounted) {
        try {
          const parsed = JSON.parse(localSaved);
          setResponse(parsed);
        } catch {}
      }

      if (isMounted) setLoading(false);
    }

    loadResponses();
    return () => {
      isMounted = false;
    };
  }, [user, authUserId, profId]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-3">
        <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-warm-700 font-medium">Carregando suas respostas...</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl p-10 text-center border border-brand-100 shadow-card space-y-4">
          <FolderLock className="w-12 h-12 text-warm-300 mx-auto" />
          <h2 className="text-lg font-bold text-warm-900 font-heading">
            Respostas ainda não preenchidas
          </h2>
          <p className="text-xs text-warm-700 max-w-md mx-auto">
            Você ainda não preencheu o Mapa do Desejo do Casal. Reserve alguns minutos para registrar suas aspirações e imaginação de forma segura.
          </p>
          <div className="pt-2">
            <Link
              href="/quizzes/mapa-do-desejo"
              className="px-6 py-3 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all inline-flex items-center gap-2"
            >
              <span>Preencher Mapa do Desejo</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = response.enviado_em
    ? new Date(response.enviado_em).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Data não informada';

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Barra de Navegação Superior */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/historico"
          className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Meus Diagnósticos</span>
        </Link>

        <button
          onClick={() => window.print()}
          className="px-3.5 py-1.5 rounded-xl bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir Minhas Respostas</span>
        </button>
      </div>

      {/* Cartão Principal do Documento */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-card space-y-8 relative overflow-hidden">
        {/* Glow sutil */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-gradient-to-br from-brand-100/50 via-rose-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Topo / Header do Documento */}
        <div className="border-b border-brand-100/80 pb-6 space-y-3 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                Pasta do Casal (Acesso Individual)
              </span>
              <span className="text-[11px] font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 inline-flex items-center gap-1">
                <Lock className="w-3 h-3 text-purple-600" />
                Confidencial
              </span>
            </div>

            <span className="text-xs text-warm-700 inline-flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-warm-400" />
              Preenchido em: {formattedDate}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-warm-900 font-heading">
            {DESIRE_MAP_META.titulo}
          </h1>

          <p className="text-sm font-semibold text-brand-600 font-heading">
            {DESIRE_MAP_META.subtitulo}
          </p>

          <p className="text-xs text-warm-700 font-body">
            {DESIRE_MAP_META.autoria} • {DESIRE_MAP_META.crp}
          </p>
        </div>

        {/* Box da Mentora — Ritual da Semana 8 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-brand-50/80 border border-brand-200 flex items-start gap-3">
          <Heart className="w-5 h-5 text-brand-600 fill-brand-200 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs leading-relaxed text-warm-900">
            <p className="font-bold text-brand-800 uppercase tracking-wider">
              Orientação Clínica da Dra. Elaine Souza:
            </p>
            <p>
              Suas respostas abaixo estão salvas em modo somente leitura. <strong>Não mostre para o seu parceiro(a) ainda</strong>. O ritual de abertura dessas anotações será guiado na <strong>Semana 8 da mentoria</strong>, em um ambiente seguro e estruturado para o casal.
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SEÇÃO 1: AS 10 EXPERIÊNCIAS */}
        {/* ======================================================== */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200 inline-block">
              Seção 1
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Questão 01 — O Que Eu Gostaria De Construir Com Você
            </h2>
            <p className="text-xs text-warm-700 italic font-body">
              {SECTION_1.supportText}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            {SECTION_1.experiences.map((exp, idx) => {
              const answerText = response[exp.key as keyof DesireMapResponse] as string;

              return (
                <div
                  key={exp.key}
                  className="p-4 rounded-2xl bg-warm-50/70 border border-warm-200/80 space-y-1.5"
                >
                  <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md bg-brand-100 text-brand-700 font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    {exp.label}
                  </span>
                  <p className="text-xs sm:text-sm text-warm-900 font-body whitespace-pre-wrap leading-relaxed pl-6">
                    {answerText || '(Não respondido)'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SEÇÃO 2: SIGNIFICADO EMOCIONAL */}
        {/* ======================================================== */}
        <div className="space-y-4 pt-4 border-t border-warm-100">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200 inline-block">
              Seção 2
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              O Significado Emocional Do Meu Desejo
            </h2>
            <p className="text-xs text-warm-700 italic font-body">
              {SECTION_2.supportText}
            </p>
          </div>

          {/* Questão 02 */}
          <div className="p-5 rounded-2xl bg-warm-50/70 border border-warm-200/80 space-y-2">
            <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider block">
              {SECTION_2.questions[0].number}
            </span>
            <p className="text-xs sm:text-sm font-bold text-warm-900">
              {SECTION_2.questions[0].prompt}
            </p>
            {SECTION_2.questions[0].hint && (
              <p className="text-[11px] text-warm-600 italic">
                {SECTION_2.questions[0].hint}
              </p>
            )}
            <div className="pt-2 border-t border-warm-200/60">
              <p className="text-xs sm:text-sm text-warm-900 font-body whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-xl border border-warm-200/60">
                {response.q02_significado || '(Não respondido)'}
              </p>
            </div>
          </div>

          {/* Questão 03 */}
          <div className="p-5 rounded-2xl bg-warm-50/70 border border-warm-200/80 space-y-2">
            <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider block">
              {SECTION_2.questions[1].number}
            </span>
            <p className="text-xs sm:text-sm font-bold text-warm-900">
              {SECTION_2.questions[1].prompt}
            </p>
            <div className="pt-2 border-t border-warm-200/60">
              <p className="text-xs sm:text-sm text-warm-900 font-body whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-xl border border-warm-200/60">
                {response.q03_perdido || '(Não respondido)'}
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SEÇÃO 3: AUTOPERCEPÇÃO */}
        {/* ======================================================== */}
        <div className="space-y-4 pt-4 border-t border-warm-100">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200 inline-block">
              Seção 3
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Autopercepção
            </h2>
            <p className="text-xs text-warm-700 italic font-body">
              {SECTION_3.supportText}
            </p>
          </div>

          {/* Questão 04 */}
          <div className="p-5 rounded-2xl bg-warm-50/70 border border-warm-200/80 space-y-2">
            <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider block">
              {SECTION_3.questions[0].number}
            </span>
            <p className="text-xs sm:text-sm font-bold text-warm-900">
              {SECTION_3.questions[0].prompt}
            </p>
            <div className="pt-2 border-t border-warm-200/60">
              <p className="text-xs sm:text-sm text-warm-900 font-body whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-xl border border-warm-200/60">
                {response.q04_autopercepcao || '(Não respondido)'}
              </p>
            </div>
          </div>
        </div>

        {/* Assinatura Clínica & Sigilo */}
        <div className="pt-6 border-t border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-rose-soft/40 p-5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm font-heading shrink-0">
              ES
            </div>
            <div>
              <p className="text-xs font-bold text-warm-900">Psi Elaine Souza</p>
              <p className="text-[11px] text-warm-700">Psicóloga Clínica • CRP 06/170248</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Documento confidencial da Pasta do Casal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
