'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getStoredQuizzes, INITIAL_DIAGNOSTICS } from '@/lib/mockData';
import { Quiz, UserDiagnostic } from '@/types/database';
import { FileCheck2, CheckCircle2, Clock, ArrowRight, Filter } from 'lucide-react';

export default function QuizzesListPage() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<'todos' | 'pendentes' | 'respondidos'>('todos');

  useEffect(() => {
    setQuizzes(getStoredQuizzes());
    const storedDiags = localStorage.getItem(`psi_diagnostics_${user?.id}`);
    if (storedDiags) {
      const parsed = JSON.parse(storedDiags);
      setAnsweredIds(parsed.map((d: UserDiagnostic) => d.quiz_id));
    } else {
      setAnsweredIds(INITIAL_DIAGNOSTICS.map(d => d.quiz_id));
    }
  }, [user]);

  const filteredQuizzes = quizzes.filter((q) => {
    const isAns = answeredIds.includes(q.id);
    if (filter === 'pendentes') return !isAns;
    if (filter === 'respondidos') return isAns;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-100 shadow-card">
        <div>
          <div className="flex items-center gap-2 text-brand-600 mb-1">
            <FileCheck2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Avaliação & Diagnósticos</span>
          </div>
          <h1 className="text-2xl font-bold text-warm-900 font-heading">
            Quizzes da Mentoria
          </h1>
          <p className="text-xs text-warm-700 mt-0.5">
            Cada quiz mapeia aspectos chave da dinâmica conjugal sob a perspectiva individual.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-1.5 bg-rose-soft p-1 rounded-2xl border border-brand-100 text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setFilter('todos')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'todos' ? 'bg-white text-brand-700 font-bold shadow-xs' : 'text-warm-700 hover:text-brand-600'
            }`}
          >
            Todos ({quizzes.length})
          </button>
          <button
            onClick={() => setFilter('pendentes')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'pendentes' ? 'bg-white text-brand-700 font-bold shadow-xs' : 'text-warm-700 hover:text-brand-600'
            }`}
          >
            Pendentes ({quizzes.length - answeredIds.length})
          </button>
          <button
            onClick={() => setFilter('respondidos')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'respondidos' ? 'bg-white text-brand-700 font-bold shadow-xs' : 'text-warm-700 hover:text-brand-600'
            }`}
          >
            Respondidos ({answeredIds.length})
          </button>
        </div>
      </div>

      {/* Grid de Quizzes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuizzes.map((quiz) => {
          const isCompleted = answeredIds.includes(quiz.id);
          return (
            <div
              key={quiz.id}
              className="bg-white rounded-3xl p-6 border border-brand-100 shadow-card hover:shadow-soft-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                    {quiz.categoria}
                  </span>

                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Respondido
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      <Clock className="w-3.5 h-3.5" />
                      Pendente
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-warm-900 font-heading mb-2">
                  {quiz.titulo}
                </h3>

                <p className="text-xs text-warm-700 leading-relaxed mb-6">
                  {quiz.descricao}
                </p>
              </div>

              <div className="pt-4 border-t border-warm-100 flex items-center justify-between">
                <span className="text-xs text-warm-700 font-medium">
                  {quiz.questions?.length || 4} perguntas
                </span>

                <Link
                  href={`/quizzes/${quiz.id}`}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isCompleted
                      ? 'bg-warm-100 text-warm-900 hover:bg-warm-200'
                      : 'brand-gradient text-white shadow-md hover:opacity-95'
                  }`}
                >
                  <span>{isCompleted ? 'Refazer / Ver Diagnóstico' : 'Responder Quiz'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
