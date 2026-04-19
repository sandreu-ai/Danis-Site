# DanielaCerrato.com — Full Build Prompt

> **Hand this entire file to Claude Code (or Codex) as the build spec.**

---

You are a senior full-stack engineer, UX designer, and product architect.

Build a production-ready, mobile-first web application for **DanielaCerrato.com** — a homeschooling brand run by Daniela Cerrato, a Catholic homeschool mom and content creator (@learnlivelovejourney on Instagram).

This is NOT a demo or prototype. Every feature described below must work end-to-end. The design must look like it was crafted by a professional designer — balanced, stylish, and aesthetically pleasing. No generic templates, no AI-generated look.

---

## 🎯 CORE OBJECTIVE

Two users, two experiences:

### Daniela (Admin — non-technical, uses her phone)
- Log in securely from her phone
- Create, edit, and publish blog posts with images (rich text editor)
- Upload and sell digital products (PDFs, printables, curriculum)
- Manage a curated library of recommended products (affiliate links)
- Manage all content easily from a mobile browser

### Visitors
- Browse beautiful blog content
- Discover and purchase digital products
- Get instant download access after payment
- Explore Daniela's curated library of recommended homeschool products
- Sign up for email updates

---

## 🧱 TECH STACK

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (latest, App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Rendering | Server Components by default, Client Components only when necessary |
| API | Server Actions + API routes (webhooks) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| File Storage | Supabase Storage (product files + images) |
| Rich Text Editor | **Tiptap** (must work well on mobile) |
| Payments | Stripe Checkout (one-time payments) |
| Email | **Resend** (transactional emails: purchase confirmations, download links) |
| Email List | Resend Audiences or ConvertKit (email signup/newsletter) |
| Image Processing | **sharp** (resize + compress on upload) |
| Analytics | **Vercel Analytics** + **Vercel Web Vitals** |
| Deployment | Vercel |

---

## 🎨 DESIGN SYSTEM

### Philosophy
The site should feel like picking up a beautifully designed homeschool planner — warm, inviting, intentional, and trustworthy. It should NOT look like a tech startup, a generic Shopify theme, or an AI-generated template.

### Color Palette
- **Primary background:** Warm cream / soft ivory (`#FDF8F0` or similar)
- **Secondary background:** Soft linen / light warm gray (`#F5F0EB`)
- **Accent color:** Muted sage green (`#8FAE8B`) — for buttons, links, highlights
- **Secondary accent:** Dusty rose (`#D4A0A0`) — sparingly, for warmth
- **Text:** Rich charcoal (`#2C2C2C`) for body, slightly lighter for secondary text
- **White:** Clean white (`#FFFFFF`) for cards and contrast sections

_Adjust these to taste — the point is warm, not cold. Earthy, not sterile._

### Typography
- **Headings:** One elegant serif or semi-serif font (e.g., Playfair Display, Lora, or DM Serif Display)
- **Body:** One clean sans-serif (e.g., Inter, DM Sans, or Nunito Sans)
- **Max 2 font families total**
- Line height: 1.6–1.75 for body text
- Generous paragraph spacing
- All text must pass WCAG AA contrast ratio

### Layout Principles
- **Mobile-first** — design for phone screens first, then scale up
- Generous whitespace — let the content breathe
- Clear visual hierarchy: strong headings, intentional section separation
- Consistent spacing system (use Tailwind's spacing scale)
- Cards with subtle shadows and rounded corners
- No visual clutter — every element earns its place
- Smooth, subtle transitions (no jarring animations)

### Imagery
- All images use Next.js `<Image>` component
- Lazy loading by default
- Upload pipeline processes images through **sharp**:
  - Resize to max 1600px width (preserve aspect ratio)
  - Compress to WebP format when possible
  - Generate thumbnail (400px) for grid views
- Placeholder blur effect while loading

---

## 🧭 SITE MAP

### Public Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/blog` | Blog listing with category filtering |
| `/blog/[slug]` | Individual blog post |
| `/shop` | Digital product store |
| `/shop/[slug]` | Individual product page |
| `/library` | Dani's Picks — curated recommended products (affiliate) |
| `/about` | About Daniela |
| `/success` | Post-purchase success/download page |

### Protected Routes (Admin)

| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard overview |
| `/admin/login` | Login page |
| `/admin/posts` | Blog post management |
| `/admin/posts/new` | Create new post |
| `/admin/posts/[id]/edit` | Edit existing post |
| `/admin/products` | Product management |
| `/admin/products/new` | Create new product |
| `/admin/products/[id]/edit` | Edit existing product |
| `/admin/library` | Manage recommended products |
| `/admin/library/new` | Add recommended product |
| `/admin/library/[id]/edit` | Edit recommended product |

---

## 🧩 FEATURE SPECIFICATIONS

### 1. HOMEPAGE

Sections (in order):

1. **Hero** — Full-width hero with:
   - Headline (e.g., "Faith-Filled Homeschooling for Real Families")
   - Subheadline (1–2 sentences about Daniela's mission)
   - CTA button → Shop or Blog
   - Background: soft gradient or subtle pattern (not a stock photo placeholder)

2. **Featured Products** — 3-4 product cards from the shop

3. **Latest Blog Posts** — 3 most recent published posts as cards

4. **Dani's Picks Preview** — 3-4 items from the curated library with "View All →" link

5. **About Section** — Short bio with image placeholder + link to `/about`

6. **Email Signup** — Clean section with:
   - Headline: "Join the Journey"
   - Email input + subscribe button
   - Sends to Resend Audience (or ConvertKit)
   - Success/error feedback

7. **Footer** — Navigation links, social links (Instagram), copyright

---

### 2. BLOG SYSTEM

#### Blog List Page (`/blog`)
- Grid layout (1 col mobile, 2 col tablet, 3 col desktop)
- Each card: featured image, title, excerpt (first 150 chars), date, category badge
- Category filter bar at top (clickable pills)
- Pagination or "Load More"

#### Blog Post Page (`/blog/[slug]`)
- Clean, readable single-column layout (max-width ~720px)
- Featured image (full width of content area)
- Title, date, category
- Rich HTML content (rendered from Tiptap JSON/HTML)
- "More Posts" section at bottom

#### SEO per post:
- Dynamic `<title>` and `<meta description>`
- Open Graph image (use featured image)
- Clean URL slug

---

### 3. DIGITAL PRODUCT SHOP

#### Product Listing (`/shop`)
- Grid layout (1 col mobile, 2 col tablet, 3 col desktop)
- Each card: cover image, title, price, "View" button
- Clean, browseable layout

#### Product Page (`/shop/[slug]`)
- Large cover image
- Title, price, full description
- "Buy Now" button → Stripe Checkout
- Trust elements (secure payment badge, instant download note)

---

### 4. DANI'S PICKS — CURATED LIBRARY (`/library`)

This is an affiliate/recommendation section. NOT products Daniela sells — these are products she recommends.

#### Library List Page
- Grid of recommended products
- Each card: image, title, short description, "Check it out →" button (external link)
- Category filtering (e.g., "Curriculum", "Books", "Supplies", "Faith")

#### Data Model (RecommendedProduct):
- id
- title
- description
- category
- imageUrl (uploaded to Supabase Storage)
- affiliateUrl (external link — Amazon, curriculum site, etc.)
- featured (boolean)
- createdAt

#### Admin can:
- Add/edit/delete recommended products
- Upload an image for each
- Set affiliate URL
- Mark as featured (shows on homepage)
- Categorize

---

### 5. STRIPE CHECKOUT FLOW

This must work end-to-end. No placeholders.

#### Purchase Flow:
1. User clicks "Buy Now" on product page
2. Server Action creates Stripe Checkout Session with:
   - Product name, price, cover image
   - Success URL: `/success?session_id={CHECKOUT_SESSION_ID}`
   - Cancel URL: back to product page
3. User completes payment on Stripe's hosted checkout
4. Stripe sends webhook to `/api/webhooks/stripe`
5. Webhook handler:
   - Verifies signature
   - Records purchase in `purchases` table
   - Generates time-limited signed URL for the product file (Supabase Storage)
   - Sends confirmation email via **Resend** with:
     - Product name
     - Download link (signed URL, expires in 24 hours)
     - Thank you message
6. Success page (`/success`):
   - Shows purchase confirmation
   - Provides download button (generates fresh signed URL)
   - "Continue browsing" link

#### Purchases Table:
- id
- email
- productId
- stripeSessionId
- stripePaymentIntentId
- amount
- createdAt

---

### 6. EMAIL (RESEND)

Two email functions:

1. **Purchase confirmation** — Sent after successful Stripe webhook
   - Clean, branded HTML email
   - Product name, download link, thank you message

2. **Email list signup** — `/api/newsletter/subscribe`
   - Adds email to Resend Audience (or ConvertKit list)
   - Returns success/already-subscribed/error

---

### 7. ADMIN DASHBOARD

The admin is the most important part of this build. If Daniela can't use it easily from her phone, the whole project fails.

#### Design Requirements:
- **Mobile-first** — optimized for phone screens
- Clean sidebar navigation (collapsible on mobile → hamburger menu)
- Large, touch-friendly buttons and inputs
- Clear status indicators (published/draft, etc.)
- Fast loading — no unnecessary client JS

#### Authentication:
- Supabase Auth with email/password
- Middleware protects all `/admin/*` routes
- Redirect to `/admin/login` if not authenticated
- Only pre-approved email(s) can access admin (store allowed emails in env var or DB)

#### Dashboard Home (`/admin`):
- Quick stats: total posts, total products, total library items
- Recent activity (last 5 posts/products modified)
- Quick-action buttons: "New Post", "New Product", "New Recommendation"

---

### ADMIN: BLOG MANAGEMENT

#### Post List (`/admin/posts`):
- Table/list of all posts
- Shows: title, status (published/draft), date, actions
- Actions: Edit, Delete, Toggle publish
- "New Post" button

#### Create/Edit Post (`/admin/posts/new` and `/admin/posts/[id]/edit`):
- **Title** input
- **Slug** (auto-generated from title, editable)
- **Category** (dropdown or free text)
- **Featured Image** upload (drag-and-drop + file picker, processed through sharp)
- **Content** — **Tiptap editor** with:
  - Bold, italic, headings (H2, H3), bullet/numbered lists
  - Block quotes
  - Links
  - Image insertion (upload inline images to Supabase Storage)
  - Code blocks (optional)
  - Clean, usable toolbar that works on mobile
- **Status** toggle: Draft / Published
- **Save** button (saves draft)
- **Publish** button (saves + sets published = true)
- **Preview** — render the post as it will appear on the public site

---

### ADMIN: PRODUCT MANAGEMENT

#### Product List (`/admin/products`):
- Table/list of all products
- Shows: title, price, date, actions
- Actions: Edit, Delete
- "New Product" button

#### Create/Edit Product (`/admin/products/new` and `/admin/products/[id]/edit`):
- **Title** input
- **Slug** (auto-generated, editable)
- **Description** (Tiptap editor — same as blog, for rich descriptions)
- **Price** input (in dollars, stored as cents in DB)
- **Cover Image** upload (processed through sharp)
- **Product File** upload (PDF, ZIP, etc. — stored in Supabase Storage, private bucket)
- **Save** button

---

### ADMIN: LIBRARY MANAGEMENT

#### Library List (`/admin/library`):
- Table/list of all recommended products
- Shows: title, category, featured status, actions
- Actions: Edit, Delete, Toggle featured

#### Create/Edit (`/admin/library/new` and `/admin/library/[id]/edit`):
- Title, description, category, affiliate URL
- Image upload
- Featured toggle
- Save button

---

## 📊 ANALYTICS

- Install **Vercel Analytics** (page views, visitors)
- Install **Vercel Web Vitals** (performance monitoring)
- Both are lightweight and require minimal config
- Add `<Analytics />` and `<SpeedInsights />` components to root layout

---

## 🗄️ DATABASE SCHEMA

### Tables (Supabase PostgreSQL):

```sql
-- Blog posts
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB, -- Tiptap JSON
  content_html TEXT, -- rendered HTML for display
  cover_image_url TEXT,
  category TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Digital products for sale
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description JSONB, -- Tiptap JSON
  description_html TEXT,
  price INTEGER NOT NULL, -- cents
  file_url TEXT NOT NULL, -- Supabase Storage path (private bucket)
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Purchases
CREATE TABLE purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  product_id UUID REFERENCES products(id),
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  amount INTEGER NOT NULL, -- cents
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Dani's Picks (affiliate recommendations)
CREATE TABLE recommended_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  affiliate_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Email subscribers
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  active BOOLEAN DEFAULT true
);
```

### Supabase Storage Buckets:
- `images` — public bucket (cover images, blog images, library images)
- `products` — **private** bucket (downloadable product files — PDFs, ZIPs)

### Row Level Security:
- Public tables (posts, products, recommended_products): SELECT for published/all, INSERT/UPDATE/DELETE require auth
- Purchases: INSERT via service role (webhook), SELECT require auth
- Subscribers: INSERT public (for signups), SELECT/UPDATE require auth
- Product files bucket: private, accessed only via signed URLs

---

## 🔐 SECURITY

- All `/admin` routes protected by Supabase Auth middleware
- Admin access restricted to specific email(s) via `ADMIN_EMAILS` env var
- Stripe webhook signature verification on every webhook call
- Product files in private Supabase bucket — only accessible via time-limited signed URLs
- All form inputs validated server-side (zod)
- CSRF protection via Server Actions
- File upload validation: check file type, enforce size limits (images: 10MB, products: 100MB)
- Sanitize all user-generated HTML content

---

## 🔎 SEO

- Dynamic `<title>` and `<meta description>` on every page
- Open Graph tags (og:title, og:description, og:image) on every page
- Structured data (JSON-LD) for products (Product schema)
- Clean URL slugs
- `sitemap.xml` (auto-generated from posts + products + static pages)
- `robots.txt`
- Canonical URLs

---

## 📱 MOBILE OPTIMIZATION

This site will be used primarily on phones — both by visitors AND by Daniela in the admin.

- All layouts must be mobile-first
- Touch targets: minimum 44px height for all interactive elements
- No horizontal scrolling
- Images responsive and optimized
- Admin forms must be comfortable to use on a phone keyboard
- Tiptap toolbar must be usable on mobile (compact, scrollable if needed)
- Test all admin flows mentally for thumb-reachability

---

## ⚡ PERFORMANCE

- Server Components by default
- Client Components only for interactivity (editor, forms, modals)
- `next/image` for all images with proper `sizes` attribute
- Image processing pipeline (sharp) on upload
- Minimize client-side JavaScript bundle
- Use `loading.tsx` for Suspense boundaries
- Static generation where possible (blog posts, product pages)
- ISR (Incremental Static Regeneration) for content pages

---

## 📁 PROJECT STRUCTURE

```
daniela-cerrato/
├── .env.local.example          # Template for env vars
├── next.config.ts
├── tailwind.config.ts
├── package.json
├── README.md                   # Setup instructions
│
├── public/
│   └── fonts/                  # Self-hosted fonts if needed
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, analytics, metadata)
│   │   ├── page.tsx            # Homepage
│   │   ├── about/
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Blog post
│   │   ├── shop/
│   │   │   ├── page.tsx        # Product listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Product page
│   │   ├── library/
│   │   │   └── page.tsx        # Dani's Picks
│   │   ├── success/
│   │   │   └── page.tsx        # Post-purchase
│   │   ├── admin/
│   │   │   ├── layout.tsx      # Admin layout (sidebar, auth check)
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── login/
│   │   │   ├── posts/
│   │   │   ├── products/
│   │   │   └── library/
│   │   └── api/
│   │       ├── webhooks/
│   │       │   └── stripe/
│   │       │       └── route.ts
│   │       ├── newsletter/
│   │       │   └── subscribe/
│   │       │       └── route.ts
│   │       └── upload/
│   │           └── route.ts    # Image processing endpoint
│   │
│   ├── components/
│   │   ├── ui/                 # Reusable UI primitives
│   │   ├── blog/               # Blog-specific components
│   │   ├── shop/               # Shop-specific components
│   │   ├── admin/              # Admin-specific components
│   │   └── editor/             # Tiptap editor wrapper
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Browser client
│   │   │   ├── server.ts       # Server client
│   │   │   └── admin.ts        # Service role client
│   │   ├── stripe.ts           # Stripe helpers
│   │   ├── resend.ts           # Email helpers
│   │   ├── image.ts            # Sharp processing helpers
│   │   └── utils.ts            # General utilities
│   │
│   ├── actions/                # Server Actions
│   │   ├── posts.ts
│   │   ├── products.ts
│   │   ├── library.ts
│   │   └── newsletter.ts
│   │
│   └── types/
│       └── index.ts            # Shared TypeScript types
│
├── emails/                     # Resend email templates (React Email)
│   └── purchase-confirmation.tsx
│
└── supabase/
    └── schema.sql              # Database schema + RLS policies
```

---

## 🔑 ENVIRONMENT VARIABLES

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend
RESEND_API_KEY=

# Admin
ADMIN_EMAILS=daniela@example.com

# App
NEXT_PUBLIC_APP_URL=https://danielacerrato.com
```

---

## 📦 DELIVERABLES

1. **Complete, working application** — every feature described above
2. **Database schema file** (`supabase/schema.sql`) — ready to run in Supabase SQL editor
3. **Email template** — branded purchase confirmation via React Email + Resend
4. **README.md** with:
   - Step-by-step Supabase setup (create project, run schema, configure auth, create storage buckets, set RLS)
   - Stripe setup (create products vs. dynamic pricing, webhook endpoint, API keys)
   - Resend setup
   - Environment variable configuration
   - Local development instructions
   - Vercel deployment instructions
5. **Seed data**:
   - 1 example blog post (with real-ish homeschool content)
   - 1 example digital product (placeholder PDF)
   - 2 example recommended products

---

## 🚫 ANTI-REQUIREMENTS (What NOT to do)

- Do NOT use placeholder "Lorem ipsum" content — write real example content
- Do NOT leave any TODO comments for critical functionality
- Do NOT use `any` type in TypeScript — type everything properly
- Do NOT install a full UI component library (no shadcn, no MUI) — build clean custom components with Tailwind
- Do NOT make the admin desktop-only — it must work beautifully on mobile
- Do NOT store product files in a public bucket
- Do NOT skip Stripe webhook verification
- Do NOT leave console.logs in production code
- Do NOT over-abstract — keep it readable and maintainable

---

## ✅ DEFINITION OF DONE

The build is complete when:

- [ ] A visitor can browse the blog, filter by category, and read posts
- [ ] A visitor can browse the shop, view a product, and complete a real Stripe purchase
- [ ] After purchase, the buyer receives an email with a download link AND sees a download button on the success page
- [ ] A visitor can browse Dani's Picks and click through to affiliate links
- [ ] A visitor can subscribe to the email list
- [ ] Daniela can log in to the admin from her phone
- [ ] Daniela can create a blog post with images using the Tiptap editor and publish it
- [ ] Daniela can upload a digital product with cover image and file
- [ ] Daniela can add/edit/delete recommended products in the library
- [ ] All pages are responsive and look polished on mobile
- [ ] All pages have proper SEO metadata
- [ ] Analytics are integrated
- [ ] The site loads fast (target: 90+ Lighthouse performance score)
- [ ] The code is clean, typed, and well-organized
