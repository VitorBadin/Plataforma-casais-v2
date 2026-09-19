'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserDiagnostic } from '@/types/database';
import { History, Search, Award, Calendar, FileText, User, Sparkles, Heart } from 'lucide-react';
import { TEMPERAMENTO_META } from '@/lib/temperamentoData';
import { IDIOMA_AMOR_META } from '@/lib/idiomaAmorData';

export default function AdminRespostasPage() {
  const { profilesList } = useAuth();
  const students = profilesList.filter(p => p.role !== 'admin');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [userDiagnostics, setUserDiagnostics] = useState<UserDiagnostic[]>([]);
  const [tempResult, setTempResult] = useState<any>(null);
  const [idiomaResult, setIdiomaResult] = useState<any>(null);

  useEffect(() => {
    if (students.length > 0 && !selectedUserId) {
      setSelectedUserId(students[0].id);
    }
  }, [students, selectedUserId]);

  const selectedProfile = students.find(p => p.id === selectedUserId || p.user_id === selectedUserId) || students[0];

  useEffect(() => {
    if (!selectedProfile) {
      setUserDiagnostics([]);
      setTempResult(null);
      setIdiomaResult(null);
      return;
    }

    const uId = selectedProfile.id;
    const usrId = selectedProfile.user_id;

    // Carrega diagnósticos salvos
    const storedDiags = localStorage.getItem(`psi_diagnostics_${uId}`) || localStorage.getItem(`psi_diagnostics_${usrId}`);
    if (storedDiags) {
      try {
        setUserDiagnostics(JSON.parse(storedDiags));
      } catch {
        setUserDiagnostics([]);
      }
    } else {
      setUserDiagnostics([]);
    }

    // Carrega teste de temperamento
    const storedTemp = localStorage.getItem(`psi_temperamento_result_${uId}`) || localStorage.getItem(`psi_temperamento_result_${usrId}`);
    if (storedTemp) {
      try {
        setTempResult(JSON.parse(storedTemp));
      } catch {
        setTempResult(null);
      }
    } else {
      setTempResult(null);
    }

    // Carrega teste do idioma do amor
    const storedIdioma = localStorage.getItem(`psi_idioma_amor_result_${uId}`) || localStorage.getItem(`psi_idioma_amor_result_${usrId}`);
    if (storedIdioma) {
      try {
        setIdiomaResult(JSON.parse(storedIdioma));
      } catch {
        setIdiomaResult(null);
      }
    } else {
      setIdiomaResult(null);
    }
  }, [selectedProfile]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-card">
        <div className="flex items-center gap-2 text-brand-600 mb-1">
          <History className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Acompanhamento Clínico</span>
        </div>
        <h1 className="text-2xl font-bold text-warm-900 font-heading">
          Visualizador de Respostas e Diagnósticos
        </h1>
        <p className="text-xs text-warm-700 mt-0.5">
          Selecione um aluno para acompanhar suas respostas individuais e fundamentar os atendimentos de mentoria.
        </p>
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
          {/* Coluna Esquerda: Seletor de Alunos */}
          <div className="bg-white rounded-3xl p-5 border border-brand-100 shadow-card space-y-3">
            <h3 className="text-xs font-bold text-warm-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-brand-600" />
              Selecione o(a) Aluno(a)
            </h3>

            <div className="space-y-2">
              {students.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedUserId(p.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                    selectedProfile?.id === p.id
                      ? 'border-brand-500 bg-brand-50 text-brand-900 font-bold shadow-xs'
                      : 'border-warm-200 bg-rose-soft/30 text-warm-800 hover:bg-rose-soft'
                  }`}
                >
                  <p className="text-xs font-bold">{p.nome}</p>
                  <p className="text-[11px] text-warm-700">{p.email}</p>
                  <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-1.5 font-medium ${
                    p.status_acesso === 'ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    Status: {p.status_acesso}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Coluna Direita: Respostas & Diagnóstico do Aluno Selecionado */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-brand-100 shadow-card">
              <div className="border-b border-warm-100 pb-4 mb-4">
                <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">Perfil Selecionado</span>
                <h2 className="text-xl font-bold text-warm-900 font-heading">{selectedProfile?.nome}</h2>
                <p className="text-xs text-warm-700">{selectedProfile?.email}</p>
              </div>

              <h3 className="text-sm font-bold text-warm-900 font-heading mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-600" />
                Diagnósticos e Avaliações Geradas
              </h3>

              {userDiagnostics.length === 0 && !tempResult && !idiomaResult ? (
                <div className="p-6 rounded-2xl bg-rose-soft/60 text-center text-xs text-warm-700">
                  Este aluno ainda não respondeu a nenhum quiz ou teste.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Teste de Temperamento se preenchido */}
                  {tempResult && (
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-50/80 to-rose-soft/80 border border-brand-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-brand-800 bg-white/90 px-2.5 py-0.5 rounded-full border border-brand-200">
                          Teste de Temperamento
                        </span>
                        <span className="text-[11px] text-warm-700 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {tempResult.gerado_em ? new Date(tempResult.gerado_em).toLocaleDateString('pt-BR') : 'Concluído'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-warm-900">
                        Predominante: {TEMPERAMENTO_META[tempResult.temperamento_primario as keyof typeof TEMPERAMENTO_META]?.label || tempResult.temperamento_primario} | Secundário: {TEMPERAMENTO_META[tempResult.temperamento_secundario as keyof typeof TEMPERAMENTO_META]?.label || tempResult.temperamento_secundario}
                      </h4>
                      <p className="text-xs text-warm-700">
                        Intensidade: <strong>{tempResult.intensidade_primario || 'Equilibrado'}</strong>
                      </p>
                    </div>
                  )}

                  {/* Teste de Idioma do Amor se preenchido */}
                  {idiomaResult && (
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-soft to-amber-50/50 border border-brand-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-brand-800 bg-white/90 px-2.5 py-0.5 rounded-full border border-brand-200">
                          Seu Idioma do Amor
                        </span>
                        <span className="text-[11px] text-warm-700 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {idiomaResult.gerado_em ? new Date(idiomaResult.gerado_em).toLocaleDateString('pt-BR') : 'Concluído'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-warm-900">
                        Primária: {IDIOMA_AMOR_META[idiomaResult.idioma_primario as keyof typeof IDIOMA_AMOR_META]?.label || idiomaResult.idioma_primario} ({idiomaResult.percentuais?.[idiomaResult.idioma_primario] || 0}%) | Secundária: {IDIOMA_AMOR_META[idiomaResult.idioma_secundario as keyof typeof IDIOMA_AMOR_META]?.label || idiomaResult.idioma_secundario} ({idiomaResult.percentuais?.[idiomaResult.idioma_secundario] || 0}%)
                      </h4>
                    </div>
                  )}

                  {/* Outros diagnósticos */}
                  {userDiagnostics.map((diag) => (
                    <div key={diag.id} className="p-5 rounded-2xl bg-rose-soft/50 border border-brand-100 space-y-3">
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
                      <p className="text-xs text-warm-700 leading-relaxed whitespace-pre-line">{diag.resultado_texto}</p>
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
