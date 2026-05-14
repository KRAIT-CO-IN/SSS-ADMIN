# SSS Food World — Admin Portal (Vercel + Supabase)

Internal admin portal. Same Vercel + Supabase stack as the storefront.

## Deploy on Vercel

1. In Vercel "New Project", set:
   - **Application Preset** → `Other` (NOT Next.js)
   - **Build Command** → leave default (`npm run build`)
   - **Output Directory** → `public`
   - **Install Command** → default
2. Add the env vars below
3. Click **Deploy**

### Required env vars

| Var | Value |
|---|---|
| `DATABASE_URL` | Supabase Transaction Pooler URI (port `6543`) + `?pgbouncer=true&connection_limit=1` |
| `DIRECT_URL` | Supabase Direct connection URI (port `5432`) |
| `JWT_SECRET` | 32+ char random string. `openssl rand -hex 32` |
| `ADMIN_EMAIL` | (optional) default `admin@artisangroc.com` |
| `ADMIN_PASSWORD` | (optional) default `Admin@123` |

### Supabase setup

Supabase Dashboard → **Project Settings → Database → Connection string**:
- Transaction pooler (port 6543) → `DATABASE_URL`
- Direct connection (port 5432) → `DIRECT_URL`

If the storefront project is already deployed and points at the same Supabase project, **use the same DB URLs here** — both apps share one database.

## What this build does

Same as storefront, except `admin.html` is renamed to `index.html` so the deployment root **is** the admin login.

## Default admin credentials

After seed runs:
- email: `admin@artisangroc.com`
- password: `Admin@123`

(or whatever you set in `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars)

## Local development

```bash
docker compose up --build
# Admin → http://localhost:8080/admin
```

## Features

- All Products (CRUD with variants, tags, status)
- Add / Edit Product (form with image dropzone)
- Categories list + Add Category
- Transaction History (filters, search, CSV export)
- Settings: Account, Store info + shipping + Magic Checkout, Notifications
- Mobile-responsive (hamburger sidebar drawer)

## Layout

```
admin/
├── api/[...path].mjs       # Vercel serverless function (Fastify)
├── server/src/routes/      # auth, products, categories, orders, settings
├── prisma/                 # schema + seed
├── web/                    # React frontend (admin-*.jsx)
├── vercel.json
├── package.json
└── docker-compose.yml      # local-only
```
