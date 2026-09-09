'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { HeartHandshake, Lock, Mail, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('mariana@exemplo.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email);
      if (res.success) {
        if (res.status === 'pendente') {
          router.push('/pendente');
        } else if (email.includes('admin') || email.includes('elaine')) {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError('E-mail ou senha inválidos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail: string, targetPath: string) => {
    setEmail(demoEmail);
    login(demoEmail).then(() => {
      router.push(targetPath);
    });
  };

  return (
    <div className="max-w-md mx-auto py-8">
      {/* Header Acolhedor com Logo Oficial */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <img
            src="/logo.png"
            alt="Psi Elaine Souza Logo"
            className="h-28 sm:h-36 w-auto object-contain mix-blend-multiply mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-warm-900 font-heading">
          Bem-vindo(a) à sua Mentoria
        </h1>
        <p className="text-sm text-warm-700 mt-1 max-w-xs mx-auto">
          Um espaço seguro e individual para o desenvolvimento do seu relacionamento.
        </p>
      </div>

      {/* Card de Login */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-brand-100 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-100/50 rounded-full blur-2xl pointer-events-none" />
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1.5">
              E-mail de Acesso
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-warm-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-warm-200 bg-rose-soft/50 text-warm-900 placeholder:text-warm-700/60 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider">
                Senha
              </label>
              <Link href="/recuperar-senha" className="text-xs text-brand-600 font-medium hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-warm-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-warm-200 bg-rose-soft/50 text-warm-900 placeholder:text-warm-700/60 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl brand-gradient text-white font-semibold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 group mt-2 text-sm"
          >
            {loading ? (
              <span>Entrando...</span>
            ) : (
              <>
                <span>Entrar na Plataforma</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-warm-100 text-center">
          <p className="text-xs text-warm-700">
            Ainda não possui uma conta?{' '}
            <Link href="/cadastro" className="text-brand-600 font-bold hover:underline">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>

      {/* Botões de Acesso Rápido para Demonstração do Avaliador */}
      <div className="mt-8 bg-brand-50/70 border border-brand-200/80 rounded-2xl p-4 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-800 mb-2">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>Atalhos de Acesso Rápido para Demonstração:</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <button
            onClick={() => handleQuickLogin('mariana@exemplo.com', '/dashboard')}
            className="p-2 bg-white rounded-xl border border-brand-200 font-semibold text-brand-700 hover:bg-brand-50 transition-colors shadow-xs"
          >
            Aluna Ativa
          </button>
          <button
            onClick={() => handleQuickLogin('fernanda@exemplo.com', '/pendente')}
            className="p-2 bg-white rounded-xl border border-brand-200 font-semibold text-amber-700 hover:bg-amber-50 transition-colors shadow-xs"
          >
            Aluna Pendente
          </button>
          <button
            onClick={() => handleQuickLogin('elaine@psielainesouza.com.br', '/admin')}
            className="p-2 bg-white rounded-xl border border-brand-200 font-semibold text-warm-900 hover:bg-warm-100 transition-colors shadow-xs"
          >
            Psicóloga (Admin)
          </button>
        </div>
      </div>

      {/* Aviso de Privacidade */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-warm-700 text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Seus dados e respostas são estritamente confidenciais e individuais.</span>
      </div>
    </div>
  );
}
