'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserDiagnostic, Profile } from '@/types/database';
import {
  History,
  Search,
  Award,
  Calendar,
  User,
  Sparkles,
  Heart,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  BookOpen,
  BarChart3,
} from 'lucide-react';
import { TEMPERAMENTO_META, TEMPERAMENTO_PERGUNTAS } from '@/lib/temperamentoData';
import { IDIOMA_AMOR_META, IDIOMA_AMOR_PERGUNTAS } from '@/lib/idiomaAmorData';
import { createClient } from '@/lib/supabase/client';

export default function AdminRespostasPage() {
  const { profilesList, refreshProfiles, getSpouse } = useAuth();
  const students = profilesList.filter((p) => p.role !== 'admin');

  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [loadingStudentData, setLoadingStudentData] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Estados dos resultados do aluno selecionado
  const [tempResult, setTempResult] = useState<any>(null);
  const [tempAnswers, setTempAnswers] = useState<any[]>([]);
  const [idiomaResult, setIdiomaResult] = useState<any>(null);
  const [idiomaAnswers, setIdiomaAnswers] = useState<any[]>([]);
  const [userDiagnostics, setUserDiagnostics] = useState<UserDiagnostic[]>([]);

  // Estados de visualização / acordeão
  const [showIdiomaDetails, setShowIdiomaDetails] = useState(false);
  const [showTempDetails, setShowTempDetails] = useState(false);

  // Inicializa com o primeiro aluno da lista se nenhum estiver selecionado
  useEffect(() => {
    if (students.length > 0 && !selectedUserId) {
      setSelectedUserId(students[0].id);
    }
  }, [students, selectedUserId]);

  const selectedProfile: Profile | undefined =
    students.find((p) => p.id === selectedUserId || p.user_id === selectedUserId) || students[0];

  const spouse = selectedProfile ? getSpouse(selectedProfile.user_id || selectedProfile.id) : null;

  // Filtragem dos alunos na coluna da esquerda
  const filteredStudents = students.filter(
    (p) =>
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  // Função para buscar os dados de diagnósticos e quizzes do aluno no Supabase e localStorage
  const loadStudentQuizData = async (profile: Profile) => {
    if (!profile) return;
    setLoadingStudentData(true);

    const validIds = Array.from(new Set([profile.user_id, profile.id].filter(Boolean)));
    const authId = profile.user_id || profile.id;
    const profId = profile.id;
    const supabase = createClient();

    let fetchedTempResult: any = null;
    let fetchedTempAnswers: any[] = [];
    let fetchedIdiomaResult: any = null;
    let fetchedIdiomaAnswers: any[] = [];
    let fetchedDiagnostics: UserDiagnostic[] = [];

    if (supabase && validIds.length > 0) {
      try {
        // 1. Busca Teste do Idioma do Amor do Supabase
        const { data: dbIdioma, error: idiomaErr } = await supabase
          .from('quiz_love_language_results')
          .select('*')
          .in('user_id', validIds)
          .order('calculado_em', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (dbIdioma) {
          fetchedIdiomaResult = dbIdioma;
        }

        // 2. Busca Respostas Detalhadas do Idioma do Amor
        const { data: dbIdiomaAnswers } = await supabase
          .from('quiz_love_language_answers')
          .select('*')
          .in('user_id', validIds)
          .order('question_number', { ascending: true });

        if (dbIdiomaAnswers && dbIdiomaAnswers.length > 0) {
          fetchedIdiomaAnswers = dbIdiomaAnswers;
        }

        // 3. Busca Teste de Temperamento do Supabase
        const { data: dbTemp } = await supabase
          .from('quiz_temperamento_results')
          .select('*')
          .in('user_id', validIds)
          .order('calculado_em', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (dbTemp) {
          fetchedTempResult = dbTemp;
        }

        // 4. Busca Respostas Detalhadas de Temperamento
        const { data: dbTempAnswers } = await supabase
          .from('quiz_temperamento_answers')
          .select('*')
          .in('user_id', validIds)
          .order('question_number', { ascending: true });

        if (dbTempAnswers && dbTempAnswers.length > 0) {
          fetchedTempAnswers = dbTempAnswers;
        }

        // 5. Busca outros Diagnósticos
        const { data: dbDiags } = await supabase
          .from('user_diagnostics')
          .select('*')
          .in('user_id', validIds)
          .order('gerado_em', { ascending: false });

        if (dbDiags && dbDiags.length > 0) {
          fetchedDiagnostics = dbDiags;
        }
      } catch (err) {
        console.warn('Erro ao carregar dados do Supabase:', err);
      }
    }

    // Fallbacks para localStorage (caso rodando em modo híbrido / offline)
    if (!fetchedIdiomaResult) {
      const storedIdioma =
        localStorage.getItem(`psi_idioma_amor_result_${profId}`) ||
        localStorage.getItem(`psi_idioma_amor_result_${authId}`);
      if (storedIdioma) {
        try {
          fetchedIdiomaResult = JSON.parse(storedIdioma);
        } catch {}
      }
    }

    if (fetchedIdiomaAnswers.length === 0) {
      const storedAnswers =
        localStorage.getItem(`psi_idioma_amor_answers_${profId}`) ||
        localStorage.getItem(`psi_idioma_amor_answers_${authId}`);
      if (storedAnswers) {
        try {
          const parsed = JSON.parse(storedAnswers);
          fetchedIdiomaAnswers = Object.entries(parsed).map(([qNum, opt]) => ({
            question_number: parseInt(qNum, 10),
            opcao_escolhida: opt,
          }));
        } catch {}
      }
    }

    if (!fetchedTempResult) {
      const storedTemp =
        localStorage.getItem(`psi_temperamento_result_${profId}`) ||
        localStorage.getItem(`psi_temperamento_result_${authId}`);
      if (storedTemp) {
        try {
          fetchedTempResult = JSON.parse(storedTemp);
        } catch {}
      }
    }

    if (fetchedTempAnswers.length === 0) {
      const storedTempAns =
        localStorage.getItem(`psi_temperamento_answers_${profId}`) ||
        localStorage.getItem(`psi_temperamento_answers_${authId}`);
      if (storedTempAns) {
        try {
          const parsed = JSON.parse(storedTempAns);
          fetchedTempAnswers = Object.entries(parsed).map(([qNum, ans]) => ({
            question_number: parseInt(qNum, 10),
            resposta: ans,
          }));
        } catch {}
      }
    }

    if (fetchedDiagnostics.length === 0) {
      const storedDiags =
        localStorage.getItem(`psi_diagnostics_${profId}`) ||
        localStorage.getItem(`psi_diagnostics_${authId}`);
      if (storedDiags) {
        try {
          fetchedDiagnostics = JSON.parse(storedDiags);
        } catch {}
      }
    }

    setIdiomaResult(fetchedIdiomaResult);
    setIdiomaAnswers(fetchedIdiomaAnswers);
    setTempResult(fetchedTempResult);
    setTempAnswers(fetchedTempAnswers);
    setUserDiagnostics(fetchedDiagnostics);
    setLoadingStudentData(false);
  };

  useEffect(() => {
    if (selectedProfile) {
      loadStudentQuizData(selectedProfile);
    } else {
      setIdiomaResult(null);
      setIdiomaAnswers([]);
      setTempResult(null);
      setTempAnswers([]);
      setUserDiagnostics([]);
    }
  }, [selectedProfile?.id, selectedProfile?.user_id]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshProfiles();
    if (selectedProfile) {
      await loadStudentQuizData(selectedProfile);
    }
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const hasAnyData = !!tempResult || !!idiomaResult || userDiagnostics.length > 0;

  return (
    <div className="space-y-6">
      {/* Header com Ações */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 mb-1">
              <History className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Acompanhamento Clínico</span>
            </div>
            <h1 className="text-2xl font-bold text-warm-900 font-heading">
              Visualizador de Respostas e Diagnósticos
            </h1>
            <p className="text-xs text-warm-700 mt-0.5">
              Selecione um aluno para acompanhar suas respostas individuais, pontuações e fundamentar os atendimentos de mentoria.
            </p>
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-soft/80 border border-brand-200 text-warm-800 hover:bg-brand-50 hover:text-brand-700 text-xs font-bold transition-all shadow-xs self-start sm:self-center"
            title="Atualizar lista de respostas do banco de dados"
          >
            <RefreshCw className={`w-4 h-4 text-brand-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Atualizando...' : 'Atualizar Dados'}</span>
          </button>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-brand-100 space-y-3 shadow-card">
          <User className="w-10 h-10 text-warm-300 mx-auto" />
          <h3 className="text-base font-bold text-warm-900 font-heading">Nenhum aluno cadastrado ainda</h3>
          <p className="text-xs text-warm-700 max-w-sm mx-auto">
            Quando novos alunos criarem suas contas na plataforma, eles aparecerão aqui para acompanhamento individual.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coluna Esquerda: Seletor de Alunos com Busca */}
          <div className="bg-white rounded-3xl p-5 border border-brand-100 shadow-card space-y-4 h-fit">
            <div>
              <h3 className="text-xs font-bold text-warm-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-brand-600" />
                Selecione o(a) Aluno(a)
              </h3>

              {/* Campo de Busca de Alunos */}
              <div className="relative">
                <Search className="w-4 h-4 text-warm-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar aluno por nome..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-warm-200 focus:outline-none focus:border-brand-500 bg-rose-soft/20 text-warm-900"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-6 text-xs text-warm-600">
                  Nenhum aluno encontrado para "{search}".
                </div>
              ) : (
                filteredStudents.map((p) => {
                  const isSelected = selectedProfile?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedUserId(p.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50 text-brand-900 font-bold shadow-xs'
                          : 'border-warm-200 bg-rose-soft/30 text-warm-800 hover:bg-rose-soft hover:border-brand-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <p className="font-bold truncate">{p.nome}</p>
                        <span
                          className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider shrink-0 ${
                            p.status_acesso === 'ativo'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {p.status_acesso}
                        </span>
                      </div>
                      <p className="text-[11px] text-warm-700 font-normal truncate mt-0.5">{p.email}</p>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Coluna Direita: Detalhamento de Respostas & Diagnóstico do Aluno Selecionado */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-100 shadow-card">
              {/* Informações do Perfil Selecionado */}
              <div className="border-b border-warm-100 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">
                    Perfil Selecionado
                  </span>
                  <h2 className="text-xl font-bold text-warm-900 font-heading">
                    {selectedProfile?.nome}
                  </h2>
                  <p className="text-xs text-warm-700">{selectedProfile?.email}</p>
                </div>

                {spouse && (
                  <div className="bg-rose-soft/70 border border-brand-200/70 px-3.5 py-2 rounded-2xl flex items-center gap-2 self-start sm:self-center">
                    <Heart className="w-4 h-4 text-brand-600 fill-brand-100" />
                    <div>
                      <p className="text-[10px] text-warm-700 uppercase font-semibold">Cônjuge Vinculado(a):</p>
                      <p className="text-xs font-bold text-brand-900">{spouse.nome}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Título de Seção */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-warm-900 font-heading flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-600" />
                  Diagnósticos e Avaliações Clínicas
                </h3>

                {loadingStudentData && (
                  <span className="text-[11px] text-brand-600 flex items-center gap-1 font-medium">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Carregando dados...
                  </span>
                )}
              </div>

              {!hasAnyData && !loadingStudentData ? (
                <div className="p-8 rounded-2xl bg-rose-soft/40 border border-brand-100 text-center space-y-2">
                  <BookOpen className="w-8 h-8 text-warm-300 mx-auto" />
                  <p className="text-xs font-semibold text-warm-900">Este aluno ainda não respondeu a nenhum quiz ou teste.</p>
                  <p className="text-[11px] text-warm-600 max-w-sm mx-auto">
                    Assim que o aluno preencher o teste de Idioma do Amor, Temperamento ou outro questionário na plataforma, os resultados e as respostas aparecerão aqui em tempo real.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* ======================================================== */}
                  {/* TESTE DO IDIOMA DO AMOR */}
                  {/* ======================================================== */}
                  {idiomaResult && (
                    <div className="rounded-2xl border border-brand-200 overflow-hidden bg-gradient-to-br from-rose-50/40 via-white to-amber-50/30 shadow-xs">
                      <div className="p-5 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">💖</span>
                            <div>
                              <span className="text-[11px] font-bold text-brand-800 bg-brand-100/70 px-2.5 py-0.5 rounded-full border border-brand-200">
                                Teste dos 5 Idiomas do Amor
                              </span>
                            </div>
                          </div>
                          <span className="text-[11px] text-warm-700 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {idiomaResult.calculado_em || idiomaResult.gerado_em
                              ? new Date(idiomaResult.calculado_em || idiomaResult.gerado_em).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : 'Concluído'}
                          </span>
                        </div>

                        {/* Resumo Primário / Secundário */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="p-3.5 rounded-xl bg-white border border-brand-100 shadow-xs space-y-1">
                            <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider">
                              Idioma Primário (Predominante)
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-base">
                                {IDIOMA_AMOR_META[idiomaResult.idioma_primario as keyof typeof IDIOMA_AMOR_META]?.emoji || '💬'}
                              </span>
                              <h4 className="text-sm font-bold text-warm-900">
                                {IDIOMA_AMOR_META[idiomaResult.idioma_primario as keyof typeof IDIOMA_AMOR_META]?.label ||
                                  idiomaResult.idioma_primario}
                              </h4>
                              <span className="text-xs font-bold text-brand-700 ml-auto">
                                {idiomaResult.palavras_pct !== undefined && idiomaResult.idioma_primario === 'palavras'
                                  ? `${idiomaResult.palavras_pct}%`
                                  : idiomaResult.tempo_pct !== undefined && idiomaResult.idioma_primario === 'tempo'
                                  ? `${idiomaResult.tempo_pct}%`
                                  : idiomaResult.presentes_pct !== undefined && idiomaResult.idioma_primario === 'presentes'
                                  ? `${idiomaResult.presentes_pct}%`
                                  : idiomaResult.servico_pct !== undefined && idiomaResult.idioma_primario === 'servico'
                                  ? `${idiomaResult.servico_pct}%`
                                  : idiomaResult.toque_pct !== undefined && idiomaResult.idioma_primario === 'toque'
                                  ? `${idiomaResult.toque_pct}%`
                                  : `${idiomaResult.percentuais?.[idiomaResult.idioma_primario] || 0}%`}
                              </span>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-brand-100 shadow-xs space-y-1">
                            <span className="text-[10px] uppercase font-bold text-warm-700 tracking-wider">
                              Idioma Secundário
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-base">
                                {IDIOMA_AMOR_META[idiomaResult.idioma_secundario as keyof typeof IDIOMA_AMOR_META]?.emoji || '⏳'}
                              </span>
                              <h4 className="text-sm font-bold text-warm-900">
                                {IDIOMA_AMOR_META[idiomaResult.idioma_secundario as keyof typeof IDIOMA_AMOR_META]?.label ||
                                  idiomaResult.idioma_secundario}
                              </h4>
                              <span className="text-xs font-bold text-warm-700 ml-auto">
                                {idiomaResult.palavras_pct !== undefined && idiomaResult.idioma_secundario === 'palavras'
                                  ? `${idiomaResult.palavras_pct}%`
                                  : idiomaResult.tempo_pct !== undefined && idiomaResult.idioma_secundario === 'tempo'
                                  ? `${idiomaResult.tempo_pct}%`
                                  : idiomaResult.presentes_pct !== undefined && idiomaResult.idioma_secundario === 'presentes'
                                  ? `${idiomaResult.presentes_pct}%`
                                  : idiomaResult.servico_pct !== undefined && idiomaResult.idioma_secundario === 'servico'
                                  ? `${idiomaResult.servico_pct}%`
                                  : idiomaResult.toque_pct !== undefined && idiomaResult.idioma_secundario === 'toque'
                                  ? `${idiomaResult.toque_pct}%`
                                  : `${idiomaResult.percentuais?.[idiomaResult.idioma_secundario] || 0}%`}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Barras de Percentual de todos os 5 idiomas */}
                        <div className="space-y-2 pt-2">
                          <p className="text-[11px] font-bold text-warm-800 uppercase tracking-wider flex items-center gap-1.5">
                            <BarChart3 className="w-3.5 h-3.5 text-brand-600" />
                            Distribuição Completa dos 5 Idiomas
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {[
                              { key: 'palavras', label: 'Palavras de Afirmação', emoji: '💬', val: idiomaResult.palavras_pct ?? idiomaResult.percentuais?.palavras ?? 0, color: 'bg-purple-500' },
                              { key: 'tempo', label: 'Tempo de Qualidade', emoji: '⏳', val: idiomaResult.tempo_pct ?? idiomaResult.percentuais?.tempo ?? 0, color: 'bg-pink-500' },
                              { key: 'presentes', label: 'Receber Presentes', emoji: '🎁', val: idiomaResult.presentes_pct ?? idiomaResult.percentuais?.presentes ?? 0, color: 'bg-amber-500' },
                              { key: 'servico', label: 'Atos de Serviço', emoji: '🛠️', val: idiomaResult.servico_pct ?? idiomaResult.percentuais?.servico ?? 0, color: 'bg-emerald-500' },
                              { key: 'toque', label: 'Toque Físico', emoji: '🫂', val: idiomaResult.toque_pct ?? idiomaResult.percentuais?.toque ?? 0, color: 'bg-rose-500' },
                            ].map((item) => (
                              <div key={item.key} className="p-2.5 rounded-xl bg-white/80 border border-warm-100 space-y-1">
                                <div className="flex justify-between items-center text-[11px] font-semibold text-warm-800">
                                  <span>{item.emoji} {item.label}</span>
                                  <span className="font-bold text-brand-900">{item.val}%</span>
                                </div>
                                <div className="w-full bg-warm-100 rounded-full h-1.5 overflow-hidden">
                                  <div
                                    className={`${item.color} h-full rounded-full transition-all duration-500`}
                                    style={{ width: `${item.val}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Botão para Expandir Respostas Detalhadas Pergunta por Pergunta */}
                        {idiomaAnswers.length > 0 && (
                          <div className="pt-2">
                            <button
                              onClick={() => setShowIdiomaDetails(!showIdiomaDetails)}
                              className="w-full py-2.5 px-4 rounded-xl bg-white border border-brand-200 hover:bg-brand-50 text-brand-800 text-xs font-bold flex items-center justify-between transition-all"
                            >
                              <span>
                                {showIdiomaDetails ? 'Ocultar' : 'Ver'} Respostas Individuais das 20 Questões ({idiomaAnswers.length} respondidas)
                              </span>
                              {showIdiomaDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            {showIdiomaDetails && (
                              <div className="mt-3 space-y-2 max-h-96 overflow-y-auto pr-1">
                                {idiomaAnswers.map((ans, idx) => {
                                  const qDef = IDIOMA_AMOR_PERGUNTAS.find((q) => q.number === ans.question_number);
                                  const opcaoDef = qDef?.opcoes.find((o) => o.letra === ans.opcao_escolhida);
                                  const meta = ans.idioma_atribuido
                                    ? IDIOMA_AMOR_META[ans.idioma_atribuido as keyof typeof IDIOMA_AMOR_META]
                                    : null;

                                  return (
                                    <div key={idx} className="p-3 rounded-xl bg-white border border-warm-200 text-xs space-y-1">
                                      <div className="flex items-center justify-between text-warm-700">
                                        <span className="font-bold text-warm-900">
                                          Questão {ans.question_number}
                                        </span>
                                        {meta && (
                                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-soft text-brand-800">
                                            {meta.emoji} {meta.label}
                                          </span>
                                        )}
                                      </div>
                                      {qDef && <p className="text-warm-700 italic text-[11px]">{qDef.cenario}</p>}
                                      <p className="text-warm-900 font-medium bg-rose-soft/30 p-2 rounded-lg border border-brand-100/50">
                                        <strong>Opção {ans.opcao_escolhida}:</strong> {opcaoDef?.texto || ans.resposta || ans.opcao_escolhida}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* TESTE DE TEMPERAMENTO */}
                  {/* ======================================================== */}
                  {tempResult && (
                    <div className="rounded-2xl border border-brand-200 overflow-hidden bg-gradient-to-br from-brand-50/50 via-white to-rose-soft/40 shadow-xs">
                      <div className="p-5 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🔥</span>
                            <div>
                              <span className="text-[11px] font-bold text-brand-800 bg-white px-2.5 py-0.5 rounded-full border border-brand-200">
                                Teste de Temperamento Clínico
                              </span>
                            </div>
                          </div>
                          <span className="text-[11px] text-warm-700 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {tempResult.calculado_em || tempResult.gerado_em
                              ? new Date(tempResult.calculado_em || tempResult.gerado_em).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : 'Concluído'}
                          </span>
                        </div>

                        {/* Resumo do Temperamento */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="p-3.5 rounded-xl bg-white border border-brand-100 shadow-xs space-y-1">
                            <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider">
                              Temperamento Predominante
                            </span>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-warm-900">
                                {TEMPERAMENTO_META[tempResult.temperamento_primario as keyof typeof TEMPERAMENTO_META]?.label ||
                                  tempResult.temperamento_primario}
                              </h4>
                              <span className="text-xs font-bold text-brand-700 ml-auto">
                                Intensidade: {tempResult.intensidade_primario || 'Equilibrado'}
                              </span>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-brand-100 shadow-xs space-y-1">
                            <span className="text-[10px] uppercase font-bold text-warm-700 tracking-wider">
                              Temperamento Secundário
                            </span>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-warm-900">
                                {TEMPERAMENTO_META[tempResult.temperamento_secundario as keyof typeof TEMPERAMENTO_META]?.label ||
                                  tempResult.temperamento_secundario}
                              </h4>
                              <span className="text-xs font-bold text-warm-700 ml-auto">
                                Intensidade: {tempResult.intensidade_secundario || 'Moderado'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Pontuações */}
                        <div className="space-y-2 pt-2">
                          <p className="text-[11px] font-bold text-warm-800 uppercase tracking-wider flex items-center gap-1.5">
                            <BarChart3 className="w-3.5 h-3.5 text-brand-600" />
                            Pontuação por Temperamento
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                            <div className="p-2.5 rounded-xl bg-white border border-brand-100 text-center">
                              <p className="text-[10px] font-bold text-red-700">Colérico</p>
                              <p className="text-base font-bold text-warm-900">{tempResult.colerico_pontos ?? tempResult.pontuacoes?.colerico ?? 0} pts</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-brand-100 text-center">
                              <p className="text-[10px] font-bold text-amber-700">Sanguíneo</p>
                              <p className="text-base font-bold text-warm-900">{tempResult.sanguineo_pontos ?? tempResult.pontuacoes?.sanguineo ?? 0} pts</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-brand-100 text-center">
                              <p className="text-[10px] font-bold text-blue-700">Melancólico</p>
                              <p className="text-base font-bold text-warm-900">{tempResult.melancolico_pontos ?? tempResult.pontuacoes?.melancolico ?? 0} pts</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white border border-brand-100 text-center">
                              <p className="text-[10px] font-bold text-emerald-700">Fleumático</p>
                              <p className="text-base font-bold text-warm-900">{tempResult.fleumatico_pontos ?? tempResult.pontuacoes?.fleumatico ?? 0} pts</p>
                            </div>
                          </div>
                        </div>

                        {/* Detalhes de Temperamento */}
                        {tempAnswers.length > 0 && (
                          <div className="pt-2">
                            <button
                              onClick={() => setShowTempDetails(!showTempDetails)}
                              className="w-full py-2.5 px-4 rounded-xl bg-white border border-brand-200 hover:bg-brand-50 text-brand-800 text-xs font-bold flex items-center justify-between transition-all"
                            >
                              <span>
                                {showTempDetails ? 'Ocultar' : 'Ver'} Respostas Individuais do Teste ({tempAnswers.length} respondidas)
                              </span>
                              {showTempDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            {showTempDetails && (
                              <div className="mt-3 space-y-2 max-h-96 overflow-y-auto pr-1">
                                {tempAnswers.map((ans, idx) => {
                                  const qDef = TEMPERAMENTO_PERGUNTAS.find((q) => q.number === ans.question_number);
                                  return (
                                    <div key={idx} className="p-3 rounded-xl bg-white border border-warm-200 text-xs space-y-1">
                                      <div className="flex items-center justify-between text-warm-700">
                                        <span className="font-bold text-warm-900">
                                          Questão {ans.question_number}
                                        </span>
                                        {ans.temperamento_atribuido && (
                                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-soft text-brand-800">
                                            {ans.temperamento_atribuido} ({ans.pontos_atribuidos || 1} pt)
                                          </span>
                                        )}
                                      </div>
                                      {qDef && <p className="text-warm-700 italic text-[11px]">{qDef.texto}</p>}
                                      <p className="text-warm-900 font-medium bg-rose-soft/30 p-2 rounded-lg border border-brand-100/50">
                                        {ans.resposta}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* OUTROS DIAGNÓSTICOS CLÍNICOS */}
                  {/* ======================================================== */}
                  {userDiagnostics.map((diag) => (
                    <div
                      key={diag.id}
                      className="p-5 rounded-2xl bg-white border border-brand-100 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-brand-700 bg-brand-100/80 px-2.5 py-0.5 rounded-full">
                          {diag.quiz_titulo || 'Diagnóstico Clínico'}
                        </span>
                        <span className="text-[11px] text-warm-700 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(diag.gerado_em).toLocaleDateString('pt-BR')}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-warm-900">{diag.titulo_resultado}</h4>
                      <p className="text-xs text-warm-700 leading-relaxed whitespace-pre-line">
                        {diag.resultado_texto}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
