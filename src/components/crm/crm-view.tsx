'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { CrmContact, CrmStatus } from '@/types/crm';
import { STATUS_LABELS, STATUS_COLORS, PIPELINE_ORDER } from '@/types/crm';
import { CrmContactModal } from '@/components/crm/crm-contact-modal';

const FONT = 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif';

export function CrmView() {
  const [statusFilter, setStatusFilter] = useState<CrmStatus | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<CrmContact | null>(null);

  // ── Fetch des contacts ──
  const { data: contacts = [], isLoading } = useQuery<CrmContact[]>({
    queryKey: ['crm-contacts'],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('web_crm_contacts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as CrmContact[];
    },
  });

  // ── Stats ──
  const stats = useMemo(() => {
    const total = contacts.length;
    const inNegotiation = contacts.filter(
      c => c.status === 'negotiation' || c.status === 'quote_sent'
    ).length;
    const signedThisMonth = contacts.filter(c => {
      if (!['signed', 'in_production', 'delivered'].includes(c.status)) return false;
      const updated = new Date(c.updated_at);
      const now = new Date();
      return updated.getFullYear() === now.getFullYear() && updated.getMonth() === now.getMonth();
    }).length;
    const totalRevenue = contacts
      .filter(c => ['signed', 'in_production', 'delivered'].includes(c.status))
      .reduce((sum, c) => sum + (Number(c.quote_amount) || 0), 0);
    return { total, inNegotiation, signedThisMonth, totalRevenue };
  }, [contacts]);

  // ── Filtrage ──
  const filteredContacts = useMemo(() => {
    if (statusFilter === 'all') return contacts;
    return contacts.filter(c => c.status === statusFilter);
  }, [contacts, statusFilter]);

  return (
    <div style={{ fontFamily: FONT, padding: '20px 0' }}>
      {/* ── HEADER ── */}
      <header style={{ marginBottom: 28 }}>
        <p style={{ color: '#059669', fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', margin: '0 0 10px' }}>
          CRM · Web Services
        </p>
        <h1 style={{ color: '#0a0a0a', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 10px', maxWidth: 800 }}>
          Pipeline de vente sites web
        </h1>
        <p style={{ color: '#6b6b6b', fontSize: 15, lineHeight: 1.5, maxWidth: 600, margin: 0 }}>
          Suivez vos prospects pour la vente de sites web, du premier contact à la livraison.
        </p>
      </header>

      {/* ── STATS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <StatCard label="Total prospects" value={String(stats.total)} icon="📊" color="#6366f1" />
        <StatCard label="En négociation" value={String(stats.inNegotiation)} icon="💬" color="#f59e0b" />
        <StatCard label="Signés ce mois" value={String(stats.signedThisMonth)} icon="🎯" color="#10b981" />
        <StatCard label="CA pipeline" value={`${stats.totalRevenue.toLocaleString('fr-FR')} €`} icon="💰" color="#059669" />
      </div>

      {/* ── TOOLBAR ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <FilterChip label="Tous" active={statusFilter === 'all'} onClick={() => setStatusFilter('all')} />
          {PIPELINE_ORDER.map(status => (
            <FilterChip
              key={status}
              label={STATUS_LABELS[status]}
              active={statusFilter === status}
              onClick={() => setStatusFilter(status)}
              color={STATUS_COLORS[status]}
            />
          ))}
          <FilterChip
            label="Perdu"
            active={statusFilter === 'lost'}
            onClick={() => setStatusFilter('lost')}
            color={STATUS_COLORS['lost']}
          />
        </div>
        <button
          style={ctaPrimaryStyle}
          onClick={() => { setSelectedContact(null); setIsModalOpen(true); }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(16,185,129,0.40)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(16,185,129,0.30)'; }}
        >
          + Nouveau contact
        </button>
      </div>

      {/* ── TABLE ── */}
      <div style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(99,102,241,0.10)',
        borderRadius: 16,
        boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
        overflow: 'hidden',
      }}>
        {isLoading ? (
          <EmptyState icon="⏳" title="Chargement..." text="Récupération des contacts" />
        ) : filteredContacts.length === 0 ? (
          <EmptyState
            icon="📋"
            title={statusFilter === 'all' ? "Aucun contact pour l'instant" : `Aucun contact en "${STATUS_LABELS[statusFilter as CrmStatus]}"`}
            text="Cliquez sur '+ Nouveau contact' pour ajouter votre premier prospect"
          />
        ) : (
          <ContactsTable contacts={filteredContacts} onEdit={(c) => { setSelectedContact(c); setIsModalOpen(true); }} />
        )}
      </div>

      <CrmContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contact={selectedContact}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  COMPONENTS
// ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.78)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(99,102,241,0.10)',
      borderRadius: 14,
      padding: '14px 16px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${color}, ${color}33)`,
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: `${color}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14,
        }}>{icon}</div>
      </div>
      <div style={{
        fontSize: 24, fontWeight: 800, color: '#0a0a0a',
        letterSpacing: '-0.5px', lineHeight: 1, marginBottom: 4,
      }}>{value}</div>
      <p style={{ fontSize: 11, color: '#6b6b6b', margin: 0, fontWeight: 500 }}>{label}</p>
    </div>
  );
}

function FilterChip({ label, active, onClick, color }: {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: { bg: string; text: string; border: string };
}) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600,
      cursor: 'pointer', transition: 'all 0.15s',
      background: active ? '#0a0a0a' : (color ? color.bg : 'rgba(255,255,255,0.7)'),
      color: active ? '#fff' : (color ? color.text : '#0a0a0a'),
      border: active ? 'none' : `1px solid ${color ? color.border : 'rgba(0,0,0,0.08)'}`,
      whiteSpace: 'nowrap',
    }}>{label}</button>
  );
}

function ContactsTable({ contacts, onEdit }: { contacts: CrmContact[]; onEdit: (c: CrmContact) => void }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'rgba(99,102,241,0.04)' }}>
            <Th>Contact</Th>
            <Th>Statut</Th>
            <Th>Type</Th>
            <Th>Devis</Th>
            <Th>Deadline</Th>
            <Th>Site actuel</Th>
            <Th>Créé le</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c.id} style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <Td>
                <div style={{ fontWeight: 700, color: '#0a0a0a', fontSize: 13 }}>{c.name || c.company || '— Sans nom'}</div>
                {c.company && <div style={{ color: '#6b6b6b', fontSize: 11, marginTop: 2 }}>{c.company}</div>}
                {c.email && <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 1 }}>{c.email}</div>}
              </Td>
              <Td><StatusBadge status={c.status} /></Td>
              <Td>{c.website_type || '—'}</Td>
              <Td>{c.quote_amount ? `${Number(c.quote_amount).toLocaleString('fr-FR')} €` : '—'}</Td>
              <Td>{c.deadline ? new Date(c.deadline).toLocaleDateString('fr-FR') : '—'}</Td>
              <Td>
                {c.current_website ? (
                  <a href={c.current_website.startsWith('http') ? c.current_website : `https://${c.current_website}`} target="_blank" rel="noopener noreferrer"
                     style={{ color: '#6366f1', textDecoration: 'none', fontSize: 12 }}>
                    {c.current_website.replace(/^https?:\/\//, '').substring(0, 25)}
                  </a>
                ) : '—'}
              </Td>
              <Td>{new Date(c.created_at).toLocaleDateString('fr-FR')}</Td>
              <Td>
                <button
                  onClick={() => onEdit(c)}
                  style={{
                    padding: '5px 10px', fontSize: 11, fontWeight: 600,
                    border: '1px solid rgba(0,0,0,0.1)', background: 'transparent',
                    borderRadius: 6, cursor: 'pointer', color: '#0a0a0a',
                  }}
                >Éditer</button>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{
      padding: '11px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700,
      color: '#6b6b6b', letterSpacing: 1, textTransform: 'uppercase',
    }}>{children}</th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: '12px 14px', fontSize: 13, color: '#0a0a0a', verticalAlign: 'top' }}>{children}</td>;
}

function StatusBadge({ status }: { status: CrmStatus }) {
  const c = STATUS_COLORS[status];
  return (
    <span style={{
      padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
      letterSpacing: '-0.1px',
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      display: 'inline-block', whiteSpace: 'nowrap',
    }}>{STATUS_LABELS[status]}</span>
  );
}

function EmptyState({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{
        width: 64, height: 64, borderRadius: 16,
        background: 'rgba(16,185,129,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 18px', fontSize: 28,
      }}>{icon}</div>
      <p style={{ color: '#0a0a0a', fontSize: 17, fontWeight: 700, margin: '0 0 6px' }}>{title}</p>
      <p style={{ color: '#6b6b6b', fontSize: 14, margin: 0 }}>{text}</p>
    </div>
  );
}

const ctaPrimaryStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  background: 'linear-gradient(135deg, #10b981, #059669)',
  color: '#fff', padding: '9px 18px', borderRadius: 9999,
  fontSize: 13, fontWeight: 700, letterSpacing: '-0.2px',
  border: 'none', cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(16,185,129,0.30)',
  transition: 'transform 0.15s, box-shadow 0.15s',
};

export default CrmView;
