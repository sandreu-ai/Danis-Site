# DanielaCerrato.com

A production-ready Next.js website for Daniela Cerrato's homeschooling brand. Features a public blog, digital product shop with Stripe payments, curated affiliate library, and a full mobile-first admin dashboard.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Payments:** Stripe Checkout
- **Email:** Resend
- **Rich Text:** Tiptap
- **Image Processing:** Sharp
- **Analytics:** Vercel Analytics + Speed Insights
- **Deployment:** Vercel

---

## Setup Guide

### 1. Clone & Install

```bash
cd daniela-site
npm install
cp .env.local.example .env.local
```

### 2. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the Supabase dashboard, go to **Settings → API**
3. Copy the **Project URL** and **anon/public** key into `.env.local`
4. Copy the **service_role** key (keep this secret — server-only)
5. Go to the **SQL Editor** and run `supabase/schema.sql` — this creates all tables, indexes, triggers, and RLS policies
6. Run `supabase/seed.sql` to add example content
7. Go to **Authentication → Settings**:
   - Enable Email/Password sign-in
   - Disable "Confirm email" if you want to skip email verification during development
8. Create your admin user: go to **Authentication → Users → Add User**, enter Daniela's email and a strong password
9. In `.env.local`, set `ADMIN_EMAILS=daniela@yourdomain.com` (the exact email used above)

**Storage buckets** are created by the schema.sql file. If they fail, create them manually:
- `images` — Public bucket (cover images, blog images, library images)
- `products` — Private bucket (downloadable product files)

### 3. Stripe Setup

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) and create an account
2. Get your **Publishable key** and **Secret key** from **Developers → API keys**
3. For the webhook:
   - Go to **Developers → Webhooks → Add endpoint**
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Select event: `checkout.session.completed`
   - Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`
4. For local testing, install the [Stripe CLI](https://stripe.com/docs/stripe-cli):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   This gives you a local webhook secret for testing.

### 4. Resend Setup

1. Go to [resend.com](https://resend.com) and create an account
2. Verify your domain or use `onboarding@resend.dev` for testing
3. Go to **API Keys** and create a key → `RESEND_API_KEY`
4. Go to **Audiences → Create Audience** → copy the Audience ID → `RESEND_AUDIENCE_ID`
5. Set `RESEND_FROM_EMAIL` to an email on your verified domain

### 5. Environment Variables

Fill in `.env.local` with all values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Resend
RESEND_API_KEY=re_...
RESEND_AUDIENCE_ID=your-audience-id
RESEND_FROM_EMAIL=hello@danielacerrato.com

# Admin
ADMIN_EMAILS=daniela@danielacerrato.com

# App
NEXT_PUBLIC_APP_URL=https://danielacerrato.com
```

> **Local development:** Use `pk_test_` and `sk_test_` Stripe keys. Never put live keys in `.env.local` until you're ready for production.

---

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

Log in with the email/password you created in Supabase Auth.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              Root layout (fonts, analytics)
│   ├── page.tsx                Homepage
│   ├── blog/                   Blog listing + individual posts
│   ├── shop/                   Product listing + product pages
│   ├── library/                Dani's Picks
│   ├── about/                  About page
│   ├── success/                Post-purchase download page
│   └── admin/                  Protected admin dashboard
│       ├── login/              Login page
│       ├── posts/              Blog post management
│       ├── products/           Product management
│       └── library/            Library management
│   └── api/
│       ├── checkout/           Create Stripe checkout session
│       ├── webhooks/stripe/    Stripe webhook handler
│       ├── newsletter/         Email list subscribe
│       └── upload/             Image/file upload handler
├── actions/                    Server Actions (posts, products, library, newsletter)
├── components/
│   ├── ui/                     Shared UI primitives
│   ├── blog/                   Blog cards + category filter
│   ├── shop/                   Product cards + buy button
│   ├── library/                Library cards
│   ├── admin/                  Admin nav, image upload, file upload, delete button
│   └── editor/                 Tiptap rich text editor
├── lib/
│   ├── supabase/               Browser, server, and admin Supabase clients
│   ├── stripe.ts               Stripe instance + checkout helper
│   ├── resend.ts               Resend email helpers
│   ├── image.ts                Sharp image processing
│   └── utils.ts                Shared utilities
└── types/
    └── index.ts                TypeScript interfaces
emails/
└── purchase-confirmation.tsx   React Email template
supabase/
├── schema.sql                  Database schema + RLS policies
└── seed.sql                    Example content
```

---

## Vercel Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your GitHub repo
4. Add all environment variables from `.env.local` in the Vercel dashboard
5. Deploy — Vercel auto-detects Next.js
6. After your first deploy, update `NEXT_PUBLIC_APP_URL` to your production URL
7. Update your Stripe webhook endpoint URL to the production domain
8. Redeploy

**Custom domain:** In Vercel → Settings → Domains → add `danielacerrato.com`

---

## Admin Usage (Daniela)

1. Go to `https://danielacerrato.com/admin`
2. Log in with your email and password
3. **New Post:** Admin → Blog Posts → + New Post → write using the editor → Publish
4. **New Product:** Admin → Products → + New Product → fill in details, upload the file → Save
5. **New Pick:** Admin → Dani's Picks → + New Pick → add affiliate link → Save

Everything works from your phone browser — the admin is fully mobile-optimized.

---

## Testing the Purchase Flow

1. Use Stripe test keys during development
2. Use test card: `4242 4242 4242 4242` (any expiry/CVC)
3. After payment, check:
   - `/success?session_id=...` page shows download button
   - Supabase `purchases` table has a new row
   - Email arrives in your inbox (Resend dashboard shows delivery)
4. For webhook testing locally: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
