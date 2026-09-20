'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError('Erro ao conectar ao serviço de autenticação.');
      setLoading(false);
      return;
    }

    try {
      // Redireciona o usuário para a página de redefinição de senha após clicar no link do e-mail
      const redirectUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/redefinir-senha`
        : 'https://plataformacasaisv2.vercel.app/redefinir-senha';

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl,
      });

      if (resetError) {
        // Mensagens amigáveis em português
        if (resetError.message.includes('rate limit')) {
          setError('Muitas solicitações recentes. Por favor, aguarde alguns minutos antes de tentar novamente.');
        } else {
          setError(resetError.message || 'Não foi possível enviar o e-mail de recuperação.');
        }
      } else {
        setEnviado(true);
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao processar sua solicitação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-brand-100 text-center">
        {!enviado ? (
          <>
            <div className="w-12 h-12 rounded-full brand-gradient text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-warm-900 font-heading">
              Recuperação de Senha
            </h1>
            <p className="text-xs text-warm-700 mt-1 mb-6">
              Digite seu e-mail cadastrado para receber o link oficial de redefinição de acesso.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-rose-soft/50 text-warm-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl brand-gradient text-white font-semibold shadow-md hover:opacity-95 text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Enviando link...</span>
                  </>
                ) : (
                  <span>Enviar Link de Redefinição</span>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-warm-900">E-mail Enviado com Sucesso!</h2>
            <p className="text-xs text-warm-700 leading-relaxed">
              Enviamos um link de redefinição para <strong>{email}</strong>.
            </p>
            <p className="text-[11px] text-warm-600 bg-rose-soft/50 p-3 rounded-xl border border-brand-100">
              💡 <strong>Dica:</strong> Verifique sua <strong>caixa de entrada</strong> e também a pasta de <strong>Spam / Lixo Eletrônico</strong>.
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-warm-100">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-brand-600 font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}
