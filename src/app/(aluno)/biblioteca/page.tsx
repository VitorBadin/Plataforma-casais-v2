'use client';

import React, { useState } from 'react';
import { INITIAL_RESOURCES } from '@/lib/mockData';
import { ResourceItem } from '@/types/database';
import { BookOpen, Search, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

export default function BibliotecaPage() {
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Todos', 'Ebooks', 'Guias Práticos', 'Exercícios & Planners'];

  const filtered = resources.filter((res) => {
    const matchesCat = selectedCategory === 'Todos' || res.categoria === selectedCategory;
    const matchesSearch = res.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.descricao.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleResourceAccess = (id: string) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, visualizado: true } : r));
  };

  return (
    <div className="space-y-6">
      {/* Header da Biblioteca */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 mb-1">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Acervo Exclusivo</span>
            </div>
            <h1 className="text-2xl font-bold text-warm-900 font-heading">
              Biblioteca de Materiais
            </h1>
            <p className="text-xs text-warm-700 mt-0.5">
              Ebooks, guias práticos em PDF e ferramentas de apoio selecionados para a mentoria.
            </p>
          </div>

          {/* Campo de Busca */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-warm-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar material por nome..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-warm-700/60"
            />
          </div>
        </div>

        {/* Abas de Categorias */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium border-t border-warm-100 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'brand-gradient text-white font-bold shadow-sm'
                  : 'bg-rose-soft text-warm-700 hover:bg-rose-soft/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Materiais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-3xl p-6 border border-brand-100 shadow-card hover:shadow-soft-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                  {res.categoria}
                </span>

                {res.visualizado ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Lido
                  </span>
                ) : (
                  <span className="text-[11px] text-warm-700 font-medium">{res.tamanho || 'PDF'}</span>
                )}
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-soft text-brand-600 flex items-center justify-center shrink-0 border border-brand-100">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-warm-900 font-heading leading-snug">
                  {res.titulo}
                </h3>
              </div>

              <p className="text-xs text-warm-700 leading-relaxed line-clamp-3 mb-4">
                {res.descricao}
              </p>
            </div>

            <div className="pt-3 border-t border-warm-100 flex items-center gap-2">
              <a
                href={res.arquivo_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleResourceAccess(res.id)}
                className="flex-1 py-2.5 px-4 rounded-xl brand-gradient text-white text-xs font-bold shadow-xs hover:opacity-95 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visualizar / Baixar PDF</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
