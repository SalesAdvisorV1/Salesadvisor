-- Sales Advisor — Schema SQL
-- Colle ce contenu dans : https://supabase.com/dashboard/project/stwzqwtifmdvaxnxyyhu/sql/new
-- Puis clique sur "Run"

-- Profils (standalone, sans dépendance à auth.users pour le MVP)
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  email text not null default '',
  plan text not null default 'starter',
  credits_remaining integer not null default 50,
  credits_total integer not null default 50,
  created_at timestamptz not null default now()
);

-- Historique des recherches prospects
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

-- Fil d'activité (dashboard)
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  type text not null check (type in ('search', 'export', 'ai', 'enrichment')),
  title text not null,
  description text not null,
  created_at timestamptz not null default now()
);

-- RLS : activé mais permissif (le service_role bypass de toute façon)
alter table public.profiles enable row level security;
alter table public.search_history enable row level security;
alter table public.activities enable row level security;

-- Politique permissive (accès via service_role uniquement côté API)
create policy "service_role_all" on public.profiles
  using (true) with check (true);

create policy "service_role_all" on public.search_history
  using (true) with check (true);

create policy "service_role_all" on public.activities
  using (true) with check (true);
