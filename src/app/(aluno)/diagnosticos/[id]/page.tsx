'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { INITIAL_DIAGNOSTICS } from '@/lib/mockData';
import { UserDiagnostic } from '@/types/database';
import { Award, ArrowLeft, HeartHandshake, Printer, BookOpen, ShieldCheck, Sparkles, Share2 } from 'lucide-react';

export default function DiagnosticResultPage() {
  const params = useParams();
  const { user } = useAuth();
  const diagId = params.id as string;

  const [diagnostic, setDiagnostic] = useState<UserDiagnostic | null>(null);

  useEffect(() => {
    // Busca do localStorage ou dos diagnósticos mockados
    const stored = localStorage.getItem(`psi_diagnostics_${user?.id}`);
    if (stored) {
      const parsed: UserDiagnostic[] = JSON.parse(stored);
      const found = parsed.find(d => d.id === diagId);
      if (found) {
        setDiagnostic(found);
        return;
      }
    }

    const fallback = INITIAL_DIAGNOSTICS.find(d => d.id === diagId) || INITIAL_DIAGNOSTICS[0];
    setDiagnostic(fallback);
  }, [diagId, user]);

  if (!diagnostic) {
    return (
      <div className="text-center py-12">
        <p className="text-warm-700">Carregando diagnóstico...</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/historico" className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Histórico
        </Link>

        <button
          onClick={handlePrint}
          className="px-3.5 py-1.5 rounded-xl bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir / Salvar PDF</span>
        </button>
      </div>

      {/* Cartão de Resultado do Diagnóstico */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-brand-50 rounded-full blur-3xl pointer-events-none" />

        {/* Topo do Certificado / Relatório */}
        <div className="border-b border-brand-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Psi Elaine Souza Logo"
              className="h-16 sm:h-20 w-auto object-contain shrink-0 mix-blend-multiply"
            />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                Relatório de Mentoria Individual
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
                {diagnostic.quiz_titulo || 'Diagnóstico de Relacionamento'}
              </h1>
            </div>
          </div>

          <div className="bg-rose-soft border border-brand-100 p-3 rounded-2xl text-right sm:text-right shrink-0">
            <span className="text-[11px] text-warm-700 block font-medium">Pontuação Avaliada</span>
            <span className="text-lg font-bold text-brand-700 font-heading">
              {diagnostic.pontuacao_total} pontos
            </span>
          </div>
        </div>

        {/* Status de Resultado */}
        <div className="p-4 rounded-2xl bg-brand-50/80 border border-brand-200 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-brand-600 shrink-0" />
          <div>
            <span className="text-[11px] font-semibold text-brand-700 uppercase tracking-wider block">
              Resultado Mapeado
            </span>
            <h2 className="text-base font-bold text-warm-900 font-heading">
              {diagnostic.titulo_resultado}
            </h2>
          </div>
        </div>

        {/* Banner de Acesso ao Relatório Completo de Temperamento */}
        {(diagnostic.quiz_id === 'quiz-temperamento' ||
          diagId.startsWith('diag-temp-') ||
          diagnostic.titulo_resultado?.toLowerCase().includes('temperamento')) && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-500 to-rose-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                Laudo Completo Disponível
              </span>
              <h3 className="text-sm font-bold font-heading">
                Acesse o Laudo Psicológico Completo de Temperamento
              </h3>
              <p className="text-xs text-white/90">
                Plano prático de ~5 meses, virtudes essenciais, dinâmica do casal e guia de convivência.
              </p>
            </div>
            <Link
              href="/quizzes/temperamento/relatorio"
              className="px-4 py-2.5 rounded-xl bg-white text-brand-700 text-xs font-bold shadow-xs hover:bg-rose-50 transition-all inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Ver Relatório Completo</span>
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            </Link>
          </div>
        )}

        {/* Texto Clínico do Diagnóstico */}
        <div className="space-y-4 text-warm-900 leading-relaxed text-sm">
          <div className="prose prose-pink max-w-none">
            {diagnostic.resultado_texto.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Assinatura da Psicóloga */}
        <div className="pt-6 border-t border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-rose-soft/40 p-5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm font-heading">
              ES
            </div>
            <div>
              <p className="text-xs font-bold text-warm-900">Psi Elaine Souza</p>
              <p className="text-[11px] text-warm-700">Psicóloga Clínica e Especialista em Casais</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Resultado individual e restrito</span>
          </div>
        </div>
      </div>

      {/* Próximos Passos */}
      <div className="bg-white rounded-3xl p-6 border border-brand-100 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-warm-900 font-heading">Aprofunde seu Aprendizado</h3>
          <p className="text-xs text-warm-700">Acesse materiais selecionados para potencializar este diagnóstico.</p>
        </div>
        <Link
          href="/biblioteca"
          className="px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all inline-flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Ver Materiais Recomendados</span>
        </Link>
      </div>
    </div>
  );
}
