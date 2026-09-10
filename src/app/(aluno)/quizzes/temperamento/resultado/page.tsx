'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { TEMPERAMENTO_META } from '@/lib/temperamentoData';
import { TemperamentoResult } from '@/types/temperamentoTypes';
import { Temperamento } from '@/types/temperamentoTypes';
import {
  Award,
  ArrowLeft,
  Printer,
  BookOpen,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Brain,
  RefreshCw,
  FileText,
  ArrowRight,
} from 'lucide-react';

// ========================================================
// TELA DE RESULTADO — TESTE DE TEMPERAMENTO
// Exibe primário, secundário, pontuações e barras visuais
// ========================================================

/** Ordem dos temperamentos para exibição do gráfico */
const TEMPERAMENTOS_ORDEM: Temperamento[] = ['colerico', 'sanguineo', 'melancolico', 'fleumatico'];

/** Pontuação máxima teórica por temperamento */
const MAX_PONTOS = 20;

export default function TemperamentoResultadoPage() {
  const { user } = useAuth();
  const [resultado, setResultado] = useState<TemperamentoResult | null>(null);

  useEffect(() => {
    if (!user) return;
    const storageKey = `psi_temperamento_result_${user.id}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setResultado(JSON.parse(stored));
      } catch {
        setResultado(null);
      }
    }
  }, [user]);

  if (!resultado) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <Brain className="w-12 h-12 text-warm-700 mx-auto opacity-50" />
        <p className="text-warm-700">Nenhum resultado encontrado.</p>
        <Link
          href="/quizzes/temperamento"
          className="text-brand-600 font-bold hover:underline text-sm"
        >
          Fazer o Teste de Temperamento
        </Link>
      </div>
    );
  }

  const primMeta = TEMPERAMENTO_META[resultado.temperamento_primario];
  const secMeta = TEMPERAMENTO_META[resultado.temperamento_secundario];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Quizzes
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/quizzes/temperamento"
            className="px-3.5 py-1.5 rounded-xl bg-white border border-warm-200 text-warm-700 hover:bg-warm-50 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refazer Teste</span>
          </Link>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* HERO CARD — Temperamento Primário */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft relative overflow-hidden">
        {/* Decorative gradient blob */}
        <div
          className={`absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-gradient-to-br ${primMeta.gradientFrom} ${primMeta.gradientTo} rounded-full blur-3xl opacity-15 pointer-events-none`}
        />

        {/* Header */}
        <div className="border-b border-brand-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Psi Elaine Souza Logo"
              className="h-16 sm:h-20 w-auto object-contain shrink-0 mix-blend-multiply"
            />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                Resultado — Teste de Temperamento
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
                Seu Perfil de Temperamento
              </h1>
            </div>
          </div>

          <div className="bg-rose-soft border border-brand-100 p-3 rounded-2xl text-right shrink-0">
            <span className="text-[11px] text-warm-700 block font-medium">Calculado em</span>
            <span className="text-xs font-bold text-brand-700">
              {new Date(resultado.calculado_em).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* ---- Frase Resumo ---- */}
        <div className="py-6 text-center relative">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-brand-500" />
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Seu Temperamento
            </span>
            <Sparkles className="w-5 h-5 text-brand-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-warm-900 font-heading">
            {resultado.frase_resumo}
          </h2>
        </div>

        {/* ---- Cards Primário + Secundário ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Primário */}
          <div
            className={`p-5 rounded-2xl border-2 ${primMeta.borderColor} ${primMeta.bgLight} relative overflow-hidden`}
          >
            <div
              className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${primMeta.gradientFrom} ${primMeta.gradientTo} rounded-full blur-2xl opacity-20 -mt-6 -mr-6 pointer-events-none`}
            />
            <div className="relative">
              <span className="text-xs font-bold text-warm-700 uppercase tracking-wider block mb-1">
                Temperamento Primário
              </span>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-3xl">{primMeta.emoji}</span>
                <h3 className={`text-2xl font-bold font-heading ${primMeta.textColor}`}>
                  {primMeta.label}
                </h3>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xl font-bold font-heading ${primMeta.textColor}`}>
                  {resultado.pontuacoes[resultado.temperamento_primario]} pts
                </span>
                <span className="text-[11px] text-warm-700 font-medium bg-white/60 px-2 py-0.5 rounded-full">
                  {resultado.intensidade_primario}
                </span>
              </div>
              <p className="text-xs text-warm-700 leading-relaxed">
                {primMeta.descricaoCurta}
              </p>
            </div>
          </div>

          {/* Secundário */}
          <div
            className={`p-5 rounded-2xl border ${secMeta.borderColor} bg-white relative overflow-hidden`}
          >
            <div
              className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${secMeta.gradientFrom} ${secMeta.gradientTo} rounded-full blur-2xl opacity-10 -mt-4 -mr-4 pointer-events-none`}
            />
            <div className="relative">
              <span className="text-xs font-bold text-warm-700 uppercase tracking-wider block mb-1">
                Temperamento Secundário
              </span>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-2xl">{secMeta.emoji}</span>
                <h3 className={`text-xl font-bold font-heading ${secMeta.textColor}`}>
                  {secMeta.label}
                </h3>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-lg font-bold font-heading ${secMeta.textColor}`}>
                  {resultado.pontuacoes[resultado.temperamento_secundario]} pts
                </span>
                <span className="text-[11px] text-warm-700 font-medium bg-warm-50 px-2 py-0.5 rounded-full">
                  {resultado.intensidade_secundario}
                </span>
              </div>
              <p className="text-xs text-warm-700 leading-relaxed">
                {secMeta.descricaoCurta}
              </p>
            </div>
          </div>
        </div>

        {/* ---- Gráfico de Barras — Todos os 4 Temperamentos ---- */}
        <div className="bg-rose-soft/60 border border-brand-100 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-brand-600" />
            <h3 className="text-sm font-bold text-warm-900 font-heading">
              Pontuação Completa
            </h3>
          </div>

          {TEMPERAMENTOS_ORDEM.map((t) => {
            const meta = TEMPERAMENTO_META[t];
            const pontos = resultado.pontuacoes[t];
            const percent = Math.round((pontos / MAX_PONTOS) * 100);
            const isPrimario = t === resultado.temperamento_primario;
            const isSecundario = t === resultado.temperamento_secundario;

            return (
              <div key={t} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span>{meta.emoji}</span>
                    <span className={`font-bold ${meta.textColor}`}>{meta.label}</span>
                    {isPrimario && (
                      <span className="text-[10px] font-bold text-white bg-brand-500 px-1.5 py-0.5 rounded-full">
                        PRIMÁRIO
                      </span>
                    )}
                    {isSecundario && (
                      <span className="text-[10px] font-bold text-warm-700 bg-warm-200 px-1.5 py-0.5 rounded-full">
                        SECUNDÁRIO
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-warm-900">
                    {pontos}/{MAX_PONTOS}
                  </span>
                </div>

                <div className="w-full bg-white rounded-full h-4 overflow-hidden border border-warm-200">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${meta.gradientFrom} ${meta.gradientTo}`}
                    style={{ width: `${Math.max(percent, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ---- Legenda de Intensidade ---- */}
        <div className="mt-6 p-4 rounded-2xl bg-white border border-warm-200 space-y-2">
          <h4 className="text-xs font-bold text-warm-900 font-heading">
            Escala de Intensidade:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            {[
              { range: '3-7', label: 'Traço leve', color: 'bg-warm-100 text-warm-700' },
              { range: '8-12', label: 'Presente e notável', color: 'bg-amber-50 text-amber-700' },
              { range: '13-17', label: 'Temperamento forte', color: 'bg-brand-50 text-brand-700' },
              { range: '18-20', label: 'MUITO dominante', color: 'bg-red-50 text-red-700' },
            ].map((item) => (
              <div
                key={item.range}
                className={`px-2.5 py-1.5 rounded-lg font-medium text-center ${item.color}`}
              >
                <span className="font-bold block">{item.range} pts</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Assinatura da Psicóloga ---- */}
        <div className="pt-6 mt-6 border-t border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-rose-soft/40 p-5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm font-heading">
              ES
            </div>
            <div>
              <p className="text-xs font-bold text-warm-900">Psi Elaine Souza</p>
              <p className="text-[11px] text-warm-700">
                Psicóloga Clínica e Especialista em Casais
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Resultado individual e restrito</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CTA PRINCIPAL — ACESSAR RELATÓRIO COMPLETO */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Laudo Psicológico Exclusivo</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading">
            Acesse seu Relatório Completo ({primMeta.label})
          </h3>
          <p className="text-xs text-white/90 max-w-xl">
            Análise aprofundada em 4 partes: traços e desafios, 3 virtudes com 12 atividades práticas (~5 meses), dinâmica conjugal e plano de ação.
          </p>
        </div>

        <Link
          href="/quizzes/temperamento/relatorio"
          className="px-6 py-3.5 rounded-2xl bg-white text-brand-700 text-sm font-bold shadow-lg hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 shrink-0 relative z-10"
        >
          <FileText className="w-4 h-4 text-brand-600" />
          <span>Acessar Relatório Completo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ============================================================ */}
      {/* PRÓXIMOS PASSOS */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 border border-brand-100 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-warm-900 font-heading">
            Aprofunde seu Autoconhecimento
          </h3>
          <p className="text-xs text-warm-700">
            Acesse materiais selecionados para entender melhor seu perfil de temperamento.
          </p>
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
