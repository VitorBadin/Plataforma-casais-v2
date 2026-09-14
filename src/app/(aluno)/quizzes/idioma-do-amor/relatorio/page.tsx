'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { IDIOMA_AMOR_META } from '@/lib/idiomaAmorData';
import { IdiomaAmorResult, IdiomaAmor } from '@/types/idiomaAmorTypes';
import {
  Heart,
  ArrowLeft,
  Printer,
  Sparkles,
  ShieldCheck,
  Clock,
  BookOpen,
  Award,
  BarChart3,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  Users,
  Compass,
} from 'lucide-react';

export default function IdiomaAmorRelatorioPage() {
  const { user } = useAuth();
  const [resultado, setResultado] = useState<IdiomaAmorResult | null>(null);

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
        <p className="text-warm-700">Carregando relatório...</p>
      </div>
    );
  }

  const primaryType: IdiomaAmor = resultado.idioma_primario;
  const secondaryType: IdiomaAmor = resultado.idioma_secundario;
  const primMeta = IDIOMA_AMOR_META[primaryType];
  const secMeta = IDIOMA_AMOR_META[secondaryType];
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

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir / Salvar PDF</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* CABEÇALHO DO LAUDO PSICOLÓGICO */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft relative overflow-hidden space-y-6">
        <div className="border-b border-brand-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Psi Elaine Souza Logo"
              className="h-14 sm:h-16 w-auto object-contain shrink-0 mix-blend-multiply"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                <Heart className="w-3 h-3 fill-pink-500" />
                <span>Laudo Psicológico Individual</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-warm-900 font-heading">
                Relatório de Linguagens do Amor
              </h1>
              <p className="text-xs text-warm-700">
                Mentoria de Casais & Autoconhecimento — Dra. Elaine Souza
              </p>
            </div>
          </div>

          <div className="bg-rose-soft/80 border border-brand-100 p-3.5 rounded-2xl text-left sm:text-right shrink-0">
            <span className="text-[11px] text-warm-700 block font-medium">Paciente / Aluno(a)</span>
            <span className="text-xs font-bold text-warm-900 block">{userName}</span>
            <span className="text-[11px] text-warm-600 mt-0.5 block">{dataFormatada}</span>
          </div>
        </div>

        {/* Resumo do Perfil Identificado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Primário */}
          <div className={`p-5 rounded-2xl border-2 ${primMeta.borderColor} ${primMeta.bgLight} relative`}>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-warm-700 block mb-1">
              Idioma Primário Identificado
            </span>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{primMeta.emoji}</span>
              <h2 className={`text-xl font-bold font-heading ${primMeta.textColor}`}>
                {primMeta.label}
              </h2>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-2xl font-black font-heading ${primMeta.textColor}`}>
                {resultado.percentuais[primaryType]}%
              </span>
              <span className="text-xs text-warm-700 font-medium">
                ({resultado.pontuacoes[primaryType]} pontos em 20)
              </span>
            </div>
            <p className="text-xs text-warm-800 leading-relaxed">
              {primMeta.descricaoCurta}
            </p>
          </div>

          {/* Secundário */}
          <div className={`p-5 rounded-2xl border-2 ${secMeta.borderColor} bg-white relative shadow-xs`}>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-warm-700 block mb-1">
              Idioma Secundário (Apoio)
            </span>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{secMeta.emoji}</span>
              <h2 className={`text-lg font-bold font-heading ${secMeta.textColor}`}>
                {secMeta.label}
              </h2>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xl font-bold font-heading ${secMeta.textColor}`}>
                {resultado.percentuais[secondaryType]}%
              </span>
              <span className="text-xs text-warm-700 font-medium">
                ({resultado.pontuacoes[secondaryType]} pontos em 20)
              </span>
            </div>
            <p className="text-xs text-warm-800 leading-relaxed">
              {secMeta.descricaoCurta}
            </p>
          </div>
        </div>

        {/* Distribuição das 5 Linguagens */}
        <div className="p-4 rounded-2xl bg-warm-50/70 border border-warm-200/80 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-warm-900">
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-brand-600" />
              Mapeamento Completo das 5 Linguagens
            </span>
            <span className="text-warm-700 font-medium">Total: 100%</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {resultado.distribuicao_ordenada.map((item) => {
              const meta = IDIOMA_AMOR_META[item.idioma];
              return (
                <div
                  key={item.idioma}
                  className={`p-2.5 rounded-xl border text-center ${
                    item.idioma === primaryType
                      ? `${meta.bgLight} ${meta.borderColor} font-bold`
                      : 'bg-white border-warm-200'
                  }`}
                >
                  <span className="text-lg block">{item.emoji}</span>
                  <span className="text-[11px] font-semibold text-warm-900 block truncate">
                    {item.label}
                  </span>
                  <span className={`text-xs font-black ${meta.textColor}`}>
                    {item.percentual}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* AVISO TEMPORÁRIO — PARTE 2 EM PREPARAÇÃO */}
        {/* ============================================================ */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-pink-50 via-rose-50/60 to-purple-50 border-2 border-dashed border-pink-300 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-pink-200 flex items-center justify-center text-pink-600 mx-auto">
            <Clock className="w-7 h-7" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-pink-700 bg-pink-100/80 px-3 py-1 rounded-full inline-block">
              Relatório Completo em Preparação
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-warm-900 font-heading">
              O dossiê aprofundado para &ldquo;{primMeta.label}&rdquo; será liberado em breve!
            </h3>
            <p className="text-xs sm:text-sm text-warm-700 leading-relaxed">
              A Dra. Elaine Souza está finalizando a elaboração do conteúdo clínico personalizado de cada uma das 5 linguagens do amor (Parte 2). Assim que concluído, as diretrizes completas de convivência, dinâmica com o parceiro e exercícios práticos aparecerão automaticamente nesta página.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-pink-200 text-warm-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Seus dados e percentuais já estão salvos</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-pink-200 text-warm-800">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Acesso liberado a qualquer momento</span>
            </div>
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
              <p className="text-[11px] text-warm-700">
                Psicóloga Clínica e Especialista em Casais • CRP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Documento emitido individualmente</span>
          </div>
        </div>
      </div>
    </div>
  );
}
