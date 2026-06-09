'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { hasCrmAccess } from '@/lib/crm-access';
import { CrmView } from '@/components/crm/crm-view';

export default function CrmPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const email = data.user?.email;
      if (!email) {
        router.replace('/login');
        return;
      }
      if (!hasCrmAccess(email)) {
        router.replace('/dashboard');
        return;
      }
      setAllowed(true);
      setChecked(true);
    });
  }, [router]);

  if (!checked || !allowed) {
    // État pendant la vérif d'accès
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui,-apple-system,sans-serif',
        color: '#94a3b8',
        fontSize: 14,
      }}>
        Vérification de l&apos;accès...
      </div>
    );
  }

  return <CrmView />;
}
