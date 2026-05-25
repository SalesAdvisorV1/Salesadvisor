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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(99,102,241,0.18)',
    borderRadius: 12,
    padding: '13px 16px',
    fontSize: 15,
    color: '#0a0a0a',
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
    fontFamily: 'inherit',
  };

  const focusOn = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#6366f1';
    e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.15)';
    e.target.style.background = '#ffffff';
  };
  const focusOff = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(99,102,241,0.18)';
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'rgba(255,255,255,0.7)';
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 440,
        position: 'relative',
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Back to home */}
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          fontWeight: 500,
          color: '#6b7280',
          textDecoration: 'none',
          marginBottom: 22,
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#4f46e5')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#6b7280')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M9 11L5 7l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Retour à l&apos;accueil
      </Link>

      {/* Glass card */}
      <div
        style={{
          background: 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.6)',
          borderRadius: 24,
          padding: '36px 32px',
          boxShadow:
            '0 20px 50px rgba(99,102,241,0.15), 0 1px 0 rgba(255,255,255,0.6) inset',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: 15,
              letterSpacing: '-0.02em',
              boxShadow:
                '0 6px 16px rgba(99,102,241,0.40), 0 1px 0 rgba(255,255,255,0.4) inset',
            }}
          >
            SA
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            margin: '0 0 6px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #4f46e5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Créez votre compte
        </h1>
        <p
          style={{
            fontSize: 14,
            color: '#6b7280',
            margin: '0 0 28px',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          14 jours d&apos;essai gratuit · Aucune carte bancaire requise
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Nom */}
          <div>
            <label
              htmlFor="name"
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#374151',
                marginBottom: 6,
                paddingLeft: 4,
              }}
            >
              Nom complet
            </label>
            <input
              id="name"
              type="text"
              placeholder="Marie Dupont"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
              onFocus={focusOn}
              onBlur={focusOff}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#374151',
                marginBottom: 6,
                paddingLeft: 4,
              }}
            >
              Email professionnel
            </label>
            <input
              id="email"
              type="email"
              placeholder="vous@entreprise.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
              onFocus={focusOn}
              onBlur={focusOff}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#374151',
                marginBottom: 6,
                paddingLeft: 4,
              }}
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="6 caractères minimum"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={inputStyle}
              onFocus={focusOn}
              onBlur={focusOff}
            />
          </div>

          {error && (
            <div
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: 10,
                padding: '10px 14px',
                fontSize: 13,
                color: '#b91c1c',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="7" cy="7" r="6" stroke="#dc2626" strokeWidth="1.5" />
                <path d="M7 4v3.5M7 9.5v.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 22px',
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 600,
              color: '#fff',
              background: loading
                ? '#9ca3af'
                : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading
                ? 'none'
                : '0 6px 18px rgba(99,102,241,0.40), 0 1px 0 rgba(255,255,255,0.3) inset',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              marginTop: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => {
              if (loading) return;
              const t = e.currentTarget as HTMLButtonElement;
              t.style.transform = 'translateY(-1px)';
              t.style.boxShadow =
                '0 10px 24px rgba(99,102,241,0.50), 0 1px 0 rgba(255,255,255,0.3) inset';
            }}
            onMouseLeave={(e) => {
              if (loading) return;
              const t = e.currentTarget as HTMLButtonElement;
              t.style.transform = 'translateY(0)';
              t.style.boxShadow =
                '0 6px 18px rgba(99,102,241,0.40), 0 1px 0 rgba(255,255,255,0.3) inset';
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    border: '2px solid rgba(255,255,255,0.35)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                Création…
              </>
            ) : (
              <>
                Commencer gratuitement
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M5 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </form>

        {/* Terms */}
        <p
          style={{
            fontSize: 11,
            color: '#9ca3af',
            textAlign: 'center',
            margin: '14px 0 0',
            lineHeight: 1.5,
          }}
        >
          En continuant, vous acceptez nos{' '}
          <Link href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>
            Conditions
          </Link>{' '}
          et notre{' '}
          <Link href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>
            Politique de confidentialité
          </Link>
          .
        </p>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            margin: '24px 0 18px',
          }}
        >
          <div style={{ flex: 1, height: 1, background: 'rgba(229,231,235,0.8)' }} />
          <span style={{ fontSize: 11, color: '#9ca3af', letterSpacing: '0.08em' }}>OU</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(229,231,235,0.8)' }} />
        </div>

        {/* Login link */}
        <p
          style={{
            fontSize: 14,
            color: '#6b7280',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Déjà un compte ?{' '}
          <Link
            href="/login"
            style={{
              color: '#6366f1',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Se connecter
          </Link>
        </p>
      </div>

      {/* Trust line */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          flexWrap: 'wrap',
        }}
      >
        {[
          'Aucune carte bancaire',
          'Annulable à tout moment',
          'Onboarding en 2 min',
        ].map((t) => (
          <span
            key={t}
            style={{
              fontSize: 12,
              color: '#9ca3af',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="7" fill="#d1fae5" />
              <path
                d="M4 7l2 2 4-4"
                stroke="#059669"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
