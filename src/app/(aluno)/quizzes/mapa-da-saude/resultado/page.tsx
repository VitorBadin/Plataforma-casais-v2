'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import {
  COUPLE_HEALTH_META,
  COUPLE_HEALTH_PILLARS,
} from '@/lib/coupleHealthData';
import {
  CoupleHealthComparisonItem,
  CoupleHealthMapResponse,
  CoupleHealthPillar,
  CoupleHealthPillarKey,
} from '@/types/coupleHealthTypes';
import CoupleHealthRadarChart from '@/components/CoupleHealthRadarChart';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Eye,
  Heart,
  HelpCircle,
  Layers,
  Lock,
  Sparkles,
  Users,
} from 'lucide-react';

export default function MapaDaSaudeResultadoPage() {
  const router = useRouter();
  const { user, getSpouse } = useAuth();

  const [userResponse, setUserResponse] = useState<CoupleHealthMapResponse | null>(null);
  const [spouseResponse, setSpouseResponse] = useState<CoupleHealthMapResponse | null>(null);
  const [spouseHasAnswered, setSpouseHasAnswered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPillars, setExpandedPillars] = useState<Record<string, boolean>>({});

  const authUserId = user?.user_id || user?.id;
  const profId = user?.id;
  const spouse = authUserId ? getSpouse(authUserId) || (profId ? getSpouse(profId) : null) : null;
  const spouseFirstName = spouse ? spouse.nome.trim().split(' ')[0] : 'Parceiro(a)';
  const userFirstName = user?.nome?.trim().split(' ')[0] || 'Você';

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (!authUserId) {
        if (isMounted) setIsLoading(false);
        return;
      }

      let myResp: CoupleHealthMapResponse | null = null;
      let spouseResp: CoupleHealthMapResponse | null = null;
      let spouseAnswered = false;

      const supabase = createClient();

      // 1. Carrega dados do próprio usuário
      if (supabase) {
        try {
          const { data } = await supabase
            .from('couple_health_map_responses')
            .select('*')
            .in('user_id', [authUserId, profId].filter(Boolean))
            .order('enviado_em', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (data) {
            myResp = data as CoupleHealthMapResponse;
          }
        } catch (err) {
          console.warn('Erro ao buscar resposta do usuário no Supabase:', err);
        }
      }

      // Fallback local do próprio usuário
      if (!myResp) {
        const stored =
          localStorage.getItem(`psi_couple_health_response_${profId}`) ||
          localStorage.getItem(`psi_couple_health_response_${authUserId}`);
        if (stored) {
          try {
            myResp = JSON.parse(stored);
          } catch {}
        }
      }

      // 2. Se houver cônjuge vinculado, verifica se ele respondeu e busca as notas
      if (spouse) {
        const spouseAuthId = spouse.user_id || spouse.id;
        const spouseProfId = spouse.id;

        if (supabase && spouseAuthId) {
          try {
            // Verifica status pelo helper RPC
            const { data: answeredRpc } = await supabase.rpc(
              'has_spouse_answered_health_map',
              { spouse_id: spouseAuthId }
            );

            if (answeredRpc === true) {
              spouseAnswered = true;
            }

            // Tenta buscar as notas do parceiro (liberado por RLS se ambos responderam)
            const { data: spouseData } = await supabase
              .from('couple_health_map_responses')
              .select('*')
              .in('user_id', [spouseAuthId, spouseProfId].filter(Boolean))
              .order('enviado_em', { ascending: false })
              .limit(1)
              .maybeSingle();

            if (spouseData) {
              spouseResp = spouseData as CoupleHealthMapResponse;
              spouseAnswered = true;
            }
          } catch (err) {
            console.warn('Erro ao verificar cônjuge no Supabase:', err);
          }
        }

        // Fallback local do cônjuge (offline/mock)
        if (!spouseResp) {
          const storedSpouse =
            localStorage.getItem(`psi_couple_health_response_${spouseProfId}`) ||
            localStorage.getItem(`psi_couple_health_response_${spouseAuthId}`);
          if (storedSpouse) {
            try {
              spouseResp = JSON.parse(storedSpouse);
              spouseAnswered = true;
            } catch {}
          }
        }
      }

      if (isMounted) {
        setUserResponse(myResp);
        setSpouseResponse(spouseResp);
        setSpouseHasAnswered(spouseAnswered);

        // Inicializa acordeão: pilares recomendados ficam abertos por padrão
        const initialOpen: Record<string, boolean> = {};
        if (myResp) {
          COUPLE_HEALTH_PILLARS.forEach((p) => {
            const userVal = myResp![p.key];
            const spouseVal = spouseResp ? spouseResp[p.key] : null;
            const diff = spouseVal !== null ? Math.abs(userVal - spouseVal) : 0;
            const isBlindSpot = diff > 3;
            const needsAttention = userVal <= 6 || (spouseVal !== null && spouseVal <= 6);

            if (isBlindSpot || needsAttention) {
              initialOpen[p.key] = true;
            }
          });
        }
        setExpandedPillars(initialOpen);
        setIsLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [authUserId, profId, spouse]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-9 h-9 border-3 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-sm font-medium text-warm-600">Carregando seu Mapa da Saúde...</p>
      </div>
    );
  }

  // Se não encontrou nenhuma resposta, direciona para o formulário
  if (!userResponse) {
    return (
      <div className="max-w-xl mx-auto p-8 rounded-2xl bg-white border border-warm-200 text-center space-y-4">
        <Activity className="w-10 h-10 text-brand-600 mx-auto" />
        <h2 className="text-xl font-bold text-warm-900 font-heading">
          Você ainda não preencheu o Mapa da Saúde
        </h2>
        <p className="text-sm text-warm-600">
          Atribua uma nota de 1 a 10 para cada um dos 8 pilares para gerar a sua tomografia visual e o seu Menu de Ações.
        </p>
        <Link
          href="/quizzes/mapa-da-saude"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#e41e94] text-white font-bold text-sm hover:bg-[#c2187d] transition-all"
        >
          Iniciar Preenchimento
        </Link>
      </div>
    );
  }

  // Prepara scores do usuário
  const userScores: Record<CoupleHealthPillarKey, number> = {
    p01_financeira: userResponse.p01_financeira,
    p02_rotina: userResponse.p02_rotina,
    p03_familiar: userResponse.p03_familiar,
    p04_dialogo: userResponse.p04_dialogo,
    p05_tempo: userResponse.p05_tempo,
    p06_conexao: userResponse.p06_conexao,
    p07_quimica: userResponse.p07_quimica,
    p08_valores: userResponse.p08_valores,
  };

  // Prepara scores do cônjuge (se disponível)
  const spouseScores: Record<CoupleHealthPillarKey, number> | null = spouseResponse
    ? {
        p01_financeira: spouseResponse.p01_financeira,
        p02_rotina: spouseResponse.p02_rotina,
        p03_familiar: spouseResponse.p03_familiar,
        p04_dialogo: spouseResponse.p04_dialogo,
        p05_tempo: spouseResponse.p05_tempo,
        p06_conexao: spouseResponse.p06_conexao,
        p07_quimica: spouseResponse.p07_quimica,
        p08_valores: spouseResponse.p08_valores,
      }
    : null;

  const hasComparison = spouseResponse !== null;

  // Itens de comparação do casal
  const comparisonItems: CoupleHealthComparisonItem[] = COUPLE_HEALTH_PILLARS.map((pillar) => {
    const uVal = userScores[pillar.key];
    const sVal = spouseScores ? spouseScores[pillar.key] : 0;
    const diff = Math.abs(uVal - sVal);
    const isBlindSpot = hasComparison && diff > 3; // > 3 (exatamente 3 não é)
    const needsAttentionUser = uVal >= 1 && uVal <= 6;
    const needsAttentionSpouse = hasComparison && sVal >= 1 && sVal <= 6;
    const needsAttentionAny = needsAttentionUser || needsAttentionSpouse;

    return {
      pillar,
      userScore: uVal,
      spouseScore: sVal,
      diff,
      isBlindSpot,
      needsAttentionUser,
      needsAttentionSpouse,
      needsAttentionAny,
    };
  });

  const blindSpotsCount = comparisonItems.filter((item) => item.isBlindSpot).length;

  const togglePillarAccordion = (key: string) => {
    setExpandedPillars((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-in fade-in duration-200">
      {/* Navegação / Breadcrumb */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-xs text-warm-500 font-medium">
          <Link href="/quizzes" className="hover:text-brand-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Diagnósticos
          </Link>
          <span>/</span>
          <Link href="/historico" className="hover:text-brand-600 transition-colors">
            Meus diagnósticos
          </Link>
          <span>/</span>
          <span className="text-warm-800 font-bold">Mapa da Saúde</span>
        </nav>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Respondido
        </span>
      </div>

      {/* Cabeçalho do Resultado */}
      <header className="space-y-3 bg-white p-6 sm:p-8 rounded-2xl border border-warm-200 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
          <Activity className="w-3.5 h-3.5 text-brand-600" />
          {COUPLE_HEALTH_META.category}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-warm-900 font-heading tracking-tight">
          {COUPLE_HEALTH_META.title}
        </h1>
        <p className="text-base text-brand-600 font-medium">
          {COUPLE_HEALTH_META.subtitle}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-warm-500 border-t border-warm-100">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-warm-400" />
            Respondido em{' '}
            {new Date(userResponse.enviado_em).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <span>•</span>
          <span>{COUPLE_HEALTH_META.author}</span>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 1. O MAPA (GRÁFICO RADAR COM OS 8 PILARES) */}
      {/* ======================================================== */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-warm-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-warm-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" />
              Tomografia Visual dos 8 Pilares
            </h2>
            <p className="text-xs text-warm-500">
              Gráfico radar na escala linear de 1 a 10 (quanto maior a área preenchida, mais fortalecido o pilar).
            </p>
          </div>
          <span className="text-[11px] px-3 py-1 rounded-lg bg-rose-50 text-brand-700 font-semibold border border-brand-100 self-start sm:self-auto">
            Escala 1 a 10
          </span>
        </div>

        {/* Componente Gráfico Radar */}
        <div className="py-2">
          <CoupleHealthRadarChart
            userScores={userScores}
            spouseScores={spouseScores}
            userName={userFirstName}
            spouseName={spouseFirstName}
            showLegend={hasComparison}
          />
        </div>

        {/* ======================================================== */}
        {/* 2. LISTA DAS 8 NOTAS INDIVIDUAIS */}
        {/* ======================================================== */}
        <div className="pt-6 border-t border-warm-100 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-warm-900 uppercase tracking-wider flex items-center gap-1.5">
              Suas Notas por Pilar
            </h3>
            <span className="text-[11px] text-warm-500">
              Notas de 1 a 6 requerem atenção
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {COUPLE_HEALTH_PILLARS.map((pillar) => {
              const score = userScores[pillar.key];
              const isAttention = score >= 1 && score <= 6;

              return (
                <div
                  key={pillar.key}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isAttention
                      ? 'bg-amber-50/40 border-amber-200/80'
                      : 'bg-warm-50/50 border-warm-200/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-bold text-warm-400">
                      #{pillar.number}
                    </span>
                    {isAttention ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Atenção
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        Saudável
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-bold text-warm-900 leading-snug line-clamp-1">
                    {pillar.title}
                  </p>

                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-[#e41e94] font-heading">
                      {score}
                    </span>
                    <span className="text-[11px] text-warm-400 font-medium">/ 10</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. COMPARAÇÃO AUTOMÁTICA DO CASAL */}
      {/* ======================================================== */}
      {/* Situação 1: Sem cônjuge vinculado -> Não exibe a seção */}
      {!spouse ? null : (
        /* Situação 2: Cônjuge vinculado, mas ainda não respondeu */
        !spouseResponse ? (
          <section className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-warm-50 border border-amber-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Clock className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-warm-900 font-heading">
                Comparativo Conjugal em Espera
              </h2>
            </div>
            <p className="text-sm text-warm-700 leading-relaxed font-medium">
              Esperando <strong className="text-amber-900 font-bold">{spouseFirstName}</strong> responder o
              Mapa da Saúde do Casal para mostrar aqui o comparativo de vocês.
            </p>
            <p className="text-xs text-warm-500 italic">
              Assim que {spouseFirstName} enviar as próprias notas de 1 a 10, o gráfico comparativo e os pontos cegos serão calculados e exibidos automaticamente nesta tela e na aba &ldquo;Meus diagnósticos&rdquo;.
            </p>
          </section>
        ) : (
          /* Situação 3: Os dois já responderam -> Comparativo completo */
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-warm-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-warm-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wider border border-indigo-200 mb-1">
                  <Users className="w-3.5 h-3.5" />
                  Comparativo Automático
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
                  Você e {spouseFirstName}
                </h2>
                <p className="text-xs text-warm-500">
                  Análise comparativa das percepções de cada pilar para a mentoria da Semana 6.
                </p>
              </div>

              {blindSpotsCount > 0 ? (
                <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-rose-50 border border-brand-200 text-brand-700 font-bold text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-brand-600" />
                  {blindSpotsCount} {blindSpotsCount === 1 ? 'Ponto Cego' : 'Pontos Cegos'}
                </div>
              ) : (
                <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Percepções Alinhadas
                </div>
              )}
            </div>

            {/* Tabela Comparativa Responsiva / Cards no Mobile */}
            <div className="space-y-3">
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-warm-200 bg-warm-50/70 text-warm-700 font-bold uppercase tracking-wider">
                      <th className="py-3 px-4">Pilar</th>
                      <th className="py-3 px-4 text-center">Sua Nota ({userFirstName})</th>
                      <th className="py-3 px-4 text-center">Nota de {spouseFirstName}</th>
                      <th className="py-3 px-4 text-center">Diferença</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-100">
                    {comparisonItems.map((item) => (
                      <tr
                        key={item.pillar.key}
                        className={`transition-colors ${
                          item.isBlindSpot
                            ? 'bg-rose-50/50 hover:bg-rose-50/80 font-medium'
                            : 'hover:bg-warm-50/50'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-bold text-warm-900">
                          <span className="text-warm-400 mr-2">#{item.pillar.number}</span>
                          {item.pillar.title}
                        </td>
                        <td className="py-3.5 px-4 text-center font-extrabold text-[#e41e94] text-sm">
                          {item.userScore}
                        </td>
                        <td className="py-3.5 px-4 text-center font-extrabold text-indigo-700 text-sm">
                          {item.spouseScore}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-warm-800 text-sm">
                          {item.diff} {item.diff === 1 ? 'pt' : 'pts'}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {item.isBlindSpot && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-brand-800 text-[11px] font-extrabold border border-brand-300">
                                <AlertTriangle className="w-3 h-3 text-brand-600" />
                                Ponto cego
                              </span>
                            )}
                            {item.needsAttentionAny && !item.isBlindSpot && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                                Atenção
                              </span>
                            )}
                            {!item.isBlindSpot && !item.needsAttentionAny && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                                Alinhado
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Layout em Cards para dispositivos móveis */}
              <div className="sm:hidden space-y-2.5">
                {comparisonItems.map((item) => (
                  <div
                    key={item.pillar.key}
                    className={`p-4 rounded-xl border space-y-2.5 ${
                      item.isBlindSpot
                        ? 'bg-rose-50/40 border-brand-200'
                        : 'bg-white border-warm-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-warm-900">
                        #{item.pillar.number} {item.pillar.title}
                      </span>
                      {item.isBlindSpot && (
                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-rose-100 text-brand-800 text-[10px] font-extrabold border border-brand-300 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-brand-600" />
                          Ponto cego
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-warm-100">
                      <div className="p-2 rounded-lg bg-rose-50/50">
                        <span className="text-[10px] text-warm-500 block">Você</span>
                        <strong className="text-sm font-extrabold text-[#e41e94]">
                          {item.userScore}
                        </strong>
                      </div>
                      <div className="p-2 rounded-lg bg-indigo-50/50">
                        <span className="text-[10px] text-warm-500 block">{spouseFirstName}</span>
                        <strong className="text-sm font-extrabold text-indigo-700">
                          {item.spouseScore}
                        </strong>
                      </div>
                      <div className="p-2 rounded-lg bg-warm-100/50">
                        <span className="text-[10px] text-warm-500 block">Diferença</span>
                        <strong className="text-sm font-extrabold text-warm-900">
                          {item.diff} pts
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frase de Orientação da Psicóloga */}
            <div className="p-4 sm:p-5 rounded-xl bg-warm-50 border border-warm-200 text-xs sm:text-sm text-warm-800 leading-relaxed space-y-1">
              <strong className="text-brand-700 font-bold block">
                {blindSpotsCount > 0 ? 'Orientação Clínica da Dra. Elaine Souza:' : 'Diagnóstico de Alinhamento:'}
              </strong>
              <p>
                {blindSpotsCount > 0
                  ? COUPLE_HEALTH_META.blindSpotOrientation
                  : COUPLE_HEALTH_META.noBlindSpotOrientation}
              </p>
            </div>
          </section>
        )
      )}

      {/* ======================================================== */}
      {/* 4. MENU DE AÇÕES: COMO SUBIR 1 NÍVEL NO SEU MAPA */}
      {/* ======================================================== */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-warm-200 shadow-xs space-y-6">
        <div className="border-b border-warm-100 pb-4 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-50 text-brand-700 text-[11px] font-bold uppercase tracking-wider border border-brand-200 mb-1">
            <Layers className="w-3.5 h-3.5" />
            Planos Práticos
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-warm-900 font-heading">
            {COUPLE_HEALTH_META.menuAcoesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-warm-600 leading-relaxed">
            {COUPLE_HEALTH_META.menuAcoesIntro}
          </p>
        </div>

        {/* 8 Planos de Ação em Acordeão / Cards */}
        <div className="space-y-3">
          {comparisonItems.map((item) => {
            const isExpanded = !!expandedPillars[item.pillar.key];
            const isRecommended = hasComparison
              ? item.needsAttentionAny
              : item.needsAttentionUser;

            return (
              <div
                key={item.pillar.key}
                className={`rounded-2xl border transition-all duration-150 overflow-hidden ${
                  isRecommended || item.isBlindSpot
                    ? 'border-brand-200 bg-gradient-to-r from-rose-50/20 via-white to-white shadow-xs'
                    : 'border-warm-200 bg-white hover:border-warm-300'
                }`}
              >
                {/* Header do Acordeão */}
                <button
                  type="button"
                  onClick={() => togglePillarAccordion(item.pillar.key)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 ${
                        isRecommended || item.isBlindSpot
                          ? 'bg-[#e41e94] text-white'
                          : 'bg-warm-100 text-warm-700'
                      }`}
                    >
                      {item.pillar.number}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-warm-900 font-heading">
                      {item.pillar.title}
                    </h3>

                    {/* Badges de Destaque */}
                    {hasComparison ? (
                      <>
                        {item.needsAttentionAny && (
                          <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px] font-extrabold border border-brand-200">
                            Recomendado para vocês
                          </span>
                        )}
                        {item.isBlindSpot && (
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-brand-800 text-[10px] font-extrabold border border-brand-300 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-brand-600" />
                            Ponto cego
                          </span>
                        )}
                      </>
                    ) : (
                      item.needsAttentionUser && (
                        <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px] font-extrabold border border-brand-200">
                          Recomendado para você
                        </span>
                      )
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-extrabold text-[#e41e94]">
                      Nota: {item.userScore}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-warm-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-warm-500" />
                    )}
                  </div>
                </button>

                {/* Conteúdo Expandido do Plano de Ação */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-warm-800 border-t border-warm-100/80 space-y-2 bg-warm-50/40">
                    <div className="flex items-center gap-1.5 text-brand-700 font-bold text-xs uppercase tracking-wider pt-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Plano de Ação para as Próximas 2 Semanas:
                    </div>
                    <p className="leading-relaxed font-normal bg-white p-3.5 rounded-xl border border-warm-200 text-warm-900">
                      {item.pillar.actionPlan}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Rodapé de Ações */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
        <Link
          href="/historico"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-warm-100 hover:bg-warm-200 text-warm-800 font-bold text-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Meus diagnósticos
        </Link>

        <Link
          href="/quizzes"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#e41e94] hover:bg-[#c2187d] text-white font-bold text-xs transition-all"
        >
          Ver outros testes disponíveis
        </Link>
      </div>
    </div>
  );
}
