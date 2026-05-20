'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/supabase/auth';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => router.push('/'));
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-white/40 text-sm">Déconnexion…</p>
    </div>
  );
}
