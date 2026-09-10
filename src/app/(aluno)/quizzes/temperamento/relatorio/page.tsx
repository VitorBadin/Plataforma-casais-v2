'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { TEMPERAMENTO_META } from '@/lib/temperamentoData';
import {
  getTemperamentoReport,
  formatarIntensidadeLaudo,
  DEFAULT_MENTOR_CONFIG,
} from '@/lib/temperamentoReportsData';
import { TemperamentoResult, Temperamento } from '@/types/temperamentoTypes';
import {
  ArrowLeft,
  Printer,
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  Heart,
  BookOpen,
  Award,
  CheckCircle2,
  AlertTriangle,
  Flame,
  MessageSquare,
  Users,
  Compass,
  Calendar,
} from 'lucide-react';

export default function TemperamentoRelatorioCompletoPage() {
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
    } else {
      // Fallback padrão demonstrativo para visualização
      const fallback: TemperamentoResult = {
        id: 'temp-preview',
        user_id: user?.id || 'anon',
        temperamento_primario: 'colerico',
        intensidade_primario: 'Temperamento forte',
        temperamento_secundario: 'sanguineo',
        intensidade_secundario: 'Presente e notável',
        pontuacoes: {
          colerico: 16,
          sanguineo: 12,
          melancolico: 8,
          fleumatico: 5,
        },
        frase_resumo: 'Líder Natural com Alta Capacidade de Realização',
        calculado_em: new Date().toISOString(),
      };
      setResultado(fallback);
    }
  }, [user]);

  if (!resultado) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <Sparkles className="w-12 h-12 text-warm-700 mx-auto opacity-50" />
        <p className="text-warm-700">Carregando seu relatório completo...</p>
      </div>
    );
  }

  const primaryType: Temperamento = resultado.temperamento_primario;
  const primMeta = TEMPERAMENTO_META[primaryType];
  const report = getTemperamentoReport(primaryType);
  const mentor = DEFAULT_MENTOR_CONFIG;

  const primaryScore = resultado.pontuacoes[primaryType] || 15;
  const intensidadeLaudo = formatarIntensidadeLaudo(primaryScore, resultado.intensidade_primario);
  const userName = user?.nome || 'Aluno(a) em Mentoria';
  const dataFormatada = new Date(resultado.calculado_em).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 print:p-0 print:space-y-6">
      {/* ============================================================ */}
      {/* BARRA SUPERIOR DE NAVEGAÇÃO E AÇÕES (Oculta na Impressão) */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <Link
            href="/quizzes/temperamento/resultado"
            className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Resumo do Teste</span>
          </Link>
          <span className="text-warm-300">|</span>
          <Link
            href="/historico"
            className="text-xs text-warm-700 hover:text-brand-600 font-medium"
          >
            Área de Diagnósticos
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 text-xs font-bold transition-all inline-flex items-center gap-2 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Salvar em PDF</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CABEÇALHO DINÂMICO E INSTITUCIONAL DO LAUDO */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft relative overflow-hidden">
        {/* Glow decorativo */}
        <div
          className={`absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-gradient-to-br ${primMeta.gradientFrom} ${primMeta.gradientTo} rounded-full blur-3xl opacity-15 pointer-events-none`}
        />

        {/* Topo Institucional */}
        <div className="border-b border-brand-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Psi Elaine Souza Logo"
              className="h-16 sm:h-20 w-auto object-contain shrink-0 mix-blend-multiply"
            />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                Laudo Psicológico de Perfil
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
                Relatório de Temperamento
              </h1>
            </div>
          </div>

          <div className="bg-rose-soft border border-brand-100 p-3 rounded-2xl text-left sm:text-right shrink-0">
            <span className="text-[11px] text-warm-700 block font-medium">Data do Preenchimento</span>
            <span className="text-xs font-bold text-brand-700">{dataFormatada}</span>
          </div>
        </div>

        {/* Informações Personalizadas do Usuário */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 p-4 rounded-2xl bg-warm-50/70 border border-warm-200/80">
          <div>
            <span className="text-[11px] text-warm-700 uppercase font-semibold block">Nome</span>
            <p className="text-sm font-bold text-warm-900 font-heading">{userName}</p>
          </div>
          <div>
            <span className="text-[11px] text-warm-700 uppercase font-semibold block">
              Temperamento Primário
            </span>
            <p className="text-sm font-bold text-brand-700 flex items-center gap-1.5 font-heading">
              <span>{report.emoji}</span>
              <span className="uppercase">{report.nome}</span>
            </p>
          </div>
          <div>
            <span className="text-[11px] text-warm-700 uppercase font-semibold block">
              Intensidade Mapeada
            </span>
            <p className="text-sm font-bold text-warm-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span>{intensidadeLaudo}</span>
              <span className="text-xs text-warm-700 font-normal">({primaryScore} pts)</span>
            </p>
          </div>
        </div>

        {/* Tagline / Frase de Impacto */}
        <div className="mt-6 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1 block">
            Perfil Comportamental
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-warm-900 font-heading">
            {report.emoji} {report.nome}: {report.tagline}
          </h2>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SUMÁRIO / NAVEGAÇÃO RÁPIDA ENTRE SEÇÕES (Oculta na Impressão) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 print:hidden">
        {[
          { id: 'parte1', label: '1. Quem você é', icon: Zap },
          { id: 'parte2', label: '2. Desenvolvimento', icon: Target },
          { id: 'parte3', label: '3. Relacionamento', icon: Heart },
          { id: 'parte4', label: '4. Próximos Passos', icon: Compass },
        ].map((sec) => {
          const Icon = sec.icon;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="p-3 rounded-2xl bg-white border border-brand-100 shadow-xs hover:border-brand-300 hover:bg-rose-soft/40 transition-all flex items-center gap-2 text-xs font-bold text-warm-900"
            >
              <Icon className="w-4 h-4 text-brand-600 shrink-0" />
              <span>{sec.label}</span>
            </a>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* PARTE 1: QUEM VOCÊ É? */}
      {/* ============================================================ */}
      <section
        id="parte1"
        className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft space-y-8"
      >
        {/* Header da Seção */}
        <div className="flex items-center gap-3 border-b border-brand-100 pb-4">
          <div className="w-10 h-10 rounded-2xl brand-gradient text-white flex items-center justify-center font-bold font-heading shadow-xs">
            1
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
              Parte 1 de 4
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
              Quem Você É?
            </h2>
          </div>
        </div>

        {/* O Temperamento em Essência */}
        <div className="bg-rose-soft/50 p-6 rounded-2xl border border-brand-100 space-y-3">
          <h3 className="text-base font-bold text-warm-900 font-heading flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            {report.parte1.essencia.titulo}
          </h3>
          <p className="text-sm font-semibold text-brand-900 leading-relaxed">
            {report.parte1.essencia.resumo}
          </p>
          <p className="text-sm text-warm-700 leading-relaxed">
            {report.parte1.essencia.descricao}
          </p>
        </div>

        {/* Como você processa o mundo */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-warm-900 font-heading">
            Como você processa o mundo
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(report.parte1.comoProcessaMundo).map(([key, bloco]) => (
              <div
                key={key}
                className="p-4 rounded-2xl bg-white border border-warm-200 shadow-xs space-y-2.5"
              >
                <h4 className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                  {bloco.titulo}
                </h4>
                <ul className="space-y-1.5">
                  {bloco.itens.map((item, idx) => (
                    <li key={idx} className="text-xs text-warm-700 flex items-start gap-2">
                      <span className="text-brand-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Principais Pontos Fortes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-warm-900 font-heading">
              Seus 5 Principais Pontos Fortes
            </h3>
          </div>

          <div className="space-y-3">
            {report.parte1.pontosFortes.map((forte, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-emerald-950 font-heading">
                    {forte.titulo}
                  </h4>
                </div>
                <p className="text-xs text-warm-700 leading-relaxed pl-7">{forte.descricao}</p>
                <div className="pl-7 pt-1">
                  <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                    ✨ Onde brilha: {forte.ondeBrilha}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Principais Desafios */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-warm-900 font-heading">
              Seus 5 Principais Desafios
            </h3>
          </div>
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900">
            <strong>Importante:</strong> Estes NÃO são defeitos. São desequilíbrios naturais do seu
            temperamento que, sem autoconsciência, podem desgastar relacionamentos e oportunidades.
          </div>

          <div className="space-y-3">
            {report.parte1.desafios.map((desafio, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-amber-50/30 border border-amber-200/70 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-amber-950 font-heading">
                    {desafio.titulo}
                  </h4>
                </div>
                <p className="text-xs text-warm-700 leading-relaxed pl-7">{desafio.descricao}</p>
                <div className="pl-7 space-y-1 text-[11px]">
                  <p className="text-rose-900">
                    <strong>⚠️ Onde prejudica:</strong> {desafio.ondePrejudica}
                  </p>
                  <p className="text-amber-900 bg-amber-100/60 p-1.5 rounded-md">
                    <strong>🚨 Sinal de alerta:</strong> {desafio.sinalAlerta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PARTE 2: SEU DESENVOLVIMENTO PESSOAL */}
      {/* ============================================================ */}
      <section
        id="parte2"
        className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft space-y-8"
      >
        {/* Header da Seção */}
        <div className="flex items-center gap-3 border-b border-brand-100 pb-4">
          <div className="w-10 h-10 rounded-2xl brand-gradient text-white flex items-center justify-center font-bold font-heading shadow-xs">
            2
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
              Parte 2 de 4
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
              Seu Desenvolvimento Pessoal
            </h2>
          </div>
        </div>

        {/* 3 Virtudes Essenciais */}
        <div className="space-y-6">
          <h3 className="text-base font-bold text-warm-900 font-heading flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-600" />
            As 3 Virtudes Essenciais Para Você Desenvolver
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {report.parte2.virtudes.map((virtude) => (
              <div
                key={virtude.numero}
                className="p-6 rounded-3xl border border-brand-100 bg-rose-soft/30 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{virtude.emoji}</span>
                  <div>
                    <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">
                      Virtude {virtude.numero}
                    </span>
                    <h4 className="text-lg font-bold text-warm-900 font-heading">
                      {virtude.titulo}
                    </h4>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-brand-100 text-xs text-warm-800 leading-relaxed">
                  <strong>Por que é essencial:</strong> {virtude.porQueEssencial}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* O que significa */}
                  <div className="p-4 bg-white rounded-2xl border border-warm-200 space-y-2">
                    <span className="text-xs font-bold text-brand-700 uppercase tracking-wider block">
                      O que significa:
                    </span>
                    <ul className="space-y-1 text-xs text-warm-700">
                      {virtude.oQueSignifica.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-brand-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Como saber que está desenvolvendo */}
                  <div className="p-4 bg-white rounded-2xl border border-warm-200 space-y-2">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                      Como saber que está desenvolvendo:
                    </span>
                    <ul className="space-y-1 text-xs text-warm-700">
                      {virtude.comoSaber.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 12 Atividades Práticas / Plano de 5 Meses */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-bold text-warm-900 font-heading">
              12 Atividades Práticas Para Seu Desenvolvimento (~5 Meses)
            </h3>
          </div>

          <div className="space-y-6">
            {report.parte2.planoDesenvolvimento.map((blocoMes) => (
              <div
                key={blocoMes.mesNumero}
                className="border border-warm-200 rounded-3xl p-5 bg-warm-50/40 space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-bold">
                    MÊS {blocoMes.mesNumero}
                  </span>
                  <h4 className="text-sm font-bold text-warm-900 font-heading">
                    {blocoMes.tituloMes}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {blocoMes.atividades.map((ativ, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white rounded-2xl border border-warm-200/80 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-brand-600">
                          {ativ.periodo}
                        </span>
                        {ativ.duracaoOuFrequencia && (
                          <span className="text-[10px] bg-rose-soft text-brand-800 px-2 py-0.5 rounded-full font-medium">
                            ⏱️ {ativ.duracaoOuFrequencia}
                          </span>
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-warm-900">{ativ.titulo}</h5>
                      <p className="text-xs text-warm-700 leading-relaxed">{ativ.descricao}</p>
                      <div className="pt-1 text-[11px] text-emerald-800 font-medium">
                        🎯 <strong>Meta:</strong> {ativ.meta}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PARTE 3: VOCÊ NO RELACIONAMENTO */}
      {/* ============================================================ */}
      <section
        id="parte3"
        className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft space-y-8"
      >
        {/* Header da Seção */}
        <div className="flex items-center gap-3 border-b border-brand-100 pb-4">
          <div className="w-10 h-10 rounded-2xl brand-gradient text-white flex items-center justify-center font-bold font-heading shadow-xs">
            3
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
              Parte 3 de 4
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
              Você no Relacionamento 💕
            </h2>
          </div>
        </div>

        {/* Sua Forma de Amar */}
        <div className="bg-rose-soft/40 p-6 rounded-2xl border border-brand-100 space-y-4">
          <h3 className="text-base font-bold text-warm-900 font-heading flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-600" />
            {report.parte3.formaDeAmar.titulo}
          </h3>
          <p className="text-xs text-warm-800 font-medium leading-relaxed">
            {report.parte3.formaDeAmar.descricao}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {report.parte3.formaDeAmar.ladoLuminoso.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl border border-brand-100 text-xs text-warm-800 flex items-start gap-2"
              >
                <span className="text-emerald-600 font-bold">✅</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white/90 rounded-2xl border border-rose-200 text-xs text-rose-950 leading-relaxed">
            <strong>❌ O lado difícil:</strong> {report.parte3.formaDeAmar.ladoDificil}
          </div>
        </div>

        {/* Padrões de Conflito */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-warm-900 font-heading">
              Seus Padrões de Conflito Típicos ⚔️
            </h3>
          </div>

          <div className="space-y-3">
            {report.parte3.padroesConflito.map((conflito) => (
              <div
                key={conflito.numero}
                className="p-4 rounded-2xl bg-white border border-warm-200 shadow-xs space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold text-xs">
                    Padrão {conflito.numero}
                  </span>
                  <h4 className="text-xs font-bold text-warm-900">{conflito.titulo}</h4>
                </div>
                <p className="text-xs text-warm-700 leading-relaxed">{conflito.descricao}</p>
                <div className="p-2.5 rounded-xl bg-warm-50 border border-warm-200 text-[11px] text-warm-800 italic">
                  <strong>Exemplo prático:</strong> {conflito.exemplo}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* O Que Seu Parceiro Precisa Saber Sobre Você */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-600" />
              <h3 className="text-base font-bold text-warm-900 font-heading">
                O Que Seu Parceiro Precisa Saber Sobre Você 🛑
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-brand-600 bg-rose-soft px-2.5 py-1 rounded-full">
              Leiam Juntos
            </span>
          </div>

          <div className="space-y-3">
            {report.parte3.oQueParceiroPrecisaSaber.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-rose-soft/30 border border-brand-100 space-y-2"
              >
                <h4 className="text-xs font-bold text-brand-900">💡 {item.topico}</h4>
                <p className="text-xs text-warm-700">{item.explicacao}</p>
                <div className="p-3 bg-white rounded-xl border border-brand-200 text-xs text-brand-900 font-medium">
                  <strong>O que ele(a) precisa saber:</strong> &ldquo;{item.fraseParaOParceiro}
                  &rdquo;
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10 Ações Concretas Para Melhorar o Relacionamento */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-warm-900 font-heading flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            10 Ações Concretas Para Melhorar Seu Relacionamento ✅
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {report.parte3.acoesConcretas.map((acao) => (
              <div
                key={acao.numero}
                className="p-4 rounded-2xl bg-white border border-warm-200 shadow-xs space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {acao.numero}
                  </span>
                  <h4 className="text-xs font-bold text-warm-900">{acao.titulo}</h4>
                </div>
                <p className="text-xs text-warm-700 leading-relaxed pl-7">{acao.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compatibilidade com Outros Temperamentos */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-bold text-warm-900 font-heading">
              Compatibilidade: {report.nome} com Outros Temperamentos 🤝
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.parte3.compatibilidade.map((comp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-brand-100 shadow-xs space-y-2.5"
              >
                <h4 className="text-xs font-bold text-brand-700 font-heading">{comp.titulo}</h4>
                <div className="space-y-1.5 text-xs">
                  <p className="text-emerald-900">
                    <strong>✅ Pontos fortes:</strong> {comp.pontosPositivos}
                  </p>
                  <p className="text-rose-900">
                    <strong>❌ Desafios:</strong> {comp.pontosAtencao}
                  </p>
                  <p className="text-warm-800 bg-rose-soft/60 p-2 rounded-xl text-[11px]">
                    <strong>💡 Dica de convivência:</strong> {comp.dica}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PARTE 4: SEUS PRÓXIMOS PASSOS */}
      {/* ============================================================ */}
      <section
        id="parte4"
        className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft space-y-8"
      >
        {/* Header da Seção */}
        <div className="flex items-center gap-3 border-b border-brand-100 pb-4">
          <div className="w-10 h-10 rounded-2xl brand-gradient text-white flex items-center justify-center font-bold font-heading shadow-xs">
            4
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
              Parte 4 de 4
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
              Seus Próximos Passos 🚀
            </h2>
          </div>
        </div>

        {/* Linha do tempo de 2 e 4 semanas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Próximas 2 Semanas */}
          <div className="p-5 rounded-2xl bg-rose-soft/40 border border-brand-100 space-y-3">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block">
              Nas Próximas 2 Semanas
            </span>
            <ul className="space-y-2">
              {report.parte4.proximosPassos.duasSemanas.map((passo, idx) => (
                <li key={idx} className="text-xs text-warm-800 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{passo}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Próximas 4 Semanas */}
          <div className="p-5 rounded-2xl bg-warm-50 border border-warm-200 space-y-3">
            <span className="text-xs font-bold text-warm-700 uppercase tracking-wider block">
              Nas Próximas 4 Semanas
            </span>
            <ul className="space-y-2">
              {report.parte4.proximosPassos.quatroSemanas.map((passo, idx) => (
                <li key={idx} className="text-xs text-warm-800 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-warm-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{passo}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mensagem Final Assinada */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-50/80 via-white to-rose-soft/50 border border-brand-200 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            <h3 className="text-sm font-bold text-warm-900 uppercase tracking-wider font-heading">
              Mensagem da Sua Mentora
            </h3>
          </div>

          <blockquote className="text-xs sm:text-sm text-warm-900 leading-relaxed italic border-l-2 border-brand-400 pl-4 py-1">
            &ldquo;{report.parte4.mensagemFinal}&rdquo;
          </blockquote>

          {/* Assinatura Dinâmica Configurável */}
          <div className="pt-4 border-t border-brand-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full brand-gradient text-white font-bold flex items-center justify-center text-sm font-heading shadow-xs">
                {mentor.nome
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-xs font-bold text-warm-900">{mentor.nome}</p>
                <p className="text-[11px] text-warm-700">{mentor.titulo}</p>
                {mentor.registro && (
                  <p className="text-[10px] text-warm-700 font-medium">{mentor.registro}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Mentoria Individual Validada</span>
            </div>
          </div>
        </div>

        {/* Apêndice: Recursos Recomendados */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-warm-900 font-heading flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-600" />
            Apêndice: Recursos e Sinais de Progresso
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Livros Recomendados */}
            <div className="p-4 bg-white rounded-2xl border border-warm-200 space-y-2">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider block">
                📚 Livros Recomendados
              </span>
              <ul className="space-y-2 text-xs text-warm-800">
                {report.parte4.recursos.livrosRecomendados.map((livro, idx) => (
                  <li key={idx}>
                    <p className="font-semibold">&ldquo;{livro.titulo}&rdquo;</p>
                    <p className="text-[11px] text-warm-700">{livro.autor}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exercícios Complementares */}
            <div className="p-4 bg-white rounded-2xl border border-warm-200 space-y-2">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider block">
                🧘 Exercícios Complementares
              </span>
              <ul className="space-y-1.5 text-xs text-warm-700">
                {report.parte4.recursos.exerciciosComplementares.map((ex, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-brand-500">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sinais de Progresso */}
            <div className="p-4 bg-white rounded-2xl border border-warm-200 space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                🌱 Sinais de Progresso
              </span>
              <ul className="space-y-1.5 text-xs text-warm-700">
                {report.parte4.recursos.sinaisProgresso.map((sinal, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{sinal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RODAPÉ DE AÇÕES (Oculta na Impressão) */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 border border-brand-100 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <h3 className="text-sm font-bold text-warm-900 font-heading">
            Deseja revisar seus outros diagnósticos?
          </h3>
          <p className="text-xs text-warm-700">
            Acompanhe seu progresso e acesse a biblioteca completa da mentoria.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/historico"
            className="px-4 py-2.5 rounded-xl bg-warm-100 text-warm-800 text-xs font-bold hover:bg-warm-200 transition-all inline-flex items-center gap-1.5"
          >
            <span>Ver Todos os Diagnósticos</span>
          </Link>
          <Link
            href="/biblioteca"
            className="px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Biblioteca</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
