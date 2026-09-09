'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { INITIAL_DIAGNOSTICS, INITIAL_QUIZZES } from '@/lib/mockData';
import { History, Search, Award, Calendar, FileText, User } from 'lucide-react';

export default function AdminRespostasPage() {
  const { profilesList } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string>(profilesList[0]?.id || 'prof-1');

  const selectedProfile = profilesList.find(p => p.id === selectedUserId || p.user_id === selectedUserId) || profilesList[0];

  // Filtra diagnósticos do usuário selecionado
  const userDiagnostics = INITIAL_DIAGNOSTICS; // Em ambiente real, consulta respostas do user_id no Supabase

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna Esquerda: Seletor de Alunos */}
        <div className="bg-white rounded-3xl p-5 border border-brand-100 shadow-card space-y-3">
          <h3 className="text-xs font-bold text-warm-900 uppercase tracking-wider mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-brand-600" />
            Selecione o(a) Aluno(a)
          </h3>

          <div className="space-y-2">
            {profilesList.filter(p => p.role !== 'admin').map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedUserId(p.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                  selectedUserId === p.id
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

            {userDiagnostics.length === 0 ? (
              <div className="p-6 rounded-2xl bg-rose-soft/60 text-center text-xs text-warm-700">
                Este aluno ainda não respondeu a nenhum quiz.
              </div>
            ) : (
              <div className="space-y-4">
                {userDiagnostics.map((diag) => (
                  <div key={diag.id} className="p-5 rounded-2xl bg-rose-soft/50 border border-brand-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-brand-700 bg-brand-100/80 px-2.5 py-0.5 rounded-full">
                        {diag.quiz_titulo || 'Mapeamento da Comunicação'}
                      </span>
                      <span className="text-[11px] text-warm-700 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(diag.gerado_em).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-warm-900">{diag.titulo_resultado}</h4>
                    <p className="text-xs text-warm-700 leading-relaxed">{diag.resultado_texto}</p>

                    <div className="p-3 bg-white rounded-xl border border-warm-200 text-xs space-y-1">
                      <span className="font-bold text-warm-900">Resumos da Resposta:</span>
                      <p className="text-warm-700 text-[11px]">
                        • Pergunta: "Sinto que posso me expressar sem medo" ➔ <strong>Nota 4 (Frequentemente)</strong>
                      </p>
                      <p className="text-warm-700 text-[11px]">
                        • Pergunta: "Maior ruído de comunicação" ➔ <strong>"Às vezes fico em silêncio por medo de discussão"</strong>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
