'use client';

import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_RESOURCES, getStoredResources, saveStoredResources } from '@/lib/mockData';
import { ResourceItem } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import {
  BookOpen,
  UploadCloud,
  FileText,
  Trash2,
  ExternalLink,
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  FileCheck,
  FileUp,
} from 'lucide-react';

interface UploadedFileState {
  name: string;
  size: string;
  url: string;
  path: string;
}

export default function AdminMateriaisPage() {
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('Ebooks');
  const [showForm, setShowForm] = useState(false);

  // Estados do upload de arquivo
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFileState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = getStoredResources();
    setResources(stored);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileProcess = async (file: File) => {
    setUploadError(null);

    // Validação de formato: apenas PDF
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setUploadError('Formato de arquivo inválido. Por favor, selecione apenas arquivos em formato PDF (.pdf).');
      return;
    }

    // Validação de tamanho: máximo 20 MB
    const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
    if (file.size > MAX_SIZE_BYTES) {
      const sizeFormatted = (file.size / (1024 * 1024)).toFixed(1);
      setUploadError(`Arquivo muito grande (${sizeFormatted} MB). O tamanho máximo permitido é de 20 MB.`);
      return;
    }

    const formattedSize = formatFileSize(file.size);
    setUploading(true);
    setUploadProgress(15);

    try {
      const supabase = createClient();

      if (supabase) {
        // Upload direto para o bucket 'materiais' no Supabase Storage
        const cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9_-]/g, '_');
        const fileName = `${Date.now()}_${cleanName}.pdf`;
        const filePath = fileName;

        setUploadProgress(45);

        const { data, error: uploadErr } = await supabase.storage
          .from('materiais')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadErr) {
          console.error('Erro no upload para Supabase Storage:', uploadErr);
          throw new Error(
            uploadErr.message || 'Falha no upload para o Supabase Storage. Verifique a permissão do bucket materiais.'
          );
        }

        setUploadProgress(85);

        // Obter URL pública gerada
        const { data: publicUrlData } = supabase.storage
          .from('materiais')
          .getPublicUrl(filePath);

        const publicUrl = publicUrlData?.publicUrl || '';
        setUploadProgress(100);

        setUploadedFile({
          name: file.name,
          size: formattedSize,
          url: publicUrl,
          path: filePath,
        });
      } else {
        // Fallback / Ambiente Mock local (quando envs do Supabase não estão preenchidas)
        setUploadProgress(45);
        await new Promise((r) => setTimeout(r, 400));
        setUploadProgress(85);
        await new Promise((r) => setTimeout(r, 300));
        setUploadProgress(100);

        const mockUrl = URL.createObjectURL(file);
        setUploadedFile({
          name: file.name,
          size: formattedSize,
          url: mockUrl,
          path: file.name,
        });
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro inesperado ao realizar o upload do arquivo.';
      setUploadError(errorMsg);
      setUploadedFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleRemoveUploadedFile = () => {
    setUploadedFile(null);
    setUploadError(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !uploadedFile) return;

    setIsSubmitting(true);

    try {
      const newRes: ResourceItem = {
        id: `res-${Date.now()}`,
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        categoria,
        arquivo_url: uploadedFile.url,
        criado_em: new Date().toISOString(),
        tamanho: uploadedFile.size,
        visualizado: false,
      };

      // Tenta gravar na tabela resources do Supabase se o client estiver ativo
      const supabase = createClient();
      if (supabase) {
        try {
          await supabase.from('resources').insert({
            titulo: newRes.titulo,
            descricao: newRes.descricao,
            categoria: newRes.categoria,
            arquivo_url: newRes.arquivo_url,
          });
        } catch (dbErr) {
          console.warn('Aviso: Não foi possível sincronizar na tabela resources do Supabase:', dbErr);
        }
      }

      const updated = [newRes, ...resources];
      setResources(updated);
      saveStoredResources(updated);

      // Limpa formulário
      setTitulo('');
      setDescricao('');
      setCategoria('Ebooks');
      setUploadedFile(null);
      setUploadProgress(0);
      setUploadError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setShowForm(false);
      alert('Material publicado com sucesso na biblioteca!');
    } catch (err) {
      console.error(err);
      alert('Erro ao publicar material.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja remover este material da biblioteca?')) {
      const updated = resources.filter((r) => r.id !== id);
      setResources(updated);
      saveStoredResources(updated);

      const supabase = createClient();
      if (supabase) {
        try {
          await supabase.from('resources').delete().eq('id', id);
        } catch (err) {
          console.warn('Aviso ao excluir no Supabase:', err);
        }
      }
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
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) handleRemoveUploadedFile();
          }}
          className="px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className={`w-4 h-4 transition-transform ${showForm ? 'rotate-45' : ''}`} />
          <span>{showForm ? 'Fechar Formulário' : 'Novo Material'}</span>
        </button>
      </div>

      {/* Form de Upload */}
      {showForm && (
        <form
          onSubmit={handleAddMaterial}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-soft space-y-5 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-warm-100 pb-3">
            <h3 className="text-base font-bold text-warm-900 font-heading flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-brand-600" />
              <span>Cadastrar Novo Material (Supabase Storage: Bucket `materiais`)</span>
            </h3>
            <span className="text-[11px] font-medium text-warm-700 bg-rose-soft px-2.5 py-1 rounded-full border border-brand-100">
              Apenas arquivos .PDF (até 20 MB)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
                Título do Material / Ebook <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Ebook: As 5 Portas da Intimidade Emocional"
                className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-warm-700/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-1">
                Categoria <span className="text-rose-500">*</span>
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
              className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-warm-700/50"
            />
          </div>

          {/* Campo de Upload de Arquivo com Drag and Drop */}
          <div>
            <label className="block text-xs font-semibold text-warm-900 uppercase tracking-wider mb-2">
              Arquivo PDF do Material <span className="text-rose-500">*</span>
            </label>

            {/* Hidden native input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleFileInputChange}
              disabled={uploading}
            />

            {!uploadedFile && !uploading && (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-brand-600 bg-brand-50/70 scale-[0.99]'
                    : 'border-warm-200 hover:border-brand-400 bg-rose-soft/30 hover:bg-rose-soft/60'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center shadow-xs">
                    <FileUp className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-warm-900">
                      Arraste e solte o arquivo PDF aqui ou{' '}
                      <span className="text-brand-600 underline">clique para selecionar</span>
                    </p>
                    <p className="text-[11px] text-warm-700">
                      Formato aceito: <span className="font-semibold text-warm-900">PDF (.pdf)</span> • Tamanho máximo:{' '}
                      <span className="font-semibold text-warm-900">20 MB</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Estado de Uploading com Progresso */}
            {uploading && (
              <div className="border border-brand-200 bg-brand-50/50 rounded-2xl p-6 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-brand-700 font-bold text-xs">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
                  <span>Enviando arquivo para o Supabase Storage (bucket `materiais`)...</span>
                </div>

                <div className="w-full max-w-md mx-auto bg-warm-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="brand-gradient h-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>

                <p className="text-[11px] text-warm-700 font-medium">
                  {uploadProgress}% concluído
                </p>
              </div>
            )}

            {/* Estado de Sucesso: Arquivo Carregado */}
            {uploadedFile && !uploading && (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-warm-900 truncate">
                        {uploadedFile.name}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Upload concluído
                      </span>
                    </div>
                    <p className="text-[11px] text-warm-700 mt-0.5">
                      Tamanho: <span className="font-semibold text-warm-900">{uploadedFile.size}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={uploadedFile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-50 transition-colors inline-flex items-center gap-1 shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Testar Link</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleRemoveUploadedFile}
                    className="px-3 py-1.5 rounded-lg bg-white border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50 transition-colors inline-flex items-center gap-1 shadow-2xs"
                    title="Remover e escolher outro arquivo"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Trocar</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mensagem de Erro no Upload */}
            {uploadError && (
              <div className="mt-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <div className="flex-1">
                  <p className="font-bold">Falha no envio do arquivo</p>
                  <p className="text-[11px] text-rose-600 mt-0.5">{uploadError}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadError(null)}
                  className="text-rose-400 hover:text-rose-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!titulo.trim() || !uploadedFile || uploading || isSubmitting}
            className={`w-full py-3 px-6 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
              !titulo.trim() || !uploadedFile || uploading || isSubmitting
                ? 'bg-warm-200 text-warm-700/60 cursor-not-allowed shadow-none'
                : 'brand-gradient text-white hover:opacity-95'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publicando na Biblioteca...</span>
              </>
            ) : uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enviando arquivo PDF...</span>
              </>
            ) : (
              <span>Publicar Material na Biblioteca</span>
            )}
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
                {res.descricao || 'Sem descrição cadastrada.'}
              </p>
            </div>

            <div className="pt-3 border-t border-warm-100 flex items-center justify-between">
              <span className="text-[11px] text-warm-700 font-medium">
                {new Date(res.criado_em).toLocaleDateString('pt-BR')}
                {res.tamanho ? ` • ${res.tamanho}` : ''}
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
