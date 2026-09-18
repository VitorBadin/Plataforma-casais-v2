'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { INITIAL_DIAGNOSTICS } from '@/lib/mockData';
import { UserDiagnostic, PartnerGuidance } from '@/types/database';
import { TemperamentoResult } from '@/types/temperamentoTypes';
import { IdiomaAmorResult } from '@/types/idiomaAmorTypes';
import { TEMPERAMENTO_META } from '@/lib/temperamentoData';
import { IDIOMA_AMOR_META } from '@/lib/idiomaAmorData';
import {
  HeartHandshake,
  Users,
  Sparkles,
  CheckCircle2,
  Info,
  Lightbulb,
  Heart,
  Brain,
} from 'lucide-react';

interface SpouseQuizSummaryCardProps {
  quizId: string;
  className?: string;
}

interface SpouseQuizData {
  hasAnswered: boolean;
  titulo?: string;
  resumo?: string;
  chave?: string;
  temperamentoResult?: TemperamentoResult | null;
  idiomaResult?: IdiomaAmorResult | null;
  diagnostic?: UserDiagnostic | null;
}

export default function SpouseQuizSummaryCard({ quizId, className = '' }: SpouseQuizSummaryCardProps) {
  const { user, getSpouse, partnerGuidanceList } = useAuth();
  const [spouseData, setSpouseData] = useState<SpouseQuizData | null>(null);
  const [guidance, setGuidance] = useState<PartnerGuidance | null>(null);

  const spouse = user ? getSpouse(user.id) || getSpouse(user.user_id) : null;

  useEffect(() => {
    if (!spouse) {
      setSpouseData(null);
      return;
    }

    const spouseId = spouse.id;
    const spouseUserId = spouse.user_id;

    // 1. Caso seja Quiz de Temperamento
    if (quizId === 'quiz-temperamento') {
      const storedTemp =
        localStorage.getItem(`psi_temperamento_result_${spouseId}`) ||
        localStorage.getItem(`psi_temperamento_result_${spouseUserId}`);

      if (storedTemp) {
        try {
          const parsed: TemperamentoResult = JSON.parse(storedTemp);
          setSpouseData({
            hasAnswered: true,
            chave: parsed.temperamento_primario,
            titulo: `Temperamento Predominante: ${TEMPERAMENTO_META[parsed.temperamento_primario]?.label || parsed.temperamento_primario}`,
            resumo: `Secundário: ${TEMPERAMENTO_META[parsed.temperamento_secundario]?.label || parsed.temperamento_secundario} (${parsed.intensidade_primario || 'Equilibrado'})`,
            temperamentoResult: parsed,
          });
          return;
        } catch {}
      }

      // Procura nos diagnósticos mockados / do storage do cônjuge
      const storedDiags = JSON.parse(
        localStorage.getItem(`psi_diagnostics_${spouseId}`) ||
        localStorage.getItem(`psi_diagnostics_${spouseUserId}`) ||
        '[]'
      );
      const allDiags = [...storedDiags, ...INITIAL_DIAGNOSTICS];
      const foundDiag = allDiags.find(
        (d: UserDiagnostic) =>
          (d.user_id === spouseId || d.user_id === spouseUserId) &&
          (d.quiz_id === 'quiz-temperamento' || d.titulo_resultado?.toLowerCase().includes('temperamento'))
      );

      if (foundDiag) {
        setSpouseData({
          hasAnswered: true,
          chave: 'sanguineo',
          titulo: foundDiag.titulo_resultado,
          resumo: foundDiag.resultado_texto,
          diagnostic: foundDiag,
        });
        return;
      }

      setSpouseData({ hasAnswered: false });
      return;
    }

    // 2. Caso seja Quiz do Idioma do Amor
    if (quizId === 'quiz-idioma-amor') {
      const storedIdioma =
        localStorage.getItem(`psi_idioma_amor_result_${spouseId}`) ||
        localStorage.getItem(`psi_idioma_amor_result_${spouseUserId}`);

      if (storedIdioma) {
        try {
          const parsed: IdiomaAmorResult = JSON.parse(storedIdioma);
          setSpouseData({
            hasAnswered: true,
            chave: parsed.idioma_primario,
            titulo: `Linguagem Primária: ${IDIOMA_AMOR_META[parsed.idioma_primario]?.label || parsed.idioma_primario} (${parsed.percentuais?.[parsed.idioma_primario] || 0}%)`,
            resumo: `Secundária: ${IDIOMA_AMOR_META[parsed.idioma_secundario]?.label || parsed.idioma_secundario} (${parsed.percentuais?.[parsed.idioma_secundario] || 0}%)`,
            idiomaResult: parsed,
          });
          return;
        } catch {}
      }

      const storedDiags = JSON.parse(
        localStorage.getItem(`psi_diagnostics_${spouseId}`) ||
        localStorage.getItem(`psi_diagnostics_${spouseUserId}`) ||
        '[]'
      );
      const allDiags = [...storedDiags, ...INITIAL_DIAGNOSTICS];
      const foundDiag = allDiags.find(
        (d: UserDiagnostic) =>
          (d.user_id === spouseId || d.user_id === spouseUserId) &&
          (d.quiz_id === 'quiz-idioma-amor' || d.titulo_resultado?.toLowerCase().includes('idioma'))
      );

      if (foundDiag) {
        setSpouseData({
          hasAnswered: true,
          chave: 'tempo',
          titulo: foundDiag.titulo_resultado,
          resumo: foundDiag.resultado_texto,
          diagnostic: foundDiag,
        });
        return;
      }

      setSpouseData({ hasAnswered: false });
      return;
    }

    // 3. Quizzes Padrão
    const storedDiags = JSON.parse(
      localStorage.getItem(`psi_diagnostics_${spouseId}`) ||
      localStorage.getItem(`psi_diagnostics_${spouseUserId}`) ||
      '[]'
    );
    const allDiags = [...storedDiags, ...INITIAL_DIAGNOSTICS];
    const foundDiag = allDiags.find(
      (d: UserDiagnostic) =>
        (d.user_id === spouseId || d.user_id === spouseUserId) && d.quiz_id === quizId
    );

    if (foundDiag) {
      setSpouseData({
        hasAnswered: true,
        chave: foundDiag.titulo_resultado,
        titulo: foundDiag.titulo_resultado,
        resumo: foundDiag.resultado_texto,
        diagnostic: foundDiag,
      });
      return;
    }

    setSpouseData({ hasAnswered: false });
  }, [spouse, quizId]);

  // Busca orientação em partnerGuidanceList caso haja chave
  useEffect(() => {
    if (spouseData?.hasAnswered && spouseData.chave && partnerGuidanceList?.length > 0) {
      const found = partnerGuidanceList.find(
        (g) =>
          (!g.quiz_id || g.quiz_id === quizId) &&
          g.resultado_chave.toLowerCase() === spouseData.chave?.toLowerCase()
      );
      setGuidance(found || null);
    } else {
      setGuidance(null);
    }
  }, [spouseData, quizId, partnerGuidanceList]);

  // Se o usuário não possui cônjuge vinculado, não exibe nada
  if (!spouse) {
    return null;
  }

  // Se o cônjuge ainda não respondeu este quiz: mensagem sutil e amigável
  if (!spouseData?.hasAnswered) {
    return (
      <div className={`p-5 rounded-3xl bg-amber-50/70 border border-amber-200/80 shadow-xs space-y-2 ${className}`}>
        <div className="flex items-center gap-2.5 text-amber-800">
          <HeartHandshake className="w-5 h-5 text-amber-600 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider">Acompanhamento Conjugal</span>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          Quando <strong>{spouse.nome}</strong> responder este quiz, você verá um resumo do resultado dele(a) aqui, junto com orientações personalizadas para o casal.
        </p>
      </div>
    );
  }

  // Se o cônjuge já respondeu: exibe bloco destacado com resultado do parceiro + orientações
  return (
    <div className={`bg-gradient-to-br from-white via-rose-soft/30 to-brand-50/40 rounded-3xl p-6 sm:p-8 border border-brand-200/90 shadow-soft space-y-6 ${className}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold text-sm shadow-xs font-heading">
            {spouse.nome.split(' ').map((n) => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100/80 px-2 py-0.5 rounded-full border border-brand-200">
                Resultado do Cônjuge
              </span>
              <span className="text-[11px] text-warm-600">Vínculo Ativo</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-warm-900 font-heading">
              {spouse.nome}
            </h3>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-brand-800 text-[11px] font-semibold border border-rose-200 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Visão Integrada de Casal</span>
        </div>
      </div>

      {/* Resumo do Resultado do Cônjuge */}
      <div className="space-y-3">
        <div className="p-4 rounded-2xl bg-white border border-brand-100 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-brand-700">
            {quizId === 'quiz-temperamento' ? (
              <Brain className="w-4 h-4 text-brand-600" />
            ) : quizId === 'quiz-idioma-amor' ? (
              <Heart className="w-4 h-4 text-pink-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            )}
            <span className="text-xs font-bold uppercase tracking-wider">
              Diagnóstico de {spouse.nome.split(' ')[0]}
            </span>
          </div>

          <h4 className="text-sm font-bold text-warm-900 font-heading">
            {spouseData.titulo}
          </h4>

          {spouseData.resumo && (
            <p className="text-xs text-warm-700 leading-relaxed">
              {spouseData.resumo}
            </p>
          )}

          {/* Se houver dados detalhados de temperamento */}
          {spouseData.temperamentoResult && (
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-warm-100 text-warm-800 font-medium">
                Primário: <strong>{TEMPERAMENTO_META[spouseData.temperamentoResult.temperamento_primario]?.label}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-warm-100 text-warm-800 font-medium">
                Secundário: <strong>{TEMPERAMENTO_META[spouseData.temperamentoResult.temperamento_secundario]?.label}</strong>
              </span>
            </div>
          )}

          {/* Se houver dados detalhados de idioma do amor */}
          {spouseData.idiomaResult && (
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-pink-50 text-pink-800 border border-pink-200 font-medium">
                1º: <strong>{IDIOMA_AMOR_META[spouseData.idiomaResult.idioma_primario]?.label}</strong> ({spouseData.idiomaResult.percentuais[spouseData.idiomaResult.idioma_primario]}%)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 font-medium">
                2º: <strong>{IDIOMA_AMOR_META[spouseData.idiomaResult.idioma_secundario]?.label}</strong> ({spouseData.idiomaResult.percentuais[spouseData.idiomaResult.idioma_secundario]}%)
              </span>
            </div>
          )}
        </div>

        {/* Orientações Conjugais (Partner Guidance) */}
        <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/80 space-y-2.5">
          <div className="flex items-center gap-2 text-brand-700">
            <Lightbulb className="w-4 h-4 text-brand-600 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Orientações para Conviver com o Perfil de {spouse.nome.split(' ')[0]}
            </span>
          </div>

          {guidance ? (
            <div className="space-y-2 text-xs text-warm-800">
              <p className="leading-relaxed">{guidance.texto_resumo}</p>
              {Array.isArray(guidance.tarefas) && guidance.tarefas.length > 0 && (
                <ul className="space-y-1.5 pt-1">
                  {guidance.tarefas.map((tarefa, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brand-600 font-bold">•</span>
                      <span>{typeof tarefa === 'string' ? tarefa : JSON.stringify(tarefa)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="flex items-start gap-2 text-xs text-warm-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-warm-200/60">
              <Info className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <span>
                Orientações clínicas detalhadas para esta combinação estão sendo preparadas pela <strong>Psi Elaine Souza</strong>. Em breve você receberá recomendações práticas sobre como se comunicar e demonstrar afeto respeitando as características do seu cônjuge.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
