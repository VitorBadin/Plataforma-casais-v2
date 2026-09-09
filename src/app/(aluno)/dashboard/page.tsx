'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  getStoredQuizzes, 
  INITIAL_DIAGNOSTICS, 
  INITIAL_RESOURCES 
} from '@/lib/mockData';
import { Quiz, UserDiagnostic, ResourceItem } from '@/types/database';
import { 
  Heart, 
  FileCheck2, 
  BookOpen, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  FileText
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [diagnostics, setDiagnostics] = useState<UserDiagnostic[]>([]);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [answeredQuizIds, setAnsweredQuizIds] = useState<string[]>([]);

  useEffect(() => {
    const loadedQuizzes = getStoredQuizzes();
    setQuizzes(loadedQuizzes);
    setResources(INITIAL_RESOURCES);

    // Carrega diagnósticos salvos localmente
    const storedDiags = localStorage.getItem(`psi_diagnostics_${user?.id}`);
    if (storedDiags) {
      const parsed = JSON.parse(storedDiags);
      setDiagnostics(parsed);
      setAnsweredQuizIds(parsed.map((d: UserDiagnostic) => d.quiz_id));
    } else {
      setDiagnostics(INITIAL_DIAGNOSTICS);
      setAnsweredQuizIds(INITIAL_DIAGNOSTICS.map(d => d.quiz_id));
    }
  }, [user]);

  if (!user) return null;

  const completedCount = answeredQuizIds.length;
  const pendingCount = Math.max(0, quizzes.length - completedCount);
  const latestDiag = diagnostics[0];

  return (
    <div className="space-y-8">
      {/* Banner de Boas-vindas Acolhedor */}
      <div className="relative overflow-hidden rounded-3xl brand-gradient text-white p-6 sm:p-10 shadow-lg">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Espaço Individual da Mentoria</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-heading leading-tight">
            Olá, {user.nome}!
          </h1>

          <p className="text-sm sm:text-base text-brand-100 mt-2 leading-relaxed">
            Seja bem-vindo(a) ao seu espaço sagrado de autoconhecimento e evolução nos relacionamentos. Aqui você pode responder aos seus quizzes, acompanhar seus diagnósticos e baixar os materiais exclusivos.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/quizzes"
              className="px-5 py-2.5 rounded-xl bg-white text-brand-700 font-bold text-sm shadow-md hover:bg-brand-50 transition-all inline-flex items-center gap-2"
            >
              <span>Ver Quizzes Disponíveis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/biblioteca"
              className="px-5 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 text-white font-medium text-sm transition-all inline-flex items-center gap-2 border border-white/20"
            >
              <BookOpen className="w-4 h-4" />
              <span>Acessar Biblioteca</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Cards de Métricas e Progresso */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-warm-700 font-medium">Quizzes Respondidos</p>
            <p className="text-xl font-bold text-warm-900 font-heading">
              {completedCount} <span className="text-xs font-normal text-warm-700">de {quizzes.length}</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-warm-700 font-medium">Quizzes Pendentes</p>
            <p className="text-xl font-bold text-warm-900 font-heading">
              {pendingCount}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-warm-700 font-medium">Materiais Disponíveis</p>
            <p className="text-xl font-bold text-warm-900 font-heading">
              {resources.length} PDFs
            </p>
          </div>
        </div>
      </div>

      {/* Diagnóstico Mais Recente */}
      {latestDiag && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-600" />
              <h2 className="text-lg font-bold text-warm-900 font-heading">
                Seu Diagnóstico Mais Recente
              </h2>
            </div>
            <Link
              href={`/diagnosticos/${latestDiag.id}`}
              className="text-xs text-brand-600 font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Ver Diagnóstico Completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-rose-soft/80 border border-brand-100 space-y-2">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100/80 px-2.5 py-0.5 rounded-full">
              {latestDiag.quiz_titulo || 'Diagnóstico de Relacionamento'}
            </span>
            <h3 className="text-base font-bold text-warm-900">
              {latestDiag.titulo_resultado}
            </h3>
            <p className="text-xs text-warm-700 line-clamp-3 leading-relaxed">
              {latestDiag.resultado_texto}
            </p>
          </div>
        </div>
      )}

      {/* Seção de Quizzes da Mentoria */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-warm-900 font-heading">
              Quizzes da Mentoria
            </h2>
            <p className="text-xs text-warm-700">
              Responda com calma e sinceridade. Cada resposta alimenta seus diagnósticos individuais.
            </p>
          </div>
          <Link href="/quizzes" className="text-xs text-brand-600 font-bold hover:underline">
            Ver Todos ({quizzes.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => {
            const isCompleted = answeredQuizIds.includes(quiz.id);
            return (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl p-6 border border-brand-100 shadow-card hover:shadow-soft-hover transition-all flex flex-col justify-between"
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

                  <h3 className="text-base font-bold text-warm-900 font-heading mb-1">
                    {quiz.titulo}
                  </h3>

                  <p className="text-xs text-warm-700 leading-relaxed line-clamp-2 mb-4">
                    {quiz.descricao}
                  </p>
                </div>

                <div className="pt-3 border-t border-warm-100 flex items-center justify-between">
                  <span className="text-[11px] text-warm-700">
                    {quiz.questions?.length || 4} perguntas
                  </span>

                  <Link
                    href={`/quizzes/${quiz.id}`}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isCompleted
                        ? 'bg-warm-100 text-warm-800 hover:bg-warm-200'
                        : 'brand-gradient text-white shadow-sm hover:opacity-95'
                    }`}
                  >
                    <span>{isCompleted ? 'Refazer / Ver Diagnóstico' : 'Responder Quiz'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seção de Biblioteca de Materiais */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-warm-900 font-heading">
              Materiais em Destaque
            </h2>
            <p className="text-xs text-warm-700">
              Ebooks e guias recomendados pela Psi Elaine Souza para complementar a mentoria.
            </p>
          </div>
          <Link href="/biblioteca" className="text-xs text-brand-600 font-bold hover:underline">
            Explorar Biblioteca
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {resources.slice(0, 3).map((res) => (
            <div key={res.id} className="p-4 rounded-2xl bg-rose-soft border border-brand-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-brand-600 mb-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">{res.categoria}</span>
                </div>
                <h4 className="text-xs font-bold text-warm-900 line-clamp-2 mb-1">{res.titulo}</h4>
                <p className="text-[11px] text-warm-700 line-clamp-2">{res.descricao}</p>
              </div>
              <a
                href={res.arquivo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 py-1.5 px-3 rounded-lg bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 text-[11px] font-bold text-center block transition-colors"
              >
                Baixar / Visualizar PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
