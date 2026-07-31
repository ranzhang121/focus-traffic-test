create table public.visitors (
  id uuid primary key default gen_random_uuid(),
  ip text not null unique check (char_length(ip) between 1 and 45),
  visit_count bigint not null default 1 check (visit_count >= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.visitors enable row level security;

create function public.record_visit(client_ip text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if client_ip is null or char_length(client_ip) = 0 or char_length(client_ip) > 45 then
    raise exception 'invalid ip address';
  end if;

  insert into public.visitors (ip, visit_count)
  values (client_ip, 1)
  on conflict (ip) do update
    set visit_count = visitors.visit_count + 1,
        updated_at = now();
end;
$$;

revoke all on function public.record_visit(text) from public;
grant execute on function public.record_visit(text) to anon;
