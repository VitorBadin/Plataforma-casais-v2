'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, StatusAcesso } from '@/types/database';
import { INITIAL_PROFILES, getStoredProfiles, saveStoredProfiles } from '@/lib/mockData';
import { createClient } from '@/lib/supabase/client';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  login: (email: string) => Promise<{ success: boolean; error?: string; status?: StatusAcesso }>;
  signup: (nome: string, email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUserStatus: (userId: string, newStatus: StatusAcesso) => void;
  profilesList: Profile[];
  refreshProfiles: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inicializa lista de perfis do storage local ou mock
    const currentProfiles = getStoredProfiles();
    setProfiles(currentProfiles);

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
      // Ex: const { data, error } = await supabase.auth.signInWithPassword(...)
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

    /*
      [EXPANSÃO FUTURA - INTEGRAÇÃO DE PAGAMENTO]
      Aqui será disparada a chamada para a gateway de pagamento (Hotmart, Eduzz, Kiwify, Stripe).
      Após a confirmação do webhook de checkout, o status_acesso será alterado automaticamente para 'ativo'.
    */

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

  const refreshProfiles = () => {
    setProfiles(getStoredProfiles());
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
