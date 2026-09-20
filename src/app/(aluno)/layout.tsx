'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Clock, Ban } from 'lucide-react';
import Link from 'next/link';

export default function AlunoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (user.status_acesso === 'pendente') {
        router.replace('/pendente');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-3">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        <p className="text-xs text-warm-700 font-medium">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (user.status_acesso === 'pendente') {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-brand-100 shadow-card text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
          <Clock className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-warm-900 font-heading">Aguardando Liberação</h2>
        <p className="text-xs text-warm-700">
          Seu cadastro foi realizado com sucesso e está aguardando a aprovação da psicóloga.
        </p>
      </div>
    );
  }

  if (user.status_acesso === 'bloqueado') {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-rose-200 shadow-card text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
          <Ban className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-warm-900 font-heading">Acesso Bloqueado</h2>
        <p className="text-xs text-warm-700">
          O seu acesso a esta plataforma foi temporariamente suspenso. Entre em contato com o suporte.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
