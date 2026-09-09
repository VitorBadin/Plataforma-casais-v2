'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { HeartHandshake, User, Mail, Lock, ShieldCheck, ArrowRight, CheckSquare, Square } from 'lucide-react';

export default function CadastroPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aceitoTermos) {
      setError('É necessário concordar com os termos de privacidade para criar a sua conta.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await signup(nome, email);
      if (res.success) {
        // Redireciona para a tela de conta pendente de aprovação manual
        router.push('/pendente');
      }
    } catch (err: any) {
      setError('Erro ao criar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-2 mb-2">
          <img
            src="/logo.png"
            alt="Psi Elaine Souza Logo"
            className="h-28 sm:h-36 w-auto object-contain mix-blend-multiply mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-warm-900 font-heading">
          Criar sua Conta Individual
        </h1>
        <p className="text-sm text-warm-700 mt-1 max-w-md mx-auto">
          Cada membro do casal possui seu acesso próprio e restrito na mentoria da Psi Elaine Souza.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-brand-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1.5">
              Nome Completo
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-warm-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-warm-200 bg-rose-soft/50 text-warm-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1.5">
              E-mail Principal
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-warm-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-warm-200 bg-rose-soft/50 text-warm-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1.5">
              Criar Senha
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-warm-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-warm-200 bg-rose-soft/50 text-warm-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Caixa de Consentimento de Dados Sensíveis e Privacidade */}
          <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200 space-y-2 mt-4">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-warm-900">Termo de Privacidade & Dados Emocionais</h4>
                <p className="text-[11px] text-warm-700 leading-relaxed mt-0.5">
                  Ao se cadastrar, você declara ciência de que seus dados, respostas a quizzes e diagnósticos tratam de aspectos de saúde emocional e relacionamento. Suas respostas são <strong>individuais e confidenciais</strong>, acessíveis apenas por você e pela equipe clínica da Dra. Elaine Souza. Não há compartilhamento automático de respostas com seu/sua parceiro(a).
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAceitoTermos(!aceitoTermos)}
              className="flex items-center gap-2 text-xs font-semibold text-warm-900 pt-2 hover:text-brand-600 transition-colors"
            >
              {aceitoTermos ? (
                <CheckSquare className="w-4 h-4 text-brand-600 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-warm-400 shrink-0" />
              )}
              <span>Li e aceito os termos de privacidade e sigilo individual.</span>
            </button>
          </div>

          {/* 
            [EXPANSÃO FUTURA - INTEGRAÇÃO DE PAGAMENTO]
            No futuro, esta etapa redirecionará para a página de checkout.
            Após a confirmação do pagamento, a aprovação do cadastro ocorrerá de forma instantânea via Webhook.
          */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl brand-gradient text-white font-semibold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 text-sm mt-2"
          >
            {loading ? (
              <span>Criando conta...</span>
            ) : (
              <>
                <span>Cadastrar e Solicitar Acesso</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-warm-100 text-center">
          <p className="text-xs text-warm-700">
            Já tem uma conta cadastrada?{' '}
            <Link href="/login" className="text-brand-600 font-bold hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
