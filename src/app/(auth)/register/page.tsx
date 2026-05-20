'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/supabase/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signUp(email, password, name);
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

        <h1 className="text-2xl font-black text-white text-center mb-8">Créer un compte</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 w-full transition-colors"
          />
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
            minLength={6}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 w-full transition-colors"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black w-full py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {loading ? 'Création…' : 'Créer mon compte'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/40 text-sm">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-white/70 hover:text-white transition-colors">
              Se connecter
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
