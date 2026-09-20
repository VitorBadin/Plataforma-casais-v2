'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, ArrowLeft, CheckCircle2, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function RedefinirSenhaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [sessionReady, setSessionReady] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setCheckingSession(false);
      return;
    }

    const initRecoverySession = async () => {
      try {
        // 1. Verifica se há 'code' nos searchParams (fluxo PKCE)
        const code = searchParams.get('code');
        if (code) {
          const { data, error: codeErr } = await supabase.auth.exchangeCodeForSession(code);
          if (!codeErr && data.session) {
            setSessionReady(true);
            setCheckingSession(false);
            return;
          }
        }

        // 2. Verifica se há tokens no hash da URL (#access_token=...&refresh_token=...)
        if (typeof window !== 'undefined' && window.location.hash) {
          const hash = window.location.hash.substring(1);
          const params = new URLSearchParams(hash);
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');

          if (accessToken && refreshToken) {
            const { data, error: hashErr } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            if (!hashErr && data.session) {
              setSessionReady(true);
              setCheckingSession(false);
              return;
            }
          }
        }

        // 3. Verifica se já existe uma sessão ativa
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session) {
          setSessionReady(true);
        } else {
          // Escuta eventos de recuperação de autenticação
          const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN' || !!session) {
              setSessionReady(true);
              setCheckingSession(false);
            }
          });
          return () => {
            authListener.subscription.unsubscribe();
          };
        }
      } catch (err) {
        console.warn('Erro ao inicializar sessão de recuperação:', err);
      } finally {
        setCheckingSession(false);
      }
    };

    initRecoverySession();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('A nova senha deve conter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas digitadas não coincidem.');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setError('Erro ao conectar ao serviço de autenticação.');
      setLoading(false);
      return;
    }

    try {
      // Se não houver sessão ativa, tenta verificar se o token da URL pode ser reprocessado
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session && typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        if (accessToken && refreshToken) {
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
        }
      }

      const { data, error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        if (
          updateError.message.includes('Auth session missing') ||
          updateError.message.includes('session')
        ) {
          setError(
            'O link de recuperação expirou ou é inválido. Por favor, solicite um novo link de redefinição de senha na tela de recuperação.'
          );
        } else {
          setError(updateError.message || 'Erro ao atualizar a senha.');
        }
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao redefinir a senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-brand-100 text-center">
        {!success ? (
          <>
            <div className="w-12 h-12 rounded-full brand-gradient text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-warm-900 font-heading">
              Criar Nova Senha
            </h1>
            <p className="text-xs text-warm-700 mt-1 mb-6">
              Digite a sua nova senha de acesso à plataforma abaixo.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1.5">
                  Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    disabled={loading}
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-warm-200 bg-rose-soft/50 text-warm-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-500 hover:text-warm-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1.5">
                  Confirmar Nova Senha
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a nova senha"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-rose-soft/50 text-warm-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl brand-gradient text-white font-semibold shadow-md hover:opacity-95 text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Salvando nova senha...</span>
                  </>
                ) : (
                  <span>Salvar e Acessar Plataforma</span>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-warm-900">Senha Alterada com Sucesso!</h2>
            <p className="text-xs text-warm-700 leading-relaxed">
              Sua senha foi redefinida com sucesso. Redirecionando você para o login...
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-md mt-2"
            >
              Ir para o Login Agora
            </Link>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-warm-100">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-brand-600 font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RedefinirSenhaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-3">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          <p className="text-xs text-warm-700 font-medium">Carregando...</p>
        </div>
      }
    >
      <RedefinirSenhaContent />
    </Suspense>
  );
}
