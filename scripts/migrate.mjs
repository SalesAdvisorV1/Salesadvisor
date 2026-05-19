import pg from "pg";

const { Client } = pg;

const PROJECT_REF = "stwzqwtifmdvaxnxyyhu";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0d3pxd3RpZm1kdmF4bnh5eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTExNDUxMCwiZXhwIjoyMDk0NjkwNTEwfQ.yd-l9Ht8Jn5X0O4EIH4DCQ4oe3-p_GX696QOJJCbbyU";

const SQL = `
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  email text not null default '',
  plan text not null default 'starter',
  credits_remaining integer not null default 50,
  credits_total integer not null default 50,
  created_at timestamptz not null default now()
);

create table if not exists public.search_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  sector text not null,
  city text not null,
  country text not null default 'France',
  radius text,
  company_size text,
  keywords text,
  target_role text,
  prospect_count integer not null default 0,
  average_score integer not null default 0,
  prospects jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  type text not null check (type in ('search', 'export', 'ai', 'enrichment')),
  title text not null,
  description text not null,
  created_at timestamptz not null default now()
);

alter table public.search_history enable row level security;
alter table public.activities enable row level security;

create policy if not exists "allow_all_service_role" on public.search_history
  using (true) with check (true);

create policy if not exists "allow_all_service_role" on public.activities
  using (true) with check (true);
`;

const hosts = [
  `db.${PROJECT_REF}.supabase.co`,
  `aws-0-us-east-1.pooler.supabase.com`,
  `aws-0-eu-west-1.pooler.supabase.com`,
];

async function tryConnect(host, port = 5432) {
  const client = new Client({
    host,
    port,
    database: "postgres",
    user: `postgres.${PROJECT_REF}`,
    password: SERVICE_ROLE_KEY,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000,
  });

  try {
    await client.connect();
    console.log(`✓ Connecté à ${host}:${port}`);
    await client.query(SQL);
    console.log("✓ Schema créé avec succès.");
    await client.end();
    return true;
  } catch (err) {
    console.log(`✗ ${host}:${port} — ${err.message.split("\n")[0]}`);
    try { await client.end(); } catch {}
    return false;
  }
}

async function main() {
  for (const host of hosts) {
    const ok = await tryConnect(host, 5432);
    if (ok) process.exit(0);
    if (host.includes("pooler")) {
      const ok6543 = await tryConnect(host, 6543);
      if (ok6543) process.exit(0);
    }
  }

  console.log("\n──────────────────────────────────────────────────");
  console.log("Connexion PostgreSQL directe impossible avec le service role key.");
  console.log("→ Exécute manuellement supabase/schema.sql dans le dashboard Supabase :");
  console.log("  https://supabase.com/dashboard/project/stwzqwtifmdvaxnxyyhu/sql/new");
  console.log("──────────────────────────────────────────────────\n");
  process.exit(1);
}

main();
