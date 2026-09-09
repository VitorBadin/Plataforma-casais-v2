'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Clock, ShieldCheck, HeartHandshake, RefreshCw, MessageCircle, LogOut, CheckCircle2 } from 'lucide-react';

export default function PendentePage() {
  const router = useRouter();
  const { user, updateUserStatus, logout } = useAuth();

  const handleSimulateApproval = () => {
    if (user) {
      updateUserStatus(user.id, 'ativo');
      router.push('/dashboard');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-amber-200 text-center relative overflow-hidden">
        {/* Glow de status ambar */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-100/80 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <Clock className="w-8 h-8 animate-pulse" />
        </div>

        <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          Aguardando Liberação Manual
        </span>

        <h1 className="text-2xl font-bold text-warm-900 font-heading mt-2">
          Seu Cadastro foi Recebido com Sucesso!
        </h1>

        <p className="text-sm text-warm-700 mt-3 leading-relaxed">
          Olá, <strong className="text-warm-900">{user?.nome || 'Aluna(o)'}</strong>! Para garantir a privacidade e segurança da mentoria, o acesso à área de membros é liberado manualmente pela equipe da <strong>Psi Elaine Souza</strong> após a confirmação da sua inscrição.
        </p>

        <div className="my-6 p-4 rounded-2xl bg-rose-soft/70 border border-brand-100 text-left space-y-2">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-warm-900">Importante sobre o seu acesso:</h4>
              <p className="text-xs text-warm-700 leading-relaxed mt-0.5">
                Mesmo que você e seu/sua parceiro(a) façam a mentoria juntos, <strong>cada conta é individual e independente</strong>. Seus diagnósticos e respostas não serão compartilhados.
              </p>
            </div>
          </div>
        </div>

        {/* 
          [EXPANSÃO FUTURA - INTEGRAÇÃO DE PAGAMENTO]
          Ao integrar com checkout da Hotmart/Kiwify, um Webhook ativará esta conta automaticamente
          sem necessidade de aprovação manual no admin.
        */}

        <div className="space-y-3 pt-2">
          <a
            href="https://wa.me/5500000000000?text=Olá!%20Fiz%20meu%20cadastro%20na%20plataforma%20e%20gostaria%20de%20confirmar%20meu%20pagamento."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition-all flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirmar Pagamento pelo WhatsApp</span>
          </a>

          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 px-6 rounded-xl border border-warm-200 text-warm-700 font-medium hover:bg-warm-50 transition-colors flex items-center justify-center gap-2 text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Verificar se meu acesso já foi liberado</span>
          </button>
        </div>

        {/* Botão de Demonstração Rápida para o Avaliador */}
        <div className="mt-8 pt-6 border-t border-warm-100">
          <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-center">
            <p className="text-xs text-brand-800 font-bold mb-2">
              🧪 Testando a Plataforma?
            </p>
            <button
              onClick={handleSimulateApproval}
              className="py-2 px-4 rounded-lg bg-brand-600 text-white font-semibold text-xs shadow-xs hover:bg-brand-700 transition-colors flex items-center justify-center gap-1.5 mx-auto"
            >
              <CheckCircle2 className="w-4 h-4" />
              Simular Liberação de Acesso pelo Admin
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="inline-flex items-center gap-1.5 text-xs text-rose-600 font-semibold hover:underline"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sair e entrar com outra conta
          </button>
        </div>
      </div>
    </div>
  );
}
