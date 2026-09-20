'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ShieldAlert, Loader2, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
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
      } else if (user.role !== 'admin') {
        router.replace('/dashboard');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-3">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        <p className="text-xs text-warm-700 font-medium">Verificando autorização de acesso...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-brand-100 shadow-card text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-brand-600 flex items-center justify-center mx-auto border border-brand-100">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-warm-900 font-heading">Acesso Restrito ao Administrador</h2>
        <p className="text-xs text-warm-700">
          É necessário fazer login com as credenciais de administração para acessar esta área.
        </p>
        <Link
          href="/login"
          className="inline-block w-full py-3 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
        >
          Fazer Login como Administrador
        </Link>
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-rose-200 shadow-card text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-warm-900 font-heading">Acesso Não Autorizado</h2>
        <p className="text-xs text-warm-700">
          Sua conta atual não possui privilégios de administração.
        </p>
        <Link
          href="/dashboard"
          className="inline-block w-full py-3 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
        >
          Voltar para a Área do Aluno
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
