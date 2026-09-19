'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { StatusAcesso, Profile } from '@/types/database';
import {
  Users,
  Search,
  CheckCircle2,
  Ban,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  HeartHandshake,
  UserPlus,
  Unlink,
  X,
  Sparkles,
  Heart,
} from 'lucide-react';

export default function AdminUsuariosPage() {
  const { profilesList, updateUserStatus, getSpouse, linkCouple, unlinkCouple, refreshProfiles } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | StatusAcesso>('todos');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    refreshProfiles();
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshProfiles();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Estado do Modal de Vínculo de Casal
  const [selectedProfileForCouple, setSelectedProfileForCouple] = useState<Profile | null>(null);
  const [targetSpouseId, setTargetSpouseId] = useState<string>('');
  const [modalFeedback, setModalFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const filtered = profilesList.filter((p) => {
    const matchesSearch = p.nome.toLowerCase().includes(search.toLowerCase()) || 
                          p.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || p.status_acesso === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenCoupleModal = (profile: Profile) => {
    setSelectedProfileForCouple(profile);
    setTargetSpouseId('');
    setModalFeedback(null);
  };

  const handleCloseCoupleModal = () => {
    setSelectedProfileForCouple(null);
    setTargetSpouseId('');
    setModalFeedback(null);
  };

  const handleLinkCouple = async () => {
    if (!selectedProfileForCouple || !targetSpouseId) return;
    const res = await linkCouple(selectedProfileForCouple.id, targetSpouseId);
    if (res.success) {
      setModalFeedback({ type: 'success', message: 'Vínculo mútuo de casal estabelecido com sucesso!' });
      setTimeout(() => {
        handleCloseCoupleModal();
      }, 1200);
    } else {
      setModalFeedback({ type: 'error', message: res.error || 'Erro ao vincular cônjuge.' });
    }
  };

  const handleUnlinkCouple = async (userId: string) => {
    if (!window.confirm('Deseja realmente desfazer o vínculo deste casal?')) return;
    await unlinkCouple(userId);
    setModalFeedback({ type: 'success', message: 'Vínculo de casal desfeito com sucesso.' });
    setTimeout(() => {
      handleCloseCoupleModal();
    }, 1000);
  };

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
              Controle de Acessos e Vínculo de Casais
            </h1>
            <p className="text-xs text-warm-700 mt-0.5">
              Libere acessos manualmente e conecte as contas de cônjuges para acompanhamento conjunto de quizzes.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
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
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              title="Recarregar Lista do Banco"
              className="p-2.5 rounded-xl bg-white border border-warm-200 hover:bg-rose-soft text-warm-700 transition-all shadow-xs shrink-0 flex items-center gap-1 text-xs font-semibold"
            >
              <RefreshCw className={`w-4 h-4 text-brand-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Atualizar</span>
            </button>
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
                <th className="py-4 px-6">Cônjuge Vinculado</th>
                <th className="py-4 px-6">Data de Cadastro</th>
                <th className="py-4 px-6 text-right">Ações de Controle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-100 text-xs">
              {filtered.map((p) => {
                const spouse = getSpouse(p.id) || getSpouse(p.user_id);
                return (
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

                    {/* Cônjuge Vinculado */}
                    <td className="py-4 px-6">
                      {p.role === 'admin' ? (
                        <span className="text-warm-400 text-[11px] italic">—</span>
                      ) : spouse ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenCoupleModal(p)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-brand-50 border border-brand-200 text-brand-800 hover:bg-brand-100 transition-colors text-[11px] font-bold"
                            title="Clique para gerenciar vínculo"
                          >
                            <HeartHandshake className="w-3.5 h-3.5 text-brand-600" />
                            <span>{spouse.nome}</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenCoupleModal(p)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-warm-100/70 hover:bg-brand-50 text-warm-700 hover:text-brand-700 border border-warm-200 text-[11px] font-medium transition-colors"
                        >
                          <UserPlus className="w-3 h-3 text-warm-500" />
                          <span>+ Vincular</span>
                        </button>
                      )}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Dialog de Vínculo de Casal */}
      {selectedProfileForCouple && (
        <div className="fixed inset-0 z-50 bg-warm-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-brand-100 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                    Vínculo de Cônjuges (Casal)
                  </span>
                  <h3 className="text-lg font-bold text-warm-900 font-heading">
                    {selectedProfileForCouple.nome}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleCloseCoupleModal}
                className="p-1.5 rounded-xl text-warm-400 hover:text-warm-700 hover:bg-warm-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalFeedback && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  modalFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {modalFeedback.message}
              </div>
            )}

            {/* Verifica se já há cônjuge vinculado */}
            {(() => {
              const currentSpouse =
                getSpouse(selectedProfileForCouple.id) || getSpouse(selectedProfileForCouple.user_id);

              if (currentSpouse) {
                return (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-brand-900">
                          Cônjuge Atualmente Vinculado(a):
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Vínculo Ativo Mútuo
                        </span>
                      </div>
                      <p className="text-sm font-bold text-warm-900">{currentSpouse.nome}</p>
                      <p className="text-xs text-warm-700">{currentSpouse.email}</p>
                      <p className="text-[11px] text-warm-600 pt-1 leading-relaxed">
                        Ao responderem quizzes comuns, ambos poderão visualizar o laudo resumido um do outro. O vínculo é bidirecional.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={handleCloseCoupleModal}
                        className="px-4 py-2 rounded-xl bg-warm-100 hover:bg-warm-200 text-warm-800 text-xs font-semibold transition-colors"
                      >
                        Fechar
                      </button>

                      <button
                        type="button"
                        onClick={() => handleUnlinkCouple(selectedProfileForCouple.id)}
                        className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                      >
                        <Unlink className="w-3.5 h-3.5" />
                        <span>Desfazer Vínculo</span>
                      </button>
                    </div>
                  </div>
                );
              }

              // Não possui vínculo: formulário para selecionar e vincular
              const availableSpouses = profilesList.filter(
                (other) =>
                  other.role !== 'admin' &&
                  other.id !== selectedProfileForCouple.id &&
                  other.user_id !== selectedProfileForCouple.user_id
              );

              return (
                <div className="space-y-4">
                  <p className="text-xs text-warm-700 leading-relaxed">
                    Selecione outro aluno já cadastrado para formar o casal. O vínculo é mútuo e ambos passarão a visualizar os resumos de quizzes que responderem em conjunto.
                  </p>

                  <div>
                    <label className="block text-xs font-bold text-warm-900 uppercase tracking-wider mb-1.5">
                      Selecionar Cônjuge
                    </label>
                    <select
                      value={targetSpouseId}
                      onChange={(e) => setTargetSpouseId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-200 bg-rose-soft/40 text-warm-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="">Selecione um aluno(a)...</option>
                      {availableSpouses.map((other) => {
                        const otherSpouse = getSpouse(other.id) || getSpouse(other.user_id);
                        return (
                          <option key={other.id} value={other.id}>
                            {other.nome} ({other.email}) {otherSpouse ? `[Já vinculado(a) com ${otherSpouse.nome}]` : ''}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseCoupleModal}
                      className="px-4 py-2 rounded-xl bg-warm-100 hover:bg-warm-200 text-warm-800 text-xs font-semibold transition-colors"
                    >
                      Cancelar
                    </button>

                    <button
                      type="button"
                      disabled={!targetSpouseId}
                      onClick={handleLinkCouple}
                      className="px-4 py-2 rounded-xl brand-gradient text-white text-xs font-bold shadow-xs hover:opacity-95 disabled:opacity-50 transition-all inline-flex items-center gap-1.5"
                    >
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>Vincular Cônjuge</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

