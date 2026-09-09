'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-brand-100 text-center">
        {!enviado ? (
          <>
            <div className="w-12 h-12 rounded-full brand-gradient text-white flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-warm-900 font-heading">
              Recuperação de Senha
            </h1>
            <p className="text-xs text-warm-700 mt-1 mb-6">
              Digite seu e-mail cadastrado para receber o link de redefinição de acesso.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-rose-soft/50 text-warm-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl brand-gradient text-white font-semibold shadow-md hover:opacity-95 text-sm"
              >
                Enviar Link de Redefinição
              </button>
            </form>
          </>
        ) : (
          <div className="space-y-4 py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h2 className="text-lg font-bold text-warm-900">E-mail Enviado com Sucesso!</h2>
            <p className="text-xs text-warm-700 leading-relaxed">
              Enviamos as instruções de redefinição de senha para <strong>{email}</strong>. Verifique sua caixa de entrada e spam.
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
