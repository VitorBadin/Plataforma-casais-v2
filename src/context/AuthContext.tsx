'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, StatusAcesso, Couple, PartnerGuidance } from '@/types/database';
import {
  INITIAL_PROFILES,
  getStoredProfiles,
  saveStoredProfiles,
  getStoredCouples,
  saveStoredCouples,
  getStoredPartnerGuidance,
  saveStoredPartnerGuidance,
} from '@/lib/mockData';
import { createClient } from '@/lib/supabase/client';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  login: (email: string) => Promise<{ success: boolean; error?: string; status?: StatusAcesso }>;
  signup: (nome: string, email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUserStatus: (userId: string, newStatus: StatusAcesso) => void;
  profilesList: Profile[];
  couples: Couple[];
  partnerGuidanceList: PartnerGuidance[];
  linkCouple: (userId1: string, userId2: string) => Promise<{ success: boolean; error?: string }>;
  unlinkCouple: (userId: string) => Promise<{ success: boolean }>;
  getSpouse: (userId: string) => Profile | null;
  getSpouseCouple: (userId: string) => Couple | null;
  refreshProfiles: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [couples, setCouples] = useState<Couple[]>([]);
  const [partnerGuidanceList, setPartnerGuidanceList] = useState<PartnerGuidance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inicializa lista de perfis, casais e orientações do storage local ou mock
    const currentProfiles = getStoredProfiles();
    const currentCouples = getStoredCouples();
    const currentGuidance = getStoredPartnerGuidance();

    setProfiles(currentProfiles);
    setCouples(currentCouples);
    setPartnerGuidanceList(currentGuidance);

    // Checa se há sessão salva localmente
    const savedUser = localStorage.getItem('psi_current_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        // Atualiza com os dados mais recentes da lista
        const latest = currentProfiles.find(p => p.email === parsed.email) || parsed;
        setUser(latest);
      } catch (e) {
        setUser(currentProfiles[0]);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    setLoading(true);

    // Tenta primeiro no Supabase se configurado
    const supabase = createClient();
    if (supabase) {
      // Integração Supabase Auth estaria ativa aqui
    }

    // Validação / Simulação
    const currentProfiles = getStoredProfiles();
    const found = currentProfiles.find(p => p.email.toLowerCase() === email.toLowerCase());

    setLoading(false);

    if (found) {
      setUser(found);
      localStorage.setItem('psi_current_user', JSON.stringify(found));
      return { success: true, status: found.status_acesso };
    }

    // Se e-mail novo não encontrado, cria um perfil aluna pendente para demonstração
    const newProfile: Profile = {
      id: `prof-${Date.now()}`,
      user_id: `usr-${Date.now()}`,
      nome: email.split('@')[0].toUpperCase(),
      email: email,
      status_acesso: 'pendente',
      role: 'aluno',
      criado_em: new Date().toISOString(),
    };

    const updated = [...currentProfiles, newProfile];
    saveStoredProfiles(updated);
    setProfiles(updated);
    setUser(newProfile);
    localStorage.setItem('psi_current_user', JSON.stringify(newProfile));

    return { success: true, status: 'pendente' as StatusAcesso };
  };

  const signup = async (nome: string, email: string) => {
    setLoading(true);
    const currentProfiles = getStoredProfiles();

    // Regra do MVP: todo novo cadastro inicia como 'pendente' aguardando liberação do admin
    const newProfile: Profile = {
      id: `prof-${Date.now()}`,
      user_id: `usr-${Date.now()}`,
      nome,
      email,
      status_acesso: 'pendente',
      role: 'aluno',
      criado_em: new Date().toISOString(),
    };

    const updated = [...currentProfiles, newProfile];
    saveStoredProfiles(updated);
    setProfiles(updated);
    setUser(newProfile);
    localStorage.setItem('psi_current_user', JSON.stringify(newProfile));

    setLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('psi_current_user');
  };

  const updateUserStatus = (userId: string, newStatus: StatusAcesso) => {
    const currentProfiles = getStoredProfiles();
    const updated = currentProfiles.map(p => 
      p.id === userId || p.user_id === userId ? { ...p, status_acesso: newStatus } : p
    );
    saveStoredProfiles(updated);
    setProfiles(updated);

    if (user && (user.id === userId || user.user_id === userId)) {
      const updatedCurrentUser = { ...user, status_acesso: newStatus };
      setUser(updatedCurrentUser);
      localStorage.setItem('psi_current_user', JSON.stringify(updatedCurrentUser));
    }
  };

  const getSpouseCouple = (userId: string): Couple | null => {
    return couples.find(c => c.user_id_1 === userId || c.user_id_2 === userId) || null;
  };

  const getSpouse = (userId: string): Profile | null => {
    const couple = getSpouseCouple(userId);
    if (!couple) return null;
    const spouseId = couple.user_id_1 === userId ? couple.user_id_2 : couple.user_id_1;
    return profiles.find(p => p.id === spouseId || p.user_id === spouseId) || null;
  };

  const linkCouple = async (userId1: string, userId2: string): Promise<{ success: boolean; error?: string }> => {
    if (userId1 === userId2) {
      return { success: false, error: 'Não é possível vincular um usuário a si mesmo.' };
    }

    // Remove qualquer vínculo prévio existente para qualquer um dos dois (regra do MVP: 1 cônjuge por vez)
    const cleaned = couples.filter(
      c => c.user_id_1 !== userId1 && c.user_id_2 !== userId1 &&
           c.user_id_1 !== userId2 && c.user_id_2 !== userId2
    );

    const newCouple: Couple = {
      id: `couple-${Date.now()}`,
      user_id_1: userId1,
      user_id_2: userId2,
      criado_em: new Date().toISOString(),
    };

    const updated = [...cleaned, newCouple];
    saveStoredCouples(updated);
    setCouples(updated);

    return { success: true };
  };

  const unlinkCouple = async (userId: string): Promise<{ success: boolean }> => {
    const updated = couples.filter(c => c.user_id_1 !== userId && c.user_id_2 !== userId);
    saveStoredCouples(updated);
    setCouples(updated);
    return { success: true };
  };

  const refreshProfiles = () => {
    setProfiles(getStoredProfiles());
    setCouples(getStoredCouples());
    setPartnerGuidanceList(getStoredPartnerGuidance());
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      updateUserStatus,
      profilesList: profiles,
      couples,
      partnerGuidanceList,
      linkCouple,
      unlinkCouple,
      getSpouse,
      getSpouseCouple,
      refreshProfiles
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}

