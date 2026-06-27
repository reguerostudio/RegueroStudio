-- Ejecutar en el SQL Editor de Supabase (Project > SQL Editor > New query)

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null
);

-- RLS activado, sin políticas públicas: solo accesible vía service_role key
-- (la que usa la función serverless, nunca la que se expone al navegador)
alter table leads enable row level security;
