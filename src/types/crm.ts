// ─────────────────────────────────────────────────────────────────
//  TYPES & CONSTANTES CRM Web Services
// ─────────────────────────────────────────────────────────────────

export type CrmStatus =
  | 'lead_generated'
  | 'contacted'
  | 'meeting'
  | 'quote_sent'
  | 'negotiation'
  | 'signed'
  | 'lost'
  | 'in_production'
  | 'delivered';

export interface CrmContact {
  id: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  current_website: string | null;
  status: CrmStatus;
  quote_amount: number | null;
  website_type: string | null;
  budget_range: string | null;
  deadline: string | null;
  references_examples: string | null;
  notes: string | null;
}

export const STATUS_LABELS: Record<CrmStatus, string> = {
  lead_generated: 'Lead généré',
  contacted: 'Contacté',
  meeting: 'RDV',
  quote_sent: 'Devis envoyé',
  negotiation: 'Négociation',
  signed: 'Signé',
  lost: 'Perdu',
  in_production: 'En production',
  delivered: 'Livré',
};

export const STATUS_COLORS: Record<CrmStatus, { bg: string; text: string; border: string }> = {
  lead_generated:  { bg: 'rgba(99,102,241,0.10)',  text: '#4f46e5', border: 'rgba(99,102,241,0.25)' },
  contacted:       { bg: 'rgba(139,92,246,0.10)',  text: '#7c3aed', border: 'rgba(139,92,246,0.25)' },
  meeting:         { bg: 'rgba(6,182,212,0.10)',   text: '#0891b2', border: 'rgba(6,182,212,0.25)' },
  quote_sent:      { bg: 'rgba(245,158,11,0.10)',  text: '#d97706', border: 'rgba(245,158,11,0.25)' },
  negotiation:     { bg: 'rgba(244,114,182,0.10)', text: '#db2777', border: 'rgba(244,114,182,0.25)' },
  signed:          { bg: 'rgba(16,185,129,0.12)',  text: '#059669', border: 'rgba(16,185,129,0.28)' },
  lost:            { bg: 'rgba(239,68,68,0.10)',   text: '#dc2626', border: 'rgba(239,68,68,0.22)' },
  in_production:   { bg: 'rgba(59,130,246,0.10)',  text: '#2563eb', border: 'rgba(59,130,246,0.25)' },
  delivered:       { bg: 'rgba(34,197,94,0.12)',   text: '#16a34a', border: 'rgba(34,197,94,0.28)' },
};

export const PIPELINE_ORDER: CrmStatus[] = [
  'lead_generated',
  'contacted',
  'meeting',
  'quote_sent',
  'negotiation',
  'signed',
  'in_production',
  'delivered',
];
