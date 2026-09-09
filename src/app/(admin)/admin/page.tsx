'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getStoredQuizzes, INITIAL_RESOURCES } from '@/lib/mockData';
import { 
  ShieldCheck, 
  Users, 
  FileCheck2, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  Upload,
  Eye
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { profilesList, updateUserStatus, refreshProfiles } = useAuth();
  const [quizzesCount, setQuizzesCount] = useState(0);

  useEffect(() => {
    refreshProfiles();
    setQuizzesCount(getStoredQuizzes().length);
  }, []);

  const pendingUsers = profilesList.filter((p) => p.status_acesso === 'pendente');
  const activeUsers = profilesList.filter((p) => p.status_acesso === 'ativo');
  const blockedUsers = profilesList.filter((p) => p.status_acesso === 'bloqueado');

  const handleApprove = (userId: string) => {
    updateUserStatus(userId, 'ativo');
  };

  return (
    <div className="space-y-8">
      {/* Header do Painel Admin */}
      <div className="bg-warm-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-semibold mb-2 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              <span>Painel de Gestão da Psicóloga</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">
              Gestão da Mentoria de Casais
            </h1>
            <p className="text-xs sm:text-sm text-warm-200 mt-1 max-w-xl">
              Gerencie a liberação de alunos, crie novos quizzes e regras de diagnóstico e acompanhe as respostas clínicas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href="/admin/quizzes/novo"
              className="px-4 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Quiz</span>
            </Link>
            <Link
              href="/admin/materiais"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all inline-flex items-center gap-1.5 border border-white/20"
            >
              <Upload className="w-4 h-4" />
              <span>Subir PDF</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 font-bold">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <p className="text-xs text-warm-700 font-medium">Cadastros Pendentes</p>
            <p className="text-xl font-bold text-amber-700 font-heading">{pendingUsers.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-warm-700 font-medium">Alunos Ativos</p>
            <p className="text-xl font-bold text-emerald-700 font-heading">{activeUsers.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-warm-700 font-medium">Quizzes no Ar</p>
            <p className="text-xl font-bold text-warm-900 font-heading">{quizzesCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-soft text-brand-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-warm-700 font-medium">Materiais na Biblioteca</p>
            <p className="text-xl font-bold text-warm-900 font-heading">{INITIAL_RESOURCES.length}</p>
          </div>
        </div>
      </div>

      {/* Fila de Aprovação Pendente */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-warm-900 font-heading">
              Fila de Aprovação de Acesso (Confirmação Externa)
            </h2>
            <p className="text-xs text-warm-700">
              Novos membros cadastrados que aguardam confirmação de pagamento para liberação.
            </p>
          </div>
          <Link href="/admin/usuarios" className="text-xs text-brand-600 font-bold hover:underline">
            Gerenciar Todos ({profilesList.length})
          </Link>
        </div>

        {pendingUsers.length === 0 ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800 font-medium">
            ✨ Nenhuma solicitação pendente no momento. Todos os alunos cadastrados estão liberados!
          </div>
        ) : (
          <div className="space-y-3">
            {pendingUsers.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-bold text-warm-900">{p.nome}</h4>
                  <p className="text-xs text-warm-700">{p.email}</p>
                  <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">
                    Solicitado em: {new Date(p.criado_em).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(p.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Liberar Acesso</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seção de Links Rápidos de Gestão */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/quizzes"
          className="bg-white p-6 rounded-3xl border border-brand-100 shadow-card hover:shadow-soft-hover transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-warm-900 font-heading mb-1">CRUD de Quizzes & Regras</h3>
          <p className="text-xs text-warm-700 leading-relaxed mb-4">
            Crie perguntas de escala 1-5 ou múltipla escolha e configure diagnósticos personalizados.
          </p>
          <span className="text-xs font-bold text-brand-600 group-hover:underline inline-flex items-center gap-1">
            <span>Acessar Construtor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/admin/materiais"
          className="bg-white p-6 rounded-3xl border border-brand-100 shadow-card hover:shadow-soft-hover transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-warm-900 font-heading mb-1">Upload no Supabase Storage</h3>
          <p className="text-xs text-warm-700 leading-relaxed mb-4">
            Cadastre novos ebooks e guias em PDF separados por categorias para os alunos baixarem.
          </p>
          <span className="text-xs font-bold text-brand-600 group-hover:underline inline-flex items-center gap-1">
            <span>Gerenciar Materiais</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/admin/respostas"
          className="bg-white p-6 rounded-3xl border border-brand-100 shadow-card hover:shadow-soft-hover transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-warm-900 font-heading mb-1">Respostas Clínicas</h3>
          <p className="text-xs text-warm-700 leading-relaxed mb-4">
            Acompanhe em detalhes as respostas dadas por cada aluno para direcionamento nas sessões.
          </p>
          <span className="text-xs font-bold text-brand-600 group-hover:underline inline-flex items-center gap-1">
            <span>Visualizar Respostas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
