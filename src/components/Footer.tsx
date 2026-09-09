import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-100 py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-warm-700">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Psi Elaine Souza Logo"
            className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply"
          />
          <span className="text-xs font-semibold text-warm-900">Mentoria Individual de Casal</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-warm-700">
          <span>Ambiente Seguro & Privado (RLS Protegido)</span>
          <span>•</span>
          <span>Termos de Consentimento</span>
          <span>•</span>
          <span>Suporte Técnico</span>
        </div>
        <p className="text-xs text-warm-700">
          &copy; {new Date().getFullYear()} Psi Elaine Souza. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
