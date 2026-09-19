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
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string; status?: StatusAcesso }>;
  signup: (nome: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUserStatus: (userId: string, newStatus: StatusAcesso) => Promise<void>;
  profilesList: Profile[];
  couples: Couple[];
  partnerGuidanceList: PartnerGuidance[];
  linkCouple: (userId1: string, userId2: string) => Promise<{ success: boolean; error?: string }>;
  unlinkCouple: (userId: string) => Promise<{ success: boolean }>;
  getSpouse: (userId: string) => Profile | null;
  getSpouseCouple: (userId: string) => Couple | null;
  refreshProfiles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [couples, setCouples] = useState<Couple[]>([]);
  const [partnerGuidanceList, setPartnerGuidanceList] = useState<PartnerGuidance[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega dados de perfis e casais do Supabase ou LocalStorage
  const refreshProfiles = async () => {
    const supabase = createClient();
    if (supabase) {
      try {
        const { data: profilesData } = await supabase.from('profiles').select('*').order('criado_em', { ascending: false });
        if (profilesData && profilesData.length > 0) {
          setProfiles(profilesData as Profile[]);
          saveStoredProfiles(profilesData as Profile[]);
        }

        const { data: couplesData } = await supabase.from('couples').select('*');
        if (couplesData) {
          setCouples(couplesData as Couple[]);
          saveStoredCouples(couplesData as Couple[]);
        }

        const { data: guidanceData } = await supabase.from('partner_guidance').select('*');
        if (guidanceData) {
          setPartnerGuidanceList(guidanceData as PartnerGuidance[]);
          saveStoredPartnerGuidance(guidanceData as PartnerGuidance[]);
        }
        return;
      } catch (err) {
        console.warn('Fallback para dados locais:', err);
      }
    }

    setProfiles(getStoredProfiles());
    setCouples(getStoredCouples());
    setPartnerGuidanceList(getStoredPartnerGuidance());
  };

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const supabase = createClient();

      if (supabase) {
        try {
          const { data: sessionData } = await supabase.auth.getSession();
          const authUser = sessionData?.session?.user;

          if (authUser) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', authUser.id)
              .maybeSingle();

            if (profile) {
              setUser(profile as Profile);
              localStorage.setItem('psi_current_user', JSON.stringify(profile));
            } else {
              // Fallback para perfil admin local ou temporário
              const fallbackProfile: Profile = {
                id: `prof-${authUser.id}`,
                user_id: authUser.id,
                nome: authUser.user_metadata?.nome || authUser.email?.split('@')[0] || 'Usuário',
                email: authUser.email || '',
                status_acesso: authUser.email === 'contato@elainecsouzapsi.com.br' ? 'ativo' : 'pendente',
                role: authUser.email === 'contato@elainecsouzapsi.com.br' ? 'admin' : 'aluno',
                criado_em: authUser.created_at || new Date().toISOString(),
              };
              setUser(fallbackProfile);
              localStorage.setItem('psi_current_user', JSON.stringify(fallbackProfile));
            }
          } else {
            // Checa cache local
            const savedUser = localStorage.getItem('psi_current_user');
            if (savedUser) {
              try {
                setUser(JSON.parse(savedUser));
              } catch {
                setUser(null);
              }
            } else {
              setUser(null);
            }
          }
        } catch {
          const savedUser = localStorage.getItem('psi_current_user');
          if (savedUser) setUser(JSON.parse(savedUser));
        }
      } else {
        const savedUser = localStorage.getItem('psi_current_user');
        if (savedUser) setUser(JSON.parse(savedUser));
      }

      await refreshProfiles();
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string; status?: StatusAcesso }> => {
    setLoading(true);
    const supabase = createClient();

    if (supabase && password) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (authError) {
          // Se for a conta da Dra. Elaine e ainda não estiver criada no Auth, podemos dar suporte
          setLoading(false);
          return { success: false, error: authError.message };
        }

        if (authData.user) {
          // Busca o perfil
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', authData.user.id)
            .maybeSingle();

          const activeProfile = profile || {
            id: `prof-${authData.user.id}`,
            user_id: authData.user.id,
            nome: authData.user.user_metadata?.nome || email.split('@')[0],
            email: email,
            status_acesso: (email === 'contato@elainecsouzapsi.com.br' ? 'ativo' : 'pendente') as StatusAcesso,
            role: (email === 'contato@elainecsouzapsi.com.br' ? 'admin' : 'aluno') as 'admin' | 'aluno',
            criado_em: new Date().toISOString(),
          };

          setUser(activeProfile);
          localStorage.setItem('psi_current_user', JSON.stringify(activeProfile));
          await refreshProfiles();
          setLoading(false);
          return { success: true, status: activeProfile.status_acesso };
        }
      } catch (err: any) {
        setLoading(false);
        return { success: false, error: err.message || 'Erro ao conectar ao Supabase.' };
      }
    }

    // Fallback local caso sem senha ou offline
    const currentProfiles = getStoredProfiles();
    const found = currentProfiles.find(p => p.email.toLowerCase() === email.toLowerCase());

    setLoading(false);

    if (found) {
      setUser(found);
      localStorage.setItem('psi_current_user', JSON.stringify(found));
      return { success: true, status: found.status_acesso };
    }

    return { success: false, error: 'Usuário não encontrado. Verifique seu e-mail e senha ou cadastre-se.' };
  };

  const signup = async (nome: string, email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    const supabase = createClient();

    if (supabase && password) {
      try {
        const isAdmin = email.toLowerCase() === 'contato@elainecsouzapsi.com.br';
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              nome: nome.trim(),
              role: isAdmin ? 'admin' : 'aluno',
            },
          },
        });

        if (authError) {
          setLoading(false);
          return { success: false, error: authError.message };
        }

        if (authData.user) {
          const newProfile: Profile = {
            id: `prof-${authData.user.id}`,
            user_id: authData.user.id,
            nome: nome.trim(),
            email: email.trim(),
            status_acesso: isAdmin ? 'ativo' : 'pendente',
            role: isAdmin ? 'admin' : 'aluno',
            criado_em: new Date().toISOString(),
          };

          setUser(newProfile);
          localStorage.setItem('psi_current_user', JSON.stringify(newProfile));
          await refreshProfiles();
          setLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        setLoading(false);
        return { success: false, error: err.message || 'Erro ao realizar cadastro no Supabase.' };
      }
    }

    // Fallback local
    const currentProfiles = getStoredProfiles();
    const newProfile: Profile = {
      id: `prof-${Date.now()}`,
      user_id: `usr-${Date.now()}`,
      nome: nome.trim(),
      email: email.trim(),
      status_acesso: email.toLowerCase() === 'contato@elainecsouzapsi.com.br' ? 'ativo' : 'pendente',
      role: email.toLowerCase() === 'contato@elainecsouzapsi.com.br' ? 'admin' : 'aluno',
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

  const logout = async () => {
    const supabase = createClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    setUser(null);
    localStorage.removeItem('psi_current_user');
  };

  const updateUserStatus = async (userId: string, newStatus: StatusAcesso) => {
    const supabase = createClient();
    if (supabase) {
      try {
        await supabase
          .from('profiles')
          .update({ status_acesso: newStatus })
          .or(`id.eq.${userId},user_id.eq.${userId}`);
      } catch (err) {
        console.warn('Erro ao atualizar status no Supabase:', err);
      }
    }

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

    const supabase = createClient();
    if (supabase) {
      try {
        // Remove vínculos anteriores
        await supabase.from('couples').delete().or(`user_id_1.eq.${userId1},user_id_2.eq.${userId1},user_id_1.eq.${userId2},user_id_2.eq.${userId2}`);
        await supabase.from('couples').insert({
          user_id_1: userId1,
          user_id_2: userId2,
        });
      } catch (err) {
        console.warn('Erro ao vincular casal no Supabase:', err);
      }
    }

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
    const supabase = createClient();
    if (supabase) {
      try {
        await supabase.from('couples').delete().or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`);
      } catch (err) {
        console.warn('Erro ao desvincular casal no Supabase:', err);
      }
    }

    const updated = couples.filter(c => c.user_id_1 !== userId && c.user_id_2 !== userId);
    saveStoredCouples(updated);
    setCouples(updated);
    return { success: true };
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

