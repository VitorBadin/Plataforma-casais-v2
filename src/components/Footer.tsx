import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MessageCircle, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-100 py-6 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-warm-700">
        {/* Indicador de Segurança */}
        <div className="flex items-center gap-2 font-medium text-warm-800">
          <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
          <span>Ambiente Seguro & Privado (RLS Protegido)</span>
        </div>

        {/* Links Centrais: Termos e Suporte WhatsApp */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-medium">
          <Link
            href="/termos-de-consentimento"
            className="hover:text-brand-600 transition-colors inline-flex items-center gap-1.5 py-1"
          >
            <FileText className="w-3.5 h-3.5 text-brand-500" />
            <span>Termos de Consentimento</span>
          </Link>

          <span className="text-warm-300 hidden sm:inline">•</span>

          <a
            href="https://wa.me/5511997327231"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-600 transition-colors inline-flex items-center gap-1.5 py-1"
            title="Abrir atendimento no WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Suporte Técnico</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-warm-600 text-center md:text-right">
          &copy; 2026 Psi Elaine Souza. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
