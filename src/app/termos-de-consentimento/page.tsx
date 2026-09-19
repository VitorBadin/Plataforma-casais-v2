'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  FileText,
  HeartHandshake,
  Users,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  HelpCircle,
  Scale,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function TermosDeConsentimentoPage() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Botão de Voltar e Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-brand-100 text-xs font-bold text-warm-800 hover:text-brand-600 hover:border-brand-300 shadow-2xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <Link
          href={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login'}
          className="text-xs font-semibold text-brand-600 hover:underline"
        >
          {user ? 'Ir para o Início' : 'Ir para o Login'}
        </Link>
      </div>

      {/* Header do Documento */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-card relative overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-soft/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              Documento Oficial de Privacidade & Sigilo
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Lock className="w-3 h-3" />
              LGPD (Lei nº 13.709/2018)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-warm-900 font-heading tracking-tight">
            Termos de Consentimento
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-warm-100 text-xs text-warm-700">
            <p>
              <strong>Psi Elaine Souza</strong> — Psicóloga Clínica • CRP 06/170248
            </p>
            <p className="text-brand-700 font-medium">
              Última atualização: 19 de setembro de 2026
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal do Documento */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-card space-y-8 text-warm-800 leading-relaxed text-sm sm:text-base font-body">
        
        {/* Introdução */}
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-soft/50 border border-brand-100 text-warm-800 text-sm">
          <p>
            Bem-vindo(a) à plataforma de <strong>Mentoria Individual de Casal da Psi Elaine Souza (CRP 06/170248)</strong>. Antes de utilizar a plataforma, é importante que você leia e compreenda os termos abaixo.
          </p>
        </div>

        {/* 1. SOBRE ESTA PLATAFORMA */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
              1
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Sobre Esta Plataforma
            </h2>
          </div>
          <p className="text-warm-700 text-sm pl-9 sm:pl-10">
            Esta plataforma é um espaço complementar à mentoria, destinado exclusivamente a clientes que adquiriram o acompanhamento. Aqui você poderá responder quizzes e formulários, visualizar diagnósticos personalizados e acessar materiais exclusivos (ebooks e documentos).
          </p>
        </section>

        {/* 2. NATUREZA DOS DADOS COLETADOS */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
              2
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Natureza dos Dados Coletados
            </h2>
          </div>
          <p className="text-warm-700 text-sm pl-9 sm:pl-10">
            Ao utilizar esta plataforma, você poderá compartilhar informações sensíveis sobre sua vida emocional, seu relacionamento e seu comportamento, por meio das respostas aos quizzes e formulários disponibilizados. Esses dados são tratados como dados sensíveis, nos termos da <strong>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.
          </p>
        </section>

        {/* 3. FINALIDADE DO USO DOS DADOS */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
              3
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Finalidade do Uso dos Dados
            </h2>
          </div>
          <div className="pl-9 sm:pl-10 space-y-3 text-sm text-warm-700">
            <p>Os dados fornecidos por você são utilizados exclusivamente para:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>Gerar diagnósticos e resultados personalizados dentro da plataforma;</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>Apoiar o acompanhamento realizado pela profissional responsável durante a mentoria;</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>Melhorar a qualidade do conteúdo e das orientações oferecidas a você.</span>
              </li>
            </ul>
            <p className="font-semibold text-warm-900 pt-1">
              Seus dados não são utilizados para nenhuma outra finalidade, não são vendidos, nem compartilhados com terceiros para fins comerciais ou publicitários.
            </p>
          </div>
        </section>

        {/* 4. ACESSO INDIVIDUAL E CONFIDENCIALIDADE */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
              4
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Acesso Individual e Confidencialidade
            </h2>
          </div>
          <p className="text-warm-700 text-sm pl-9 sm:pl-10">
            Sua conta é <strong>pessoal e intransferível</strong>. Suas respostas detalhadas aos quizzes e formulários são visíveis apenas para você e para a profissional responsável pela mentoria.
          </p>
        </section>

        {/* 5. VÍNCULO ENTRE CÔNJUGES */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
              5
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Vínculo Entre Cônjuges
            </h2>
          </div>
          <div className="pl-9 sm:pl-10 space-y-3 text-sm text-warm-700">
            <p>
              Caso você e seu(sua) parceiro(a) estejam realizando a mentoria juntos, a profissional responsável poderá vincular as duas contas. Nesse caso, cada pessoa passa a visualizar um resumo do resultado do(a) parceiro(a) em determinados quizzes, junto de orientações relacionadas a esse resultado — com o objetivo de apoiar o desenvolvimento do casal.
            </p>

            {/* Destaque Importante */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                Importante sobre a privacidade conjugal:
              </p>
              <p className="text-xs leading-relaxed">
                Apenas o <strong>resultado resumido</strong> é compartilhado entre as contas vinculadas. Suas respostas individuais, pergunta a pergunta, <strong>nunca são expostas ao(à) parceiro(a)</strong> — permanecem visíveis somente para você e para a profissional responsável.
              </p>
            </div>

            <p className="text-xs text-warm-700 italic">
              Se você não deseja que esse vínculo seja realizado, comunique isso diretamente à profissional responsável pela mentoria.
            </p>
          </div>
        </section>

        {/* 6. SEGURANÇA DA INFORMAÇÃO */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
              6
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Segurança da Informação
            </h2>
          </div>
          <div className="pl-9 sm:pl-10 space-y-2 text-sm text-warm-700">
            <p>
              Adotamos medidas técnicas de segurança para proteger seus dados, incluindo controle de acesso por autenticação e políticas de segurança em nível de linha (<strong>Row Level Security — RLS</strong>), que garantem que cada usuário só acesse os dados aos quais tem permissão.
            </p>
            <p>
              Ainda assim, nenhum sistema é 100% livre de riscos. Recomendamos que você mantenha sua senha em sigilo e não compartilhe seu acesso com terceiros.
            </p>
          </div>
        </section>

        {/* 7. SEUS DIREITOS */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
              7
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Seus Direitos
            </h2>
          </div>
          <div className="pl-9 sm:pl-10 space-y-3 text-sm text-warm-700">
            <p>De acordo com a LGPD, você tem o direito de, a qualquer momento:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>Confirmar a existência de tratamento dos seus dados;</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>Acessar seus dados;</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>Corrigir dados incompletos, inexatos ou desatualizados;</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>Solicitar a exclusão dos seus dados, observadas as obrigações legais de retenção;</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>Revogar este consentimento.</span>
              </li>
            </ul>
            <p className="pt-1 text-xs">
              Para exercer qualquer um desses direitos, entre em contato pelo{' '}
              <a
                href="https://wa.me/5511997327231"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 font-bold hover:underline"
              >
                Suporte Técnico (+55 11 99732-7231)
              </a>{' '}
              disponível na plataforma.
            </p>
          </div>
        </section>

        {/* 8. ARMAZENAMENTO E RETENÇÃO */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
              8
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Armazenamento e Retenção
            </h2>
          </div>
          <p className="text-warm-700 text-sm pl-9 sm:pl-10">
            Seus dados permanecem armazenados enquanto sua conta estiver ativa na plataforma e pelo período necessário para cumprir finalidades legais ou contratuais relacionadas à mentoria.
          </p>
        </section>

        {/* 9. CONSENTIMENTO */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
              9
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Consentimento
            </h2>
          </div>
          <p className="text-warm-700 text-sm pl-9 sm:pl-10">
            Ao criar sua conta e utilizar esta plataforma, você declara estar ciente e de acordo com os termos aqui descritos, e consente com o tratamento dos seus dados pessoais e sensíveis para as finalidades descritas neste documento.
          </p>
        </section>

        {/* 10. DÚVIDAS */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
              10
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Dúvidas e Contato
            </h2>
          </div>
          <p className="text-warm-700 text-sm pl-9 sm:pl-10">
            Em caso de dúvidas sobre este documento ou sobre o tratamento dos seus dados, entre em contato através do Suporte Técnico disponível no rodapé da plataforma.
          </p>
        </section>

        {/* Card de Ação Rápida no Final */}
        <div className="pt-6 border-t border-warm-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-warm-700">
            <Scale className="w-4 h-4 text-brand-600" />
            <span>Psi Elaine Souza • CRP 06/170248</span>
          </div>

          <a
            href="https://wa.me/5511997327231"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com o Suporte (+55 11 99732-7231)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
