'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { IDIOMA_AMOR_META } from '@/lib/idiomaAmorData';
import { IdiomaAmorResult, IdiomaAmor } from '@/types/idiomaAmorTypes';
import {
  Heart,
  Award,
  ArrowLeft,
  Printer,
  BookOpen,
  ShieldCheck,
  Sparkles,
  BarChart3,
  RefreshCw,
  FileText,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import SpouseQuizSummaryCard from '@/components/SpouseQuizSummaryCard';
import LoveLanguageCoupleSection from '@/components/LoveLanguageCoupleSection';

export default function IdiomaAmorResultadoPage() {
  const { user } = useAuth();
  const [resultado, setResultado] = useState<IdiomaAmorResult | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadResult() {
      if (!user) return;
      const authUserId = user.user_id || user.id;

      // 1. Tenta do localStorage
      const stored =
        localStorage.getItem(`psi_idioma_amor_result_${user.id}`) ||
        localStorage.getItem(`psi_idioma_amor_result_${authUserId}`);

      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (isMounted) {
            setResultado(parsed);
          }

          // Auto-sincroniza com Supabase em background caso o resultado ainda não estivesse no banco
          const supabase = createClient();
          if (supabase && parsed.idioma_primario) {
            supabase
              .from('quiz_love_language_results')
              .upsert(
                {
                  user_id: authUserId,
                  palavras_pct: Math.round(parsed.percentuais?.palavras || parsed.pontuacoes?.palavras || 0),
                  tempo_pct: Math.round(parsed.percentuais?.tempo || parsed.pontuacoes?.tempo || 0),
                  presentes_pct: Math.round(parsed.percentuais?.presentes || parsed.pontuacoes?.presentes || 0),
                  servico_pct: Math.round(parsed.percentuais?.servico || parsed.pontuacoes?.servico || 0),
                  toque_pct: Math.round(parsed.percentuais?.toque || parsed.pontuacoes?.toque || 0),
                  idioma_primario: parsed.idioma_primario,
                  idioma_secundario: parsed.idioma_secundario || 'palavras',
                  calculado_em: parsed.calculado_em || new Date().toISOString(),
                },
                { onConflict: 'user_id' }
              )
              .then(() => {});
          }
          return;
        } catch {}
      }

      // 2. Busca do Supabase
      const supabase = createClient();
      if (supabase) {
        try {
          const { data: dbData } = await supabase
            .from('quiz_love_language_results')
            .select('*')
            .or(`user_id.eq.${authUserId},user_id.eq.${user.id}`)
            .order('calculado_em', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (dbData && isMounted) {
            const mapped: IdiomaAmorResult = {
              id: dbData.id,
              user_id: dbData.user_id,
              idioma_primario: dbData.idioma_primario as IdiomaAmor,
              idioma_secundario: dbData.idioma_secundario as IdiomaAmor,
              pontuacoes: {
                palavras: dbData.palavras_pct || 0,
                tempo: dbData.tempo_pct || 0,
                presentes: dbData.presentes_pct || 0,
                servico: dbData.servico_pct || 0,
                toque: dbData.toque_pct || 0,
              },
              percentuais: {
                palavras: dbData.palavras_pct || 0,
                tempo: dbData.tempo_pct || 0,
                presentes: dbData.presentes_pct || 0,
                servico: dbData.servico_pct || 0,
                toque: dbData.toque_pct || 0,
              },
              distribuicao_ordenada: [
                { idioma: 'palavras' as IdiomaAmor, label: 'Palavras de Afirmação', emoji: '💬', pontos: dbData.palavras_pct || 0, percentual: dbData.palavras_pct || 0 },
                { idioma: 'tempo' as IdiomaAmor, label: 'Tempo de Qualidade', emoji: '⏳', pontos: dbData.tempo_pct || 0, percentual: dbData.tempo_pct || 0 },
                { idioma: 'presentes' as IdiomaAmor, label: 'Receber Presentes', emoji: '🎁', pontos: dbData.presentes_pct || 0, percentual: dbData.presentes_pct || 0 },
                { idioma: 'servico' as IdiomaAmor, label: 'Atos de Serviço', emoji: '🛠️', pontos: dbData.servico_pct || 0, percentual: dbData.servico_pct || 0 },
                { idioma: 'toque' as IdiomaAmor, label: 'Toque Físico', emoji: '🫂', pontos: dbData.toque_pct || 0, percentual: dbData.toque_pct || 0 },
              ].sort((a, b) => b.percentual - a.percentual),
              frase_resumo: `Idioma Predominante: ${IDIOMA_AMOR_META[dbData.idioma_primario as IdiomaAmor]?.label || dbData.idioma_primario}`,
              calculado_em: dbData.calculado_em,
            };

            setResultado(mapped);
            localStorage.setItem(`psi_idioma_amor_result_${user.id}`, JSON.stringify(mapped));
            localStorage.setItem(`psi_idioma_amor_result_${authUserId}`, JSON.stringify(mapped));
            return;
          }
        } catch (err) {
          console.warn('Erro ao carregar do Supabase:', err);
        }
      }
    }

    loadResult();

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (!resultado) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <Heart className="w-12 h-12 text-warm-700 mx-auto opacity-50" />
        <p className="text-warm-700 font-medium">Nenhum resultado de Idioma do Amor encontrado.</p>
        <Link
          href="/quizzes/idioma-do-amor"
          className="text-brand-600 font-bold hover:underline text-sm inline-flex items-center gap-1.5"
        >
          <span>Fazer o Quiz "Seu Idioma do Amor"</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const primMeta = IDIOMA_AMOR_META[resultado.idioma_primario];
  const secMeta = IDIOMA_AMOR_META[resultado.idioma_secundario];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Quizzes
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/quizzes/idioma-do-amor"
            className="px-3.5 py-1.5 rounded-xl bg-white border border-warm-200 text-warm-700 hover:bg-warm-50 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refazer Quiz</span>
          </Link>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* HERO CARD — Resultado do Idioma do Amor */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft relative overflow-hidden">
        {/* Decorative ambient background */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

        {/* Header */}
        <div className="border-b border-brand-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-pink-500" />
              <span>Diagnóstico — Seu Idioma do Amor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-warm-900 font-heading">
              Seu Perfil de Linguagem do Amor
            </h1>
            <p className="text-xs text-warm-700">
              Mapeamento de percepção, expressão de afeto e distribuição das 5 linguagens.
            </p>
          </div>

          <div className="bg-rose-soft/80 border border-brand-100 px-4 py-2.5 rounded-2xl self-start sm:self-auto text-left sm:text-right shrink-0">
            <span className="text-[11px] text-warm-700 block font-medium">Calculado em</span>
            <span className="text-xs font-bold text-brand-700">
              {new Date(resultado.calculado_em).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Frase Resumo de Destaque */}
        <div className="py-6 text-center relative">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">
              Diagnóstico Principal
            </span>
            <Sparkles className="w-4 h-4 text-pink-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading max-w-xl mx-auto leading-snug">
            {resultado.frase_resumo}
          </h2>
        </div>

        {/* Cards: Primário e Secundário */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Idioma Primário */}
          <div
            className={`p-5 rounded-2xl border-2 ${primMeta.borderColor} ${primMeta.bgLight} relative overflow-hidden`}
          >
            <div className="relative">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-warm-700 block mb-1">
                Idioma do Amor Primário
              </span>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-3xl">{primMeta.emoji}</span>
                <h3 className={`text-xl font-bold font-heading ${primMeta.textColor}`}>
                  {primMeta.label}
                </h3>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-2xl font-black font-heading ${primMeta.textColor}`}>
                  {resultado.percentuais[resultado.idioma_primario]}%
                </span>
                <span className="text-[11px] text-warm-700 font-medium bg-white/80 border border-warm-200/60 px-2.5 py-0.5 rounded-full">
                  {resultado.pontuacoes[resultado.idioma_primario]} de 20 pontos
                </span>
              </div>
              <p className="text-xs text-warm-800 leading-relaxed">
                {primMeta.descricaoCurta}
              </p>
            </div>
          </div>

          {/* Idioma Secundário */}
          <div
            className={`p-5 rounded-2xl border-2 ${secMeta.borderColor} bg-white relative overflow-hidden shadow-xs`}
          >
            <div className="relative">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-warm-700 block mb-1">
                Idioma do Amor Secundário
              </span>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-2xl">{secMeta.emoji}</span>
                <h3 className={`text-lg font-bold font-heading ${secMeta.textColor}`}>
                  {secMeta.label}
                </h3>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xl font-bold font-heading ${secMeta.textColor}`}>
                  {resultado.percentuais[resultado.idioma_secundario]}%
                </span>
                <span className="text-[11px] text-warm-700 font-medium bg-warm-50 border border-warm-200/60 px-2.5 py-0.5 rounded-full">
                  {resultado.pontuacoes[resultado.idioma_secundario]} de 20 pontos
                </span>
              </div>
              <p className="text-xs text-warm-800 leading-relaxed">
                {secMeta.descricaoCurta}
              </p>
            </div>
          </div>
        </div>

        {/* Gráfico de Barras — Distribuição Completa dos 5 Idiomas */}
        <div className="bg-rose-soft/60 border border-brand-100 rounded-3xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-600" />
              <h3 className="text-sm font-bold text-warm-900 font-heading">
                Distribuição Completa dos 5 Idiomas do Amor
              </h3>
            </div>
            <span className="text-xs text-warm-700 font-medium">
              Soma: 100%
            </span>
          </div>

          <div className="space-y-3.5">
            {resultado.distribuicao_ordenada.map((item, index) => {
              const meta = IDIOMA_AMOR_META[item.idioma];
              const isPrimario = item.idioma === resultado.idioma_primario;
              const isSecundario = item.idioma === resultado.idioma_secundario;

              // Estilos por idioma
              const barColors: Record<IdiomaAmor, { gradient: string; track: string }> = {
                palavras: {
                  gradient: 'linear-gradient(90deg, #8B5CF6 0%, #A855F7 100%)',
                  track: 'bg-purple-50 border-purple-100',
                },
                tempo: {
                  gradient: 'linear-gradient(90deg, #EC4899 0%, #F43F5E 100%)',
                  track: 'bg-pink-50 border-pink-100',
                },
                presentes: {
                  gradient: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)',
                  track: 'bg-amber-50 border-amber-100',
                },
                servico: {
                  gradient: 'linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)',
                  track: 'bg-blue-50 border-blue-100',
                },
                toque: {
                  gradient: 'linear-gradient(90deg, #10B981 0%, #14B8A6 100%)',
                  track: 'bg-emerald-50 border-emerald-100',
                },
              };

              const styleConfig = barColors[item.idioma];

              return (
                <div
                  key={item.idioma}
                  className="space-y-1.5 bg-white/80 p-3.5 rounded-2xl border border-warm-100 shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.emoji}</span>
                      <span className={`font-bold text-sm ${meta.textColor}`}>
                        {item.label}
                      </span>
                      {isPrimario && (
                        <span className="text-[10px] font-bold text-white bg-brand-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          PRIMÁRIO
                        </span>
                      )}
                      {isSecundario && (
                        <span className="text-[10px] font-bold text-warm-800 bg-warm-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          SECUNDÁRIO
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-warm-700 text-xs">
                        {item.pontos} {item.pontos === 1 ? 'ponto' : 'pontos'}
                      </span>
                      <span className="text-xs font-bold text-warm-900 bg-warm-100 px-2.5 py-0.5 rounded-md">
                        {item.percentual}%
                      </span>
                    </div>
                  </div>

                  {/* Barra de Progresso Preenchida */}
                  <div className={`w-full ${styleConfig.track} rounded-full h-4 overflow-hidden border shadow-inner relative`}>
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
                      style={{
                        width: `${Math.max(item.percentual, 4)}%`,
                        background: styleConfig.gradient,
                      }}
                    >
                      {item.percentual >= 15 && (
                        <span className="text-[10px] font-extrabold text-white leading-none drop-shadow-xs">
                          {item.percentual}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nota explicativa de desempate */}
        <div className="mt-5 p-3 rounded-xl bg-warm-50/80 border border-warm-200/80 flex items-start gap-2 text-[11px] text-warm-700">
          <HelpCircle className="w-3.5 h-3.5 text-warm-600 shrink-0 mt-0.5" />
          <span>
            <strong>Critério de Desempate:</strong> Caso dois ou mais idiomas alcancem a mesma pontuação, a plataforma adota a ordem de prioridade clínica: Palavras de Afirmação &gt; Tempo de Qualidade &gt; Atos de Serviço &gt; Toque Físico &gt; Receber Presentes.
          </span>
        </div>

        {/* Assinatura da Psicóloga */}
        <div className="pt-6 mt-6 border-t border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-rose-soft/40 p-5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm font-heading">
              ES
            </div>
            <div>
              <p className="text-xs font-bold text-warm-900">Psi Elaine Souza</p>
              <p className="text-[11px] text-warm-700">
                Psicóloga Clínica e Especialista em Casais
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Resultado individual e restrito</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DINÂMICA DO CASAL — RESULTADO DO CÔNJUGE & 25 COMBINAÇÕES */}
      {/* ============================================================ */}
      <LoveLanguageCoupleSection userPrimaryLanguage={resultado.idioma_primario} />

      {/* ============================================================ */}
      {/* CTA PRINCIPAL — ACESSAR RELATÓRIO COMPLETO */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-r from-pink-600 via-brand-500 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Laudo Psicológico por Idioma</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading">
            Acesse seu Relatório Completo ({primMeta.label})
          </h3>
          <p className="text-xs text-white/90 max-w-xl">
            Análise aprofundada da sua linguagem de afeto primária, dinâmica com o parceiro, armadilhas comuns e orientações práticas de convivência.
          </p>
        </div>

        <Link
          href="/quizzes/idioma-do-amor/relatorio"
          className="px-6 py-3.5 rounded-2xl bg-white text-pink-700 text-sm font-bold shadow-lg hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 shrink-0 relative z-10 cursor-pointer"
        >
          <FileText className="w-4 h-4 text-pink-600" />
          <span>Acessar Relatório Completo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ============================================================ */}
      {/* PRÓXIMOS PASSOS */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 border border-brand-100 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-warm-900 font-heading">
            Aprofunde seu Aprendizado
          </h3>
          <p className="text-xs text-warm-700">
            Acesse materiais e ebooks selecionados para enriquecer a comunicação do casal.
          </p>
        </div>
        <Link
          href="/biblioteca"
          className="px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all inline-flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Ver Materiais Recomendados</span>
        </Link>
      </div>
    </div>
  );
}
