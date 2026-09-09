'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.role === 'admin') {
        router.push('/admin');
      } else if (user.status_acesso === 'pendente') {
        router.push('/pendente');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
      <p className="text-warm-700 font-medium">Carregando a sua área de mentoria...</p>
    </div>
  );
}
