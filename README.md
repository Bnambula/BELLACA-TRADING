# Belaca Trading — Full-Stack Web Platform

Uganda–Kenya cross-border agricultural trade management system.

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Next.js 14 (App Router) + TypeScript |
| Styling    | Tailwind CSS + Custom Design System |
| Auth       | JWT (HttpOnly cookies) + bcrypt + TOTP 2FA |
| Database   | PostgreSQL 16 + Prisma ORM       |
| Cache      | Redis 7 (sessions + rate limiting) |
| Hosting    | Vercel (frontend) + Railway/Supabase (DB) |

## Quick Start

```bash
# 1. Clone and install
npm install

# 2. Set up environment
cp .env.example .env.local
# Fill in your values

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

## Demo Credentials (development only)

| Role          | Email                           | Password      |
|---------------|---------------------------------|---------------|
| Super Admin   | admin@belacatrading.com         | Admin@2026    |
| Accounts      | accounts@belacatrading.com      | Accounts@2026 |
| Stock Manager | stock@belacatrading.com         | Stock@2026    |
| Sales         | sales@belacatrading.com         | Sales@2026    |

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set all environment variables from `.env.example` in your Vercel project dashboard.

## Security Features

- bcrypt password hashing (cost 12)
- JWT with HttpOnly + Secure + SameSite=Strict cookies
- TOTP two-factor authentication
- IP-based rate limiting (5 attempts → 15 min lockout)
- Immutable audit log (append-only, no DELETE)
- Row-level security (PostgreSQL RLS)
- AES-256 encryption at rest
- TLS 1.3 in transit
- CSRF protection
- SQL injection prevention (parameterised queries)
- XSS protection (CSP headers + DOM escaping)
- Security headers (X-Frame-Options, HSTS, etc.)
- Brute-force lockout with exponential backoff

## Role Permissions

| Module           | Super Admin | Admin | Accounts | Procurement | Stock | Sales | Driver |
|------------------|:-----------:|:-----:|:--------:|:-----------:|:-----:|:-----:|:------:|
| View Dashboard   | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| Create Orders    | ✓ | ✓ | — | ✓ | — | ✓ | — |
| Delete Orders    | ✓ | ✓ | — | — | — | — | — |
| View Financials  | ✓ | ✓ | ✓ | — | — | — | — |
| Edit Financials  | ✓ | — | ✓ | — | — | — | — |
| Manage Inventory | ✓ | ✓ | — | ✓ | ✓ | — | — |
| Add/Delete Users | ✓ | — | — | — | — | — | — |
| View Audit Log   | ✓ | ✓ | — | — | — | — | — |

## Project Structure

```
belaca/
├── app/
│   ├── globals.css          # Global design system
│   ├── layout.tsx           # Root layout + metadata
│   ├── page.tsx             # Public homepage
│   ├── login/page.tsx       # Login with rate limiting
│   ├── dashboard/
│   │   ├── layout.tsx       # Dashboard shell + sidebar
│   │   ├── page.tsx         # Main dashboard
│   │   ├── orders/          # Order management
│   │   ├── inventory/       # FIFO/LIFO inventory
│   │   ├── suppliers/       # Supplier directory
│   │   ├── sales/           # Sales ledger
│   │   ├── financials/      # P&L, cash flow, balance sheet
│   │   ├── reports/         # Weekly/monthly/quarterly
│   │   ├── users/           # User & role management
│   │   ├── security/        # Security centre
│   │   └── database/        # DB schema reference
│   ├── api/
│   │   └── auth/login/      # Secure API route + rate limiting
│   └── components/
│       ├── Navbar.tsx       # Responsive navigation
│       └── Footer.tsx       # Site footer
├── middleware.ts            # Route protection + security headers
├── vercel.json             # Vercel config + security headers
├── .env.example            # All required environment variables
└── tailwind.config.ts      # Design tokens
```
