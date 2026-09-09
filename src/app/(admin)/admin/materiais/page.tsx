'use client';

import React, { useState } from 'react';
import { INITIAL_RESOURCES } from '@/lib/mockData';
import { ResourceItem } from '@/types/database';
import { BookOpen, Upload, FileText, Trash2, ExternalLink, Plus } from 'lucide-react';

export default function AdminMateriaisPage() {
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('Ebooks');
  const [arquivoUrl, setArquivoUrl] = useState('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
  const [showForm, setShowForm] = useState(false);

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo) return;

    const newRes: ResourceItem = {
      id: `res-${Date.now()}`,
      titulo,
      descricao,
      categoria,
      arquivo_url: arquivoUrl,
      criado_em: new Date().toISOString(),
      tamanho: '2.5 MB',
      visualizado: false,
    };

    setResources((prev) => [newRes, ...prev]);

    /*
      [EXPANSÃO FUTURA - SUPABASE STORAGE UPLOAD]
      Aqui será utilizada a API `supabase.storage.from('materiais').upload(filename, file)`
      para enviar o arquivo PDF direto para o bucket public do Supabase.
    */

    setTitulo('');
    setDescricao('');
    setShowForm(false);
    alert('Material cadastrado com sucesso!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja remover este material da biblioteca?')) {
      setResources((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-card">
        <div>
          <div className="flex items-center gap-2 text-brand-600 mb-1">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Gestão do Acervo</span>
          </div>
          <h1 className="text-2xl font-bold text-warm-900 font-heading">
            Upload & Materiais (PDFs)
          </h1>
          <p className="text-xs text-warm-700 mt-0.5">
            Gerencie os arquivos digitais e ebooks disponibilizados para os alunos na biblioteca.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Fechar Formulário' : 'Novo Material'}</span>
        </button>
      </div>

      {/* Form de Upload */}
      {showForm && (
        <form onSubmit={handleAddMaterial} className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-warm-900 font-heading flex items-center gap-2">
            <Upload className="w-5 h-5 text-brand-600" />
            Cadastrar Novo Material (Supabase Storage Bucket: `materiais`)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
                Título do Material / Ebook
              </label>
              <input
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Ebook: As 5 Portas da Intimidade Emocional"
                className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
                Categoria
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Ebooks">Ebooks</option>
                <option value="Guias Práticos">Guias Práticos</option>
                <option value="Exercícios & Planners">Exercícios & Planners</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
              Descrição
            </label>
            <textarea
              rows={2}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Resumo do conteúdo abordado no material..."
              className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
              URL do PDF / File Storage URL
            </label>
            <input
              type="url"
              required
              value={arquivoUrl}
              onChange={(e) => setArquivoUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl brand-gradient text-white font-bold text-xs shadow-md hover:opacity-95 transition-all"
          >
            Publicar Material na Biblioteca
          </button>
        </form>
      )}

      {/* Grid de Materiais Cadastrados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-3xl p-6 border border-brand-100 shadow-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                  {res.categoria}
                </span>

                <button
                  onClick={() => handleDelete(res.id)}
                  className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                  title="Excluir material"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-start gap-3 mb-2">
                <FileText className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <h3 className="text-sm font-bold text-warm-900 font-heading">
                  {res.titulo}
                </h3>
              </div>

              <p className="text-xs text-warm-700 line-clamp-2 leading-relaxed mb-4">
                {res.descricao}
              </p>
            </div>

            <div className="pt-3 border-t border-warm-100 flex items-center justify-between">
              <span className="text-[11px] text-warm-700 font-medium">
                {new Date(res.criado_em).toLocaleDateString('pt-BR')}
              </span>

              <a
                href={res.arquivo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-600 hover:underline inline-flex items-center gap-1"
              >
                <span>Testar PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
