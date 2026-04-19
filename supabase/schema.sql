-- ============================================================
-- DanielaCerrato.com — Supabase Schema
-- Run this entire file in the Supabase SQL editor
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================================
-- TABLES
-- ============================================================

create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content jsonb,
  content_html text,
  cover_image_url text,
  category text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  description jsonb,
  description_html text,
  price integer not null,
  file_url text not null,
  cover_image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists purchases (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  product_id uuid references products(id) on delete set null,
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  amount integer not null,
  created_at timestamptz default now()
);

create table if not exists recommended_products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text,
  image_url text,
  affiliate_url text not null,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  subscribed_at timestamptz default now(),
  active boolean default true
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists posts_slug_idx on posts(slug);
create index if not exists posts_published_idx on posts(published, created_at desc);
create index if not exists posts_category_idx on posts(category);
create index if not exists products_slug_idx on products(slug);
create index if not exists purchases_session_idx on purchases(stripe_session_id);
create index if not exists recommended_featured_idx on recommended_products(featured);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at();

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

create trigger recommended_products_updated_at
  before update on recommended_products
  for each row execute function update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table posts enable row level security;
alter table products enable row level security;
alter table purchases enable row level security;
alter table recommended_products enable row level security;
alter table subscribers enable row level security;

-- posts: anyone can read published posts; auth required to write
create policy "Public can read published posts"
  on posts for select
  using (published = true);

create policy "Admin can read all posts"
  on posts for select
  to authenticated
  using (true);

create policy "Admin can insert posts"
  on posts for insert
  to authenticated
  with check (true);

create policy "Admin can update posts"
  on posts for update
  to authenticated
  using (true);

create policy "Admin can delete posts"
  on posts for delete
  to authenticated
  using (true);

-- products: anyone can read; auth required to write
create policy "Public can read products"
  on products for select
  using (true);

create policy "Admin can insert products"
  on products for insert
  to authenticated
  with check (true);

create policy "Admin can update products"
  on products for update
  to authenticated
  using (true);

create policy "Admin can delete products"
  on products for delete
  to authenticated
  using (true);

-- purchases: service role only for insert; auth to read
create policy "Service role can insert purchases"
  on purchases for insert
  to service_role
  with check (true);

create policy "Admin can read purchases"
  on purchases for select
  to authenticated
  using (true);

-- recommended_products: anyone can read; auth to write
create policy "Public can read recommended products"
  on recommended_products for select
  using (true);

create policy "Admin can insert recommended products"
  on recommended_products for insert
  to authenticated
  with check (true);

create policy "Admin can update recommended products"
  on recommended_products for update
  to authenticated
  using (true);

create policy "Admin can delete recommended products"
  on recommended_products for delete
  to authenticated
  using (true);

-- subscribers: anyone can insert (sign up); auth to read/update
create policy "Anyone can subscribe"
  on subscribers for insert
  with check (true);

create policy "Admin can read subscribers"
  on subscribers for select
  to authenticated
  using (true);

create policy "Admin can update subscribers"
  on subscribers for update
  to authenticated
  using (true);

-- ============================================================
-- STORAGE BUCKETS
-- Run these separately in the Supabase dashboard Storage section
-- or via the SQL editor:
-- ============================================================

-- Public bucket for images (blog covers, product covers, library images)
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Private bucket for product files (PDFs, ZIPs)
insert into storage.buckets (id, name, public)
values ('products', 'products', false)
on conflict (id) do nothing;

-- Storage RLS: images bucket — anyone can read, authenticated can write
create policy "Public can read images"
  on storage.objects for select
  using (bucket_id = 'images');

create policy "Authenticated can upload images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'images');

create policy "Authenticated can update images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'images');

create policy "Authenticated can delete images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'images');

-- Storage RLS: products bucket — service role only (accessed via signed URLs)
create policy "Service role can read product files"
  on storage.objects for select
  to service_role
  using (bucket_id = 'products');

create policy "Authenticated can upload product files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'products');

create policy "Authenticated can delete product files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'products');
