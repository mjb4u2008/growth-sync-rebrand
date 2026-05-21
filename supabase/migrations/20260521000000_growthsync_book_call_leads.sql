create table if not exists public.book_call_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 160),
  company text not null check (char_length(company) between 1 and 180),
  email text not null check (char_length(email) between 3 and 240 and email = lower(email)),
  social_handles text not null check (char_length(social_handles) between 1 and 280),
  notes text not null default '' check (char_length(notes) <= 2400),
  source text not null default 'book-a-call' check (char_length(source) <= 120),
  user_agent text not null default '' check (char_length(user_agent) <= 300),
  referrer text not null default '' check (char_length(referrer) <= 500),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.book_call_leads enable row level security;

create index if not exists book_call_leads_created_at_idx
  on public.book_call_leads (created_at desc);

create index if not exists book_call_leads_email_idx
  on public.book_call_leads (email);

grant insert on table public.book_call_leads to anon, authenticated;
grant select, insert, update, delete on table public.book_call_leads to service_role;

drop policy if exists "book_call_leads_insert_only" on public.book_call_leads;

create policy "book_call_leads_insert_only"
  on public.book_call_leads
  for insert
  to anon, authenticated
  with check (
    name <> ''
    and company <> ''
    and email <> ''
    and social_handles <> ''
    and source <> ''
    and char_length(notes) <= 2400
  );
