// ─────────────────────────────────────────────────────────────────
//  CRM ACCESS CONTROL
//  Liste blanche des emails autorisés à accéder au CRM Web Services
//  Pour ajouter une personne : ajouter son email dans CRM_AUTHORIZED_EMAILS
// ─────────────────────────────────────────────────────────────────

export const CRM_AUTHORIZED_EMAILS = [
  "deletrezvictor@gmail.com",
];

export function hasCrmAccess(email: string | null | undefined): boolean {
  if (!email) return false;
  return CRM_AUTHORIZED_EMAILS.includes(email.toLowerCase().trim());
}
