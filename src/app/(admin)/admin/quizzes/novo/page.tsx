'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getStoredQuizzes, saveStoredQuizzes } from '@/lib/mockData';
import { Quiz, Question, DiagnosticRule, TipoPergunta } from '@/types/database';
import { ArrowLeft, Plus, Trash2, Save, FileCheck2, Sparkles } from 'lucide-react';

export default function NovoQuizPage() {
  const router = useRouter();

  // Dados do Quiz
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('Comunicação');

  // Lista de Perguntas
  const [questions, setQuestions] = useState<Partial<Question>[]>([
    {
      id: `q-new-1`,
      texto: 'Com que frequência você e seu/sua parceiro(a) conversam sobre sentimentos profundos?',
      tipo: 'escala',
      opcoes: [
        { valor: 1, texto: '1 - Raramente' },
        { valor: 3, texto: '3 - De vez em quando' },
        { valor: 5, texto: '5 - Frequentemente' },
      ],
      ordem: 1,
    },
  ]);

  // Regra de Diagnóstico
  const [ruleTitulo, setRuleTitulo] = useState('Nível de Alinhamento e Diálogo');
  const [ruleText, setRuleText] = useState('O resultado demonstra que o casal está em um momento de reconstrução do diálogo...');
  const [ruleMin, setRuleMin] = useState(1);
  const [ruleMax, setRuleMax] = useState(15);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: `q-new-${Date.now()}`,
        texto: '',
        tipo: 'escala',
        opcoes: [
          { valor: 1, texto: '1 - Discordo Totalmente' },
          { valor: 3, texto: '3 - Neutro' },
          { valor: 5, texto: '5 - Concordo Totalmente' },
        ],
        ordem: prev.length + 1,
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo) return alert('Por favor, informe o título do quiz.');

    const newQuizId = `quiz-${Date.now()}`;

    const formattedQuestions: Question[] = questions.map((q, idx) => ({
      id: q.id || `q-${idx}`,
      quiz_id: newQuizId,
      texto: q.texto || 'Pergunta sem título',
      tipo: (q.tipo as TipoPergunta) || 'escala',
      opcoes: q.opcoes || [],
      ordem: idx + 1,
    }));

    const newQuiz: Quiz = {
      id: newQuizId,
      titulo,
      descricao,
      categoria,
      ativo: true,
      criado_em: new Date().toISOString(),
      questions: formattedQuestions,
    };

    const currentQuizzes = getStoredQuizzes();
    const updated = [newQuiz, ...currentQuizzes];
    saveStoredQuizzes(updated);

    /*
      [EXPANSÃO FUTURA - SUPABASE PERSISTENCE]
      Aqui será disparada a gravação nas tabelas `quizzes`, `questions` e `diagnostic_rules` do Supabase.
    */

    alert('Quiz e Regra de Diagnóstico salvos com sucesso!');
    router.push('/admin/quizzes');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/admin/quizzes" className="inline-flex items-center gap-1.5 text-xs text-warm-700 hover:text-brand-600 font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Voltar para Lista de Quizzes
      </Link>

      <form onSubmit={handleSaveQuiz} className="space-y-6">
        {/* Card Informações Básicas */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-card space-y-4">
          <div className="flex items-center gap-2 text-brand-600">
            <FileCheck2 className="w-5 h-5" />
            <h2 className="text-lg font-bold text-warm-900 font-heading">
              Criar Novo Quiz de Mentoria
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
              Título do Quiz
            </label>
            <input
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Mapeamento de Linguagens de Conexão no Casamento"
              className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
                Categoria
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Comunicação">Comunicação</option>
                <option value="Intimidade & Afeto">Intimidade & Afeto</option>
                <option value="Projeto de Vida">Projeto de Vida</option>
                <option value="Resolução de Conflitos">Resolução de Conflitos</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
                Descrição do Quiz
              </label>
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Breve resumo orientador para o aluno..."
                className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Construtor de Perguntas */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-warm-900 font-heading">
              Perguntas do Quiz ({questions.length})
            </h3>

            <button
              type="button"
              onClick={addQuestion}
              className="px-3.5 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Pergunta</span>
            </button>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div key={q.id || idx} className="p-4 rounded-2xl bg-rose-soft/60 border border-brand-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-700">Pergunta {idx + 1}</span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(idx)}
                      className="text-rose-600 hover:text-rose-800 text-xs font-semibold"
                    >
                      Remover
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  required
                  value={q.texto || ''}
                  onChange={(e) => handleQuestionChange(idx, 'texto', e.target.value)}
                  placeholder="Digite o enunciado da pergunta..."
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-white text-warm-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />

                <div className="w-full sm:w-64">
                  <label className="block text-[11px] font-semibold text-warm-700 mb-1">Tipo de Pergunta</label>
                  <select
                    value={q.tipo || 'escala'}
                    onChange={(e) => handleQuestionChange(idx, 'tipo', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-warm-200 bg-white text-warm-900 text-xs"
                  >
                    <option value="escala">Escala 1 a 5 (Intensidade)</option>
                    <option value="multipla_escolha">Múltipla Escolha</option>
                    <option value="texto">Texto Discursivo Livre</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cadastro de Regra de Diagnóstico Automático */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-card space-y-4">
          <div className="flex items-center gap-2 text-brand-600">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-base font-bold text-warm-900 font-heading">
              Regra de Diagnóstico Personalizado
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
                Pontuação Mínima
              </label>
              <input
                type="number"
                value={ruleMin}
                onChange={(e) => setRuleMin(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
                Pontuação Máxima
              </label>
              <input
                type="number"
                value={ruleMax}
                onChange={(e) => setRuleMax(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
              Título do Resultado
            </label>
            <input
              type="text"
              value={ruleTitulo}
              onChange={(e) => setRuleTitulo(e.target.value)}
              placeholder="Ex: Comunicação com Pontos de Vulnerabilidade"
              className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
              Texto Clínico do Diagnóstico (com orientações da Dra. Elaine)
            </label>
            <textarea
              rows={4}
              value={ruleText}
              onChange={(e) => setRuleText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl brand-gradient text-white font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Salvar Quiz e Publicar na Mentoria</span>
        </button>
      </form>
    </div>
  );
}
