'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { INITIAL_DIAGNOSTICS } from '@/lib/mockData';
import { UserDiagnostic } from '@/types/database';
import { History, Award, ArrowRight, Calendar, Sparkles } from 'lucide-react';

export default function HistoricoPage() {
  const { user } = useAuth();
  const [diagnostics, setDiagnostics] = useState<UserDiagnostic[]>([]);

  useEffect(() => {
    const storedDiags = localStorage.getItem(`psi_diagnostics_${user?.id}`);
    if (storedDiags) {
      setDiagnostics(JSON.parse(storedDiags));
    } else {
      setDiagnostics(INITIAL_DIAGNOSTICS);
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-card">
        <div className="flex items-center gap-2 text-brand-600 mb-1">
          <History className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Linha do Tempo</span>
        </div>
        <h1 className="text-2xl font-bold text-warm-900 font-heading">
          Histórico de Diagnósticos
        </h1>
        <p className="text-xs text-warm-700 mt-0.5">
          Reveja seus diagnósticos anteriores e acompanhe sua evolução contínua ao longo da mentoria.
        </p>
      </div>

      {diagnostics.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-brand-100 space-y-3">
          <Award className="w-10 h-10 text-warm-300 mx-auto" />
          <h3 className="text-base font-bold text-warm-900 font-heading">Nenhum diagnóstico respondido ainda</h3>
          <p className="text-xs text-warm-700 max-w-sm mx-auto">
            Acesse a seção de Quizzes para responder às primeiras avaliações e liberar seus relatórios personalizados.
          </p>
          <Link
            href="/quizzes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all mt-2"
          >
            <span>Responder Primeiro Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {diagnostics.map((diag) => {
            const isTemperamento =
              diag.quiz_id === 'quiz-temperamento' ||
              diag.id?.startsWith('diag-temp-') ||
              diag.titulo_resultado?.toLowerCase().includes('temperamento') ||
              diag.quiz_titulo?.toLowerCase().includes('temperamento');

            return (
              <div
                key={diag.id}
                className="bg-white rounded-3xl p-6 border border-brand-100 shadow-card hover:shadow-soft-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                      {diag.quiz_titulo || 'Diagnóstico Mapeado'}
                    </span>
                    <span className="text-[11px] text-warm-700 inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-warm-400" />
                      {new Date(diag.gerado_em).toLocaleDateString('pt-BR')}
                    </span>
                    {isTemperamento && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Laudo Completo Disponível
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-warm-900 font-heading">
                    {diag.titulo_resultado}
                  </h3>

                  <p className="text-xs text-warm-700 line-clamp-2 max-w-2xl">
                    {diag.resultado_texto}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isTemperamento ? (
                    <>
                      <Link
                        href="/quizzes/temperamento/relatorio"
                        className="px-4 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-xs hover:opacity-95 transition-all inline-flex items-center justify-center gap-1.5 shrink-0"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Relatório Completo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="/quizzes/temperamento/resultado"
                        className="px-3.5 py-2.5 rounded-xl bg-warm-50 text-warm-700 hover:bg-warm-100 text-xs font-semibold transition-all"
                      >
                        Resumo
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={`/diagnosticos/${diag.id}`}
                      className="px-4 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-xs hover:opacity-95 transition-all inline-flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <span>Ler Diagnóstico</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
