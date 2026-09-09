'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { StatusAcesso } from '@/types/database';
import { Users, Search, CheckCircle2, Ban, ShieldAlert, ShieldCheck, RefreshCw } from 'lucide-react';

export default function AdminUsuariosPage() {
  const { profilesList, updateUserStatus } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | StatusAcesso>('todos');

  const filtered = profilesList.filter((p) => {
    const matchesSearch = p.nome.toLowerCase().includes(search.toLowerCase()) || 
                          p.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || p.status_acesso === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 mb-1">
              <Users className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Gestão de Membros</span>
            </div>
            <h1 className="text-2xl font-bold text-warm-900 font-heading">
              Controle de Acessos dos Alunos
            </h1>
            <p className="text-xs text-warm-700 mt-0.5">
              Libere acessos manualmente após a confirmação de pagamento ou revogue acessos.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-warm-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou e-mail..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-2 overflow-x-auto border-t border-warm-100 pt-4 text-xs font-medium">
          <button
            onClick={() => setStatusFilter('todos')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              statusFilter === 'todos' ? 'brand-gradient text-white font-bold' : 'bg-rose-soft text-warm-700 hover:bg-rose-soft/80'
            }`}
          >
            Todos ({profilesList.length})
          </button>
          <button
            onClick={() => setStatusFilter('pendente')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              statusFilter === 'pendente' ? 'bg-amber-600 text-white font-bold' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            Pendentes ({profilesList.filter(p => p.status_acesso === 'pendente').length})
          </button>
          <button
            onClick={() => setStatusFilter('ativo')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              statusFilter === 'ativo' ? 'bg-emerald-600 text-white font-bold' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            Ativos ({profilesList.filter(p => p.status_acesso === 'ativo').length})
          </button>
          <button
            onClick={() => setStatusFilter('bloqueado')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              statusFilter === 'bloqueado' ? 'bg-rose-600 text-white font-bold' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            Bloqueados ({profilesList.filter(p => p.status_acesso === 'bloqueado').length})
          </button>
        </div>
      </div>

      {/* Tabela / Lista de Usuários */}
      <div className="bg-white rounded-3xl border border-brand-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-rose-soft/60 border-b border-brand-100 text-[11px] font-bold text-warm-700 uppercase tracking-wider">
                <th className="py-4 px-6">Aluno(a) / E-mail</th>
                <th className="py-4 px-6">Tipo de Perfil</th>
                <th className="py-4 px-6">Status de Acesso</th>
                <th className="py-4 px-6">Data de Cadastro</th>
                <th className="py-4 px-6 text-right">Ações de Controle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100 text-xs">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-rose-soft/20 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-warm-900">{p.nome}</p>
                    <p className="text-[11px] text-warm-700">{p.email}</p>
                  </td>

                  <td className="py-4 px-6">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${
                      p.role === 'admin' ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {p.role === 'admin' ? 'Dra. Psicóloga' : 'Aluno(a)'}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                      p.status_acesso === 'ativo'
                        ? 'bg-emerald-100 text-emerald-800'
                        : p.status_acesso === 'pendente'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {p.status_acesso === 'ativo' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      {p.status_acesso === 'pendente' && <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />}
                      {p.status_acesso === 'bloqueado' && <Ban className="w-3.5 h-3.5 text-rose-600" />}
                      <span className="capitalize">{p.status_acesso}</span>
                    </span>
                  </td>

                  <td className="py-4 px-6 text-warm-700">
                    {new Date(p.criado_em).toLocaleDateString('pt-BR')}
                  </td>

                  <td className="py-4 px-6 text-right">
                    {p.role !== 'admin' && (
                      <div className="flex items-center justify-end gap-2">
                        {p.status_acesso !== 'ativo' && (
                          <button
                            onClick={() => updateUserStatus(p.id, 'ativo')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs transition-colors flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Aprovar</span>
                          </button>
                        )}

                        {p.status_acesso === 'ativo' && (
                          <button
                            onClick={() => updateUserStatus(p.id, 'bloqueado')}
                            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-[11px] transition-colors flex items-center gap-1"
                          >
                            <Ban className="w-3 h-3" />
                            <span>Bloquear</span>
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
