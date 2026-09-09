'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  HeartHandshake, 
  LayoutDashboard, 
  FileCheck2, 
  BookOpen, 
  History, 
  Users, 
  Sparkles, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, login } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) return null;

  const isAdmin = user.role === 'admin';
  const isPending = user.status_acesso === 'pendente';
  const isBlocked = user.status_acesso === 'bloqueado';

  const handleDevRoleSwitch = (targetRole: 'aluno' | 'admin' | 'pendente') => {
    if (targetRole === 'admin') {
      login('elaine@psielainesouza.com.br');
      router.push('/admin');
    } else if (targetRole === 'pendente') {
      login('fernanda@exemplo.com');
      router.push('/pendente');
    } else {
      login('mariana@exemplo.com');
      router.push('/dashboard');
    }
  };

  const studentLinks = [
    { href: '/dashboard', label: 'Início', icon: LayoutDashboard },
    { href: '/quizzes', label: 'Quizzes', icon: FileCheck2 },
    { href: '/biblioteca', label: 'Biblioteca', icon: BookOpen },
    { href: '/historico', label: 'Meus Diagnósticos', icon: History },
  ];

  const adminLinks = [
    { href: '/admin', label: 'Visão Geral', icon: ShieldCheck },
    { href: '/admin/usuarios', label: 'Alunos & Acessos', icon: Users },
    { href: '/admin/quizzes', label: 'Gestão Quizzes', icon: FileCheck2 },
    { href: '/admin/materiais', label: 'Materiais (PDFs)', icon: BookOpen },
    { href: '/admin/respostas', label: 'Respostas Clínicas', icon: History },
  ];

  const activeLinks = isAdmin ? adminLinks : studentLinks;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-100 shadow-sm">
      {/* Top Banner do Psicólogo com Seletor Rápido para Testes */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-600 to-brand-500 text-white text-xs py-1.5 px-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <HeartHandshake className="w-4 h-4 text-brand-200" />
          <span>Mentoria de Relacionamento & Casal — Psi Elaine Souza</span>
        </div>
        
        {/* Quick Role Switcher for Testing */}
        <div className="flex items-center gap-2 bg-black/20 rounded-full px-2.5 py-0.5 text-[11px]">
          <span className="text-brand-100 font-medium">Alternar Perfil:</span>
          <button 
            onClick={() => handleDevRoleSwitch('aluno')} 
            className={`px-2 py-0.5 rounded ${user.email === 'mariana@exemplo.com' ? 'bg-white text-brand-700 font-bold' : 'hover:underline text-white'}`}
          >
            Aluna Ativa
          </button>
          <span>|</span>
          <button 
            onClick={() => handleDevRoleSwitch('pendente')} 
            className={`px-2 py-0.5 rounded ${user.email === 'fernanda@exemplo.com' ? 'bg-white text-brand-700 font-bold' : 'hover:underline text-white'}`}
          >
            Aluna Pendente
          </button>
          <span>|</span>
          <button 
            onClick={() => handleDevRoleSwitch('admin')} 
            className={`px-2 py-0.5 rounded ${isAdmin ? 'bg-white text-brand-700 font-bold' : 'hover:underline text-white'}`}
          >
            Painel Admin
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Marca Oficial */}
          <Link href={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-3 group shrink-0">
            <div className="h-12 sm:h-16 flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src="/logo.png"
                alt="Psi Elaine Souza Logo"
                className="h-full w-auto object-contain max-w-[220px] sm:max-w-[320px] mix-blend-multiply"
              />
            </div>
            {isAdmin && (
              <span className="hidden sm:inline-block text-[11px] font-bold text-brand-700 bg-brand-100/80 px-2.5 py-0.5 rounded-full border border-brand-200">
                Admin
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          {!isPending && !isBlocked && (
            <nav className="hidden md:flex items-center gap-1">
              {activeLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-600 font-semibold shadow-sm'
                        : 'text-warm-700 hover:text-brand-600 hover:bg-brand-50/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-500' : 'text-warm-700'}`} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* User Info & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <span className="block text-sm font-semibold text-warm-900">{user.nome}</span>
              <span className={`inline-block text-[11px] px-2 py-0.5 rounded-full font-medium ${
                user.status_acesso === 'ativo'
                  ? 'bg-emerald-100 text-emerald-800'
                  : user.status_acesso === 'pendente'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {user.status_acesso === 'ativo' ? 'Acesso Ativo' : user.status_acesso === 'pendente' ? 'Aguardando Aprovação' : 'Acesso Bloqueado'}
              </span>
            </div>

            <button
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="p-2 text-warm-700 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
              title="Sair da plataforma"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-warm-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="p-3 bg-brand-50/60 rounded-xl mb-3">
            <p className="font-semibold text-warm-900 text-sm">{user.nome}</p>
            <p className="text-xs text-warm-700">{user.email}</p>
          </div>

          {!isPending && !isBlocked && activeLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-brand-500 text-white font-semibold' : 'text-warm-700 hover:bg-brand-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}

          <button
            onClick={() => {
              logout();
              setMobileMenuOpen(false);
              router.push('/login');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair da Plataforma
          </button>
        </div>
      )}
    </header>
  );
}
