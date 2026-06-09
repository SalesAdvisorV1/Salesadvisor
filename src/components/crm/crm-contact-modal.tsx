'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import type { CrmContact, CrmStatus } from '@/types/crm';
import { STATUS_LABELS, PIPELINE_ORDER } from '@/types/crm';

interface CrmContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: CrmContact | null;
}

const WEBSITE_TYPES = [
  'Site vitrine',
  'E-commerce',
  'SaaS / Application web',
  'Site sur-mesure',
  'Refonte de site',
  'Landing page',
  'Autre',
];

export function CrmContactModal({ isOpen, onClose, contact }: CrmContactModalProps) {
  const queryClient = useQueryClient();
  const isEditing = !!contact;

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentWebsite, setCurrentWebsite] = useState('');
  const [status, setStatus] = useState<CrmStatus>('lead_generated');
  const [websiteType, setWebsiteType] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [quoteAmount, setQuoteAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [referencesExamples, setReferencesExamples] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (contact) {
      setName(contact.name || '');
      setCompany(contact.company || '');
      setEmail(contact.email || '');
      setPhone(contact.phone || '');
      setCurrentWebsite(contact.current_website || '');
      setStatus(contact.status);
      setWebsiteType(contact.website_type || '');
      setBudgetRange(contact.budget_range || '');
      setQuoteAmount(contact.quote_amount?.toString() || '');
      setDeadline(contact.deadline || '');
      setReferencesExamples(contact.references_examples || '');
      setNotes(contact.notes || '');
    } else {
      setName(''); setCompany(''); setEmail(''); setPhone('');
      setCurrentWebsite(''); setStatus('lead_generated');
      setWebsiteType(''); setBudgetRange(''); setQuoteAmount('');
      setDeadline(''); setReferencesExamples(''); setNotes('');
    }
    setError(null);
  }, [contact, isOpen]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Non connecté');

      const payload = {
        name: name.trim(),
        company: company.trim() || null,
        email: email.trim() || null,
        phone: phone.trim() || null,
        current_website: currentWebsite.trim() || null,
        status,
        website_type: websiteType || null,
        budget_range: budgetRange.trim() || null,
        quote_amount: quoteAmount ? parseFloat(quoteAmount) : null,
        deadline: deadline || null,
        references_examples: referencesExamples.trim() || null,
        notes: notes.trim() || null,
      };

      if (isEditing && contact) {
        const { error } = await supabase
          .from('web_crm_contacts')
          .update(payload)
          .eq('id', contact.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('web_crm_contacts')
          .insert({ ...payload, owner_id: userData.user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-contacts'] });
      onClose();
    },
    onError: (err: Error) => setError(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!contact) return;
      const supabase = createClient();
      const { error } = await supabase
        .from('web_crm_contacts')
        .delete()
        .eq('id', contact.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-contacts'] });
      onClose();
    },
    onError: (err: Error) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Le nom est requis'); return; }
    setError(null);
    saveMutation.mutate();
  };

  const handleDelete = () => {
    if (confirm(`Supprimer définitivement le contact "${contact?.name}" ?`)) {
      deleteMutation.mutate();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(15, 23, 42, 0.55)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              zIndex: 100,
            }}
          />
          <div style={{
            position: 'fixed', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 101, pointerEvents: 'none', padding: 20,
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              style={{
                pointerEvents: 'auto',
                width: 'min(700px, 92vw)',
                maxHeight: 'calc(100vh - 40px)',
                overflowY: 'auto',
                background: '#ffffff', borderRadius: 18,
                boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
            <form onSubmit={handleSubmit}>
              <div style={{ padding: '22px 26px 18px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <p style={{ color: '#059669', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 4px' }}>
                  CRM Web Services
                </p>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.04em', margin: 0 }}>
                  {isEditing ? `Éditer · ${contact?.name}` : 'Nouveau contact'}
                </h2>
              </div>

              <div style={{ padding: '20px 26px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="Nom complet *" full>
                  <Input value={name} onChange={setName} placeholder="Jean Dupont" required autoFocus />
                </Field>
                <Field label="Entreprise">
                  <Input value={company} onChange={setCompany} placeholder="Acme Corp" />
                </Field>
                <Field label="Email">
                  <Input value={email} onChange={setEmail} placeholder="contact@example.com" type="email" />
                </Field>
                <Field label="Téléphone">
                  <Input value={phone} onChange={setPhone} placeholder="06 12 34 56 78" />
                </Field>
                <Field label="Site actuel (s'il en a un)">
                  <Input value={currentWebsite} onChange={setCurrentWebsite} placeholder="https://..." />
                </Field>
                <Field label="Statut *">
                  <Select value={status} onChange={(v) => setStatus(v as CrmStatus)}>
                    {PIPELINE_ORDER.map(s => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                    <option value="lost">{STATUS_LABELS['lost']}</option>
                  </Select>
                </Field>
                <Field label="Type de site souhaité">
                  <Select value={websiteType} onChange={setWebsiteType}>
                    <option value="">— Sélectionner —</option>
                    {WEBSITE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </Select>
                </Field>
                <Field label="Fourchette de budget">
                  <Input value={budgetRange} onChange={setBudgetRange} placeholder="5k-10k €" />
                </Field>
                <Field label="Montant du devis (€)">
                  <Input value={quoteAmount} onChange={setQuoteAmount} placeholder="7500" type="number" />
                </Field>
                <Field label="Deadline souhaitée">
                  <Input value={deadline} onChange={setDeadline} type="date" />
                </Field>
                <div />
                <Field label="Références (sites que le client aime)" full>
                  <Textarea value={referencesExamples} onChange={setReferencesExamples} placeholder="https://example1.com, https://example2.com" />
                </Field>
                <Field label="Notes" full>
                  <Textarea value={notes} onChange={setNotes} placeholder="Détails du projet, contraintes, infos utiles..." rows={3} />
                </Field>

                {error && (
                  <div style={{ gridColumn: '1 / -1', color: '#dc2626', fontSize: 13, padding: '8px 12px', background: 'rgba(239,68,68,0.08)', borderRadius: 8 }}>
                    {error}
                  </div>
                )}
              </div>

              <div style={{
                padding: '16px 26px',
                borderTop: '1px solid rgba(0,0,0,0.06)',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', gap: 12,
                background: 'rgba(248, 250, 252, 0.6)',
                borderBottomLeftRadius: 18, borderBottomRightRadius: 18,
              }}>
                <div>
                  {isEditing && (
                    <button type="button" onClick={handleDelete} disabled={deleteMutation.isPending}
                      style={{
                        padding: '8px 14px', fontSize: 12, fontWeight: 600,
                        color: '#dc2626', background: 'transparent',
                        border: '1px solid rgba(239,68,68,0.25)',
                        borderRadius: 9999, cursor: 'pointer',
                      }}>
                      {deleteMutation.isPending ? 'Suppression...' : 'Supprimer'}
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" onClick={onClose}
                    style={{
                      padding: '9px 18px', fontSize: 13, fontWeight: 600,
                      color: '#475569', background: 'transparent',
                      border: '1px solid rgba(0,0,0,0.12)',
                      borderRadius: 9999, cursor: 'pointer',
                    }}>
                    Annuler
                  </button>
                  <button type="submit" disabled={saveMutation.isPending}
                    style={{
                      padding: '9px 20px', fontSize: 13, fontWeight: 700,
                      color: '#fff',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      border: 'none', borderRadius: 9999, cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(16,185,129,0.30)',
                    }}>
                    {saveMutation.isPending ? 'Enregistrement...' : (isEditing ? 'Mettre à jour' : 'Créer')}
                  </button>
                </div>
              </div>
            </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div style={{ gridColumn: full ? '1 / -1' : 'auto' }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = 'text', required, autoFocus }: {
  value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
  required?: boolean; autoFocus?: boolean;
}) {
  return (
    <input
      type={type} value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} required={required} autoFocus={autoFocus}
      style={{
        width: '100%', padding: '8px 12px', fontSize: 13,
        border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8,
        outline: 'none', fontFamily: 'inherit',
        boxSizing: 'border-box',
      }}
    />
  );
}

function Select({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%', padding: '8px 12px', fontSize: 13,
        border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8,
        outline: 'none', background: '#fff', cursor: 'pointer',
        fontFamily: 'inherit', boxSizing: 'border-box',
      }}>
      {children}
    </select>
  );
}

function Textarea({ value, onChange, placeholder, rows = 2 }: {
  value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} rows={rows}
      style={{
        width: '100%', padding: '8px 12px', fontSize: 13,
        border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8,
        outline: 'none', fontFamily: 'inherit',
        resize: 'vertical', boxSizing: 'border-box',
      }}
    />
  );
}

export default CrmContactModal;
