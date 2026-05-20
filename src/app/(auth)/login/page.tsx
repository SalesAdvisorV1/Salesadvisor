'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/supabase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-32 px-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <span className="text-black font-black text-sm tracking-widest">SA</span>
          </div>
        </div>

        <h1 className="text-2xl font-black text-white text-center mb-8">Connexion</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 w-full transition-colors"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 w-full transition-colors"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black w-full py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center">
          <p className="text-white/40 text-sm">
            Pas de compte ?{' '}
            <Link href="/register" className="text-white/70 hover:text-white transition-colors">
              Créer un compte
            </Link>
          </p>
          <Link href="#" className="block text-white/30 text-sm hover:text-white/50 transition-colors">
            Mot de passe oublié
          </Link>
        </div>

      </div>
    </div>
  );
}
