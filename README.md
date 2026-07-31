# Focus Traffic Test

A minimal Next.js traffic-test website. Opening or refreshing the home page records one visit for the request IP address.

## Local setup

Copy `.env.example` to `.env.local` and set the two values from the Supabase project. Then run:

```bash
npm run dev
```

## Traffic statistics

The site intentionally has no admin page. Query Supabase directly when you need the numbers:

```sql
select coalesce(sum(visit_count), 0) as total_visits
from public.visitors;

select ip as "IP Address", visit_count as "Visits"
from public.visitors
order by visit_count desc;
```

The `visitors` table stores only the IP address, visit count, and the required created/updated timestamps.
