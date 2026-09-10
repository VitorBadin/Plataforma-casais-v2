'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredQuizzes, saveStoredQuizzes } from '@/lib/mockData';
import { Quiz } from '@/types/database';
import { FileCheck2, Plus, Trash2, Edit3, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AdminQuizzesListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    setQuizzes(getStoredQuizzes());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este quiz?')) {
      const updated = quizzes.filter(q => q.id !== id);
      setQuizzes(updated);
      saveStoredQuizzes(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-card">
        <div>
          <div className="flex items-center gap-2 text-brand-600 mb-1">
            <FileCheck2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Mapeamentos Clínicos</span>
          </div>
          <h1 className="text-2xl font-bold text-warm-900 font-heading">
            Gestão de Quizzes e Diagnósticos
          </h1>
          <p className="text-xs text-warm-700 mt-0.5">
            Cadastre novos questionários, configure perguntas de escala/múltipla escolha e cadastre regras de resultado.
          </p>
        </div>

        <Link
          href="/admin/quizzes/novo"
          className="px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Novo Quiz</span>
        </Link>
      </div>

      {/* Lista de Quizzes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-3xl p-6 border border-brand-100 shadow-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                  {quiz.categoria}
                </span>

                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Ativo na Plataforma
                </span>
              </div>

              <h3 className="text-lg font-bold text-warm-900 font-heading mb-2">
                {quiz.titulo}
              </h3>

              <p className="text-xs text-warm-700 leading-relaxed mb-4">
                {quiz.descricao}
              </p>

              <div className="p-3 bg-rose-soft/60 rounded-xl text-xs text-warm-800 font-medium mb-4">
                📋 Contém {quiz.questions?.length || 4} perguntas cadastradas
              </div>
            </div>

            <div className="pt-4 border-t border-warm-100 flex items-center justify-between">
              <button
                onClick={() => handleDelete(quiz.id)}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Excluir</span>
              </button>

              <Link
                href={quiz.id === 'quiz-temperamento' ? '/quizzes/temperamento' : `/quizzes/${quiz.id}`}
                className="px-4 py-2 rounded-xl bg-rose-soft border border-brand-200 text-brand-700 hover:bg-brand-50 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>Testar como Aluno</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
