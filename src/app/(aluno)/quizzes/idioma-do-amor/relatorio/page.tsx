'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { IDIOMA_AMOR_META } from '@/lib/idiomaAmorData';
import {
  getLoveLanguageReport,
  getDynamicSecondarySnippet,
} from '@/lib/idiomaAmorReportsData';
import { IdiomaAmorResult, IdiomaAmor } from '@/types/idiomaAmorTypes';
import {
  Heart,
  ArrowLeft,
  Printer,
  Sparkles,
  ShieldCheck,
  Award,
  BarChart3,
  CheckCircle2,
  FileText,
  Quote,
  Flame,
  Users,
  MessageCircle,
  Lightbulb,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';
import SpouseQuizSummaryCard from '@/components/SpouseQuizSummaryCard';
import LoveLanguageCoupleSection from '@/components/LoveLanguageCoupleSection';

export default function IdiomaAmorRelatorioPage() {
  const { user, getSpouse } = useAuth();
  const [resultado, setResultado] = useState<IdiomaAmorResult | null>(null);

  const spouse = user ? getSpouse(user.id) || getSpouse(user.user_id) : null;
  const spouseName = spouse ? spouse.nome : 'Não vinculado';

  useEffect(() => {
    if (!user) return;
    const storageKey = `psi_idioma_amor_result_${user.id}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setResultado(JSON.parse(stored));
      } catch {
        setResultado(null);
      }
    } else {
      // Fallback padrão demonstrativo para visualização direta caso acesse a rota sem ter feito o quiz
      const fallback: IdiomaAmorResult = {
        id: 'idioma-preview',
        user_id: user?.id || 'anon',
        idioma_primario: 'tempo',
        idioma_secundario: 'palavras',
        pontuacoes: {
          tempo: 7,
          palavras: 5,
          servico: 4,
          toque: 3,
          presentes: 1,
        },
        percentuais: {
          tempo: 35,
          palavras: 25,
          servico: 20,
          toque: 15,
          presentes: 5,
        },
        distribuicao_ordenada: [
          { idioma: 'tempo', label: 'Tempo de Qualidade', emoji: '⏳', pontos: 7, percentual: 35 },
          { idioma: 'palavras', label: 'Palavras de Afirmação', emoji: '💬', pontos: 5, percentual: 25 },
          { idioma: 'servico', label: 'Atos de Serviço', emoji: '🛠️', pontos: 4, percentual: 20 },
          { idioma: 'toque', label: 'Toque Físico', emoji: '🫂', pontos: 3, percentual: 15 },
          { idioma: 'presentes', label: 'Receber Presentes', emoji: '🎁', pontos: 1, percentual: 5 },
        ],
        frase_resumo: 'Seu idioma primário é Tempo de Qualidade (35%) com segundo destaque em Palavras de Afirmação (25%)',
        calculado_em: new Date().toISOString(),
      };
      setResultado(fallback);
    }
  }, [user]);

  if (!resultado) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <Heart className="w-12 h-12 text-warm-700 mx-auto opacity-50" />
        <p className="text-warm-700 font-medium">Carregando relatório...</p>
      </div>
    );
  }

  const primaryType: IdiomaAmor = resultado.idioma_primario;
  const secondaryType: IdiomaAmor = resultado.idioma_secundario;
  const primMeta = IDIOMA_AMOR_META[primaryType];
  const secMeta = IDIOMA_AMOR_META[secondaryType];
  const report = getLoveLanguageReport(primaryType);
  const secondarySnippet = getDynamicSecondarySnippet(
    primaryType,
    secondaryType,
    resultado.percentuais[secondaryType]
  );

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
      {/* Barra de Navegação Superior (Oculta na impressão) */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <Link
            href="/quizzes/idioma-do-amor/resultado"
            className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Resumo</span>
          </Link>
          <span className="text-warm-300">|</span>
          <Link
            href="/historico"
            className="text-xs text-warm-700 hover:text-brand-600 font-semibold"
          >
            Meus Diagnósticos
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/quizzes/idioma-do-amor"
            className="px-3.5 py-2 rounded-xl bg-white border border-warm-200 text-warm-700 hover:bg-warm-50 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Refazer Teste
          </Link>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Salvar PDF</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CABEÇALHO DO LAUDO PSICOLÓGICO */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft relative overflow-hidden space-y-8">
        {/* Topo Institucional */}
        <div className="border-b border-brand-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Psi Elaine Souza Logo"
              className="h-16 sm:h-20 w-auto object-contain shrink-0 mix-blend-multiply"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                <Heart className="w-3 h-3 fill-pink-500" />
                <span>Seu Resultado Personalizado</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
                TESTE IDIOMAS DO AMOR — CASAMENTO CONECTADO
              </h1>
              <p className="text-xs text-warm-700 mt-0.5">
                Com Elaine Souza — Psicóloga Especialista em Relacionamentos e Criadora do Método Casamento de Alta Performance
              </p>
            </div>
          </div>

          <div className="bg-rose-soft/80 border border-brand-100 p-3.5 rounded-2xl text-left sm:text-right shrink-0">
            <span className="text-[11px] text-warm-700 block font-medium">Data da Avaliação</span>
            <span className="text-xs font-bold text-brand-700 block">{dataFormatada}</span>
            <span className="text-[10px] text-warm-600 block mt-0.5">Mentoria Individual</span>
          </div>
        </div>

        {/* Carta de Abertura e Metadados do Casal */}
        <div className="space-y-4 text-warm-800 text-sm leading-relaxed">
          <p className="font-semibold text-warm-900 text-base">
            Prezado(a) <span className="text-brand-700">{userName}</span>,
          </p>
          <p>
            Este é o seu resultado exclusivo do Teste Idiomas do Amor da mentoria &ldquo;Casamento Conectado&rdquo; com Elaine Souza. Este material foi desenvolvido especialmente para você e seu(sua) cônjuge compreenderem como vocês expressam e recebem amor.
          </p>

          {/* Tabela de Identificação */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-warm-50/80 border border-warm-200/80 text-xs">
            <div className="space-y-1.5">
              <div>
                <span className="text-warm-600 font-medium">Participante: </span>
                <strong className="text-warm-900 font-bold">{userName}</strong>
              </div>
              <div>
                <span className="text-warm-600 font-medium">Cônjuge: </span>
                <strong className="text-warm-900 font-bold">{spouseName}</strong>
              </div>
            </div>
            <div className="space-y-1.5">
              <div>
                <span className="text-warm-600 font-medium">Data do Teste: </span>
                <strong className="text-warm-900 font-bold">{dataFormatada}</strong>
              </div>
              <div>
                <span className="text-warm-600 font-medium">Mentoria: </span>
                <strong className="text-warm-900 font-bold">Casamento Conectado — Elaine Souza</strong>
              </div>
            </div>
          </div>

          {/* Frase de Destaque da Mentoria */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border border-pink-200/80 flex items-start gap-3">
            <Quote className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
            <p className="italic text-xs sm:text-sm text-warm-900 font-medium leading-relaxed">
              &ldquo;O casamento é sagrado, pode ser leve e prazeroso, e exige construção e intencionalidade.&rdquo;
              <span className="block not-italic font-bold text-pink-700 mt-1">— Elaine Souza</span>
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BANNER SEUS IDIOMAS DO AMOR (PRIMÁRIO E SECUNDÁRIO) */}
        {/* ============================================================ */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-pink-600 via-rose-600 to-purple-700 text-white space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs">
              Seus Idiomas do Amor Mapeados
            </span>
            <span className="text-xs text-white/80">Base: 20 Cenários Práticos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1">
              <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider block">
                Idioma Primário
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-black font-heading flex items-center gap-2">
                  <span>{primMeta.emoji}</span>
                  <span>{primMeta.label}</span>
                </span>
                <span className="text-2xl font-black bg-white text-pink-700 px-2.5 py-0.5 rounded-xl shadow-xs">
                  {resultado.percentuais[primaryType]}%
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1">
              <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider block">
                Idioma Secundário
              </span>
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl font-bold font-heading flex items-center gap-2">
                  <span>{secMeta.emoji}</span>
                  <span>{secMeta.label}</span>
                </span>
                <span className="text-xl font-bold bg-white/90 text-purple-800 px-2.5 py-0.5 rounded-xl">
                  {resultado.percentuais[secondaryType]}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PARTE 1 — O QUE SIGNIFICA O IDIOMA PRIMÁRIO PARA VOCÊ */}
        {/* ============================================================ */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2.5 pb-2 border-b border-warm-200">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              O que significa {primMeta.label} para você:
            </h2>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/60 border border-brand-200 relative">
            <Quote className="w-6 h-6 text-brand-400 absolute top-4 right-4 opacity-40 pointer-events-none" />
            <p className="text-sm sm:text-base text-warm-900 font-medium leading-relaxed italic">
              &ldquo;{report.oQueSignifica}&rdquo;
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PARTE 2 — COMO VOCÊ SENTE AMOR ATRAVÉS DESTE IDIOMA */}
        {/* ============================================================ */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-warm-200">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Como você sente amor através de {primMeta.label}:
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {report.comoSenteAmor.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-warm-200 hover:border-pink-300 transition-all shadow-2xs"
              >
                <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-3.5 h-3.5 fill-pink-500" />
                </div>
                <p className="text-xs sm:text-sm text-warm-800 leading-relaxed font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* PARTE 3 — COMPORTAMENTOS QUE VOCÊ NATURALMENTE DEMONSTRA */}
        {/* ============================================================ */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-warm-200">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              Comportamentos que você naturalmente demonstra:
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {report.comportamentosDemonstra.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-soft/40 border border-brand-100 hover:border-brand-200 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-warm-800 leading-relaxed font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* PARTE 4 — SEÇÃO DINÂMICA DO IDIOMA SECUNDÁRIO */}
        {/* ============================================================ */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2.5 pb-2 border-b border-warm-200">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              {secondarySnippet.titulo}
            </h2>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50/60 to-rose-50 border-2 border-purple-200 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{secMeta.emoji}</span>
              <div>
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block">
                  Idioma de Apoio Conectado
                </span>
                <h3 className="text-base sm:text-lg font-bold text-warm-900">
                  {secMeta.label} ({resultado.percentuais[secondaryType]}%)
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-warm-800 leading-relaxed font-medium">
              {secondarySnippet.paragrafo1}
            </p>

            {/* Caixa de Síntese de Combinação */}
            <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 block">
                Sua Fórmula Psicológica de Afeto:
              </span>
              <p className="text-xs sm:text-sm text-warm-900 font-bold leading-relaxed">
                {secondarySnippet.paragrafo2}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="px-3 py-1 rounded-xl bg-pink-100 text-pink-800 text-xs font-bold">
                  {secondarySnippet.necessidadePrimaria} ({primMeta.label})
                </span>
                <span className="text-warm-400 font-bold">+</span>
                <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-800 text-xs font-bold">
                  {secondarySnippet.necessidadeSecundaria} ({secMeta.label})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PARTE 5 — A IMPORTÂNCIA DO SEU IDIOMA (REFLEXÃO CLÍNICA) */}
        {/* ============================================================ */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2.5 pb-2 border-b border-warm-200">
            <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
              5
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              A importância do seu idioma:
            </h2>
          </div>

          <div className="p-6 rounded-3xl bg-warm-50/90 border border-warm-200 text-warm-900 text-xs sm:text-sm leading-relaxed space-y-3">
            <p className="whitespace-pre-line leading-relaxed font-medium">
              {report.importanciaIdioma}
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DISTRIBUIÇÃO COMPLETA DAS 5 LINGUAGENS */}
        {/* ============================================================ */}
        <div className="p-5 rounded-3xl bg-rose-soft/60 border border-brand-100 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-warm-900">
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-brand-600" />
              Mapeamento Completo das 5 Linguagens
            </span>
            <span className="text-warm-700 font-medium">Soma: 100%</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {resultado.distribuicao_ordenada.map((item) => {
              const meta = IDIOMA_AMOR_META[item.idioma];
              const isPrimario = item.idioma === primaryType;
              const isSecundario = item.idioma === secondaryType;

              return (
                <div
                  key={item.idioma}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    isPrimario
                      ? `${meta.bgLight} ${meta.borderColor} font-bold ring-2 ring-pink-300 shadow-xs`
                      : isSecundario
                      ? 'bg-purple-50/70 border-purple-200 font-semibold'
                      : 'bg-white border-warm-200'
                  }`}
                >
                  <span className="text-2xl block mb-1">{item.emoji}</span>
                  <span className="text-[11px] font-bold text-warm-900 block truncate">
                    {item.label}
                  </span>
                  <span className={`text-xs font-black ${meta.textColor} block mt-0.5`}>
                    {item.percentual}%
                  </span>
                  <span className="text-[10px] text-warm-600 block">
                    {item.pontos} {item.pontos === 1 ? 'pt' : 'pts'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assinatura da Psicóloga */}
        <div className="pt-6 border-t border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-rose-soft/40 p-5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm font-heading shadow-xs">
              ES
            </div>
            <div>
              <p className="text-xs font-bold text-warm-900">Psi Elaine Souza</p>
              <p className="text-[11px] text-warm-700">
                Psicóloga Clínica e Especialista em Casais • Método Casamento de Alta Performance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Documento emitido individualmente para {userName}</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* VÍNCULO DE CASAL — RESULTADO DO CÔNJUGE & 25 COMBINAÇÕES */}
      {/* ============================================================ */}
      <LoveLanguageCoupleSection userPrimaryLanguage={resultado.idioma_primario} />
    </div>
  );
}
