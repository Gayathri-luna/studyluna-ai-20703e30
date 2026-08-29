do $$ begin
  create type public.app_role as enum ('admin','moderator','user');
exception when duplicate_object then null; end $$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
drop policy if exists "read own roles" on public.user_roles;
create policy "read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create table if not exists public.scribd_resources (
  id uuid primary key default gen_random_uuid(),
  branch text not null,
  subject_slug text not null,
  subject_name text not null,
  title text not null,
  description text,
  unit text,
  topic text,
  scribd_url text not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists scribd_resources_subject_idx on public.scribd_resources (subject_slug);
create index if not exists scribd_resources_branch_idx on public.scribd_resources (branch);

grant select on public.scribd_resources to anon;
grant select, insert, update, delete on public.scribd_resources to authenticated;
grant all on public.scribd_resources to service_role;

alter table public.scribd_resources enable row level security;
drop policy if exists "public read scribd" on public.scribd_resources;
create policy "public read scribd" on public.scribd_resources for select to anon, authenticated using (true);
drop policy if exists "admins manage scribd" on public.scribd_resources;
create policy "admins manage scribd" on public.scribd_resources for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists scribd_resources_updated_at on public.scribd_resources;
create trigger scribd_resources_updated_at before update on public.scribd_resources
  for each row execute function public.update_updated_at_column();