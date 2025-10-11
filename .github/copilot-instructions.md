---

title: "Stack-Station — System Guide"
version: 1.2.0
author: "AppBakery LTD"
deployment: "Vercel"
database: "PostgreSQL (Prisma)"
framework: "Next.js (App Router)"
payment: "Paystack (Card + Dedicated Virtual Accounts - DVA)"
auth: "BetterAuth (RBAC)"
email: "Nodemailer"
last_updated: 2025-10-08
agent_ready: true
-----------------

# Stack-Station — System Guide

*A product of AppBakery LTD*

> **Purpose / Overview (AI-Agent friendly)**
>
> Stack-Station is a SaaS product that enables Nigerian co-working and workstation owners to manage **time-based desk/room rentals**, **reservations**, **check-ins**, and **subscription billing** with strong reconciliation and security using **Paystack (card + DVA)**. This guide is written for engineers, product owners, and AI agents that will implement, maintain, or automate Stack-Station.

---

## Table of Contents

1. Overview
2. Global decisions & constraints
3. Roles & Portals (detailed)

   * Super Admin Portal
   * Landing Page & Onboarding flow
   * Admin Portal (Workstation Owner)
   * Sales Rep / Cashier Portal
   * Physical Context: Walk-in users (not a system role)
4. Core Workflows (step-by-step)
5. Payment & DVA flows (detailed technical)
6. Data model (Prisma examples)
7. API surface (specs & sample payloads)
8. Notifications & real-time events (expiry popups)
9. Reporting: daily sales breakdown & calendar filter
10. Security & compliance
11. UI/UX and accessibility notes
12. Deployment (Vercel) & infra notes
13. AI Agent: build checklist & automation tasks
14. Testing & acceptance criteria
15. Appendix: SQL snippets, sample webhooks, and wireframe notes

---

## 1. Overview

Stack-Station provides a minimal, secure, and auditable way for workspace owners to: create and price segments/floors (Regular, VIP, Private), accept walk-in or online reservations, check customers in and start timed sessions, extend sessions, and reconcile revenue. Owners subscribe to Stack-Station (Basic / Standard / Premium) and pay via **Card** or **Dedicated Virtual Account (DVA)**. Super Admin (AppBakery) manages the platform and can manually activate subscriptions using coupon codes.

This document is intended to be machine and human readable; sections flagged with **Agent Task** contain step-by-step instructions an AI or automation process can follow.

---

## 2. Global decisions & constraints

* **Payment providers**: Primary integration with **Paystack** (Card + DVA). Keep abstractions so other providers (Flutterwave) can be added later.
* **Backend + Frontend**: Single Next.js app using the App Router. Server-side code in Next.js API routes (or server functions). Use Vercel for deployment (frontend + backend serverless). PostgreSQL with Prisma as ORM.
* **Auth & RBAC**: BetterAuth (or equivalent) for multi-role auth; enforce least privilege. Sales Reps have the narrowest scope.
* **Sessions & Timers**: Session timers are authoritative on the server. Use Redis or in-memory job scheduler for push notifications and expiry handling if necessary.
* **No inventory/pos management**: This product **does not** manage inventory — focus is solely on workstation rentals and related financial reconciliation.

---

## 3. Roles & Portals (detailed)

> NOTE: "Customer" / walk-in user is **not** a separate portal role — it is a physical context for Sales Rep actions. We do not create a public portal for walk-ins unless the workspace owner enables online booking.

### 3.1 Super Admin Portal (AppBakery LTD)

**Who**: AppBakery internal operators.

**Main objectives**:

* Onboard & verify Admin accounts (workstation owners)
* Manage subscription plans & limits
* Monitor platform-wide metrics and per-workspace reports
* Approve manual activations and handle disputes
* Issue coupon codes for manual activation
* Inspect and replay payment webhooks and errors

**UI / Pages**:

* Dashboard (platform KPIs: MRR, active workspaces, revenue for date range)
* Workspaces list (search, filter by plan/status)
* Workspace detail (per-workspace analytics, DVA status, subscription timeline)
* Payments & Webhooks monitor (show raw payloads, signature check, replay)
* Coupon manager (create/revoke coupons)
* User account & role management (suspend / reset credentials)
* Audit log viewer (filterable)
* Support & dispute tickets

**Key features & acceptance criteria**:

* Can generate a DVA for a workspace (toggle on/off)
* Can manually mark an offline payment as verified and optionally issue coupon activation
* Can view per-workspace daily sales and compare with Super Admin totals
* Can export CSV for any date range
* All actions generate an audit log entry (actor, timestamp, changes)

**APIs used by this portal** (examples):

* `GET /api/super/workspaces` (admin-only)
* `GET /api/super/workspaces/:id/metrics` (revenue, reservations)
* `POST /api/super/coupons` (create coupon)
* `POST /api/super/workspaces/:id/activate` (manual activation)

**Agent Task**: Implement an admin CLI task `reconcile-dva-payments` that lists unallocated DVA payments and attempts auto-assign by matching metadata.

---

### 3.2 Landing Page & Owner Signup (Public)

**Purpose**: Convert workstation owners into Admins (subscribers). Provide clear steps for non-technical owners to pay (DVA) or pay by card.

**Content & Flow**:

1. Public landing pages with product copy, plan comparison (Basic / Standard / Premium), FAQs, and contact form.
2. Owner clicks "Get Started" → Signup form (company name, email, phone, workspace address, estimate of desks).
3. Onboarding wizard: create workspace, choose plan, choose payment method (Card or DVA), optionally start free trial.
4. If Card selected: redirect to Paystack Checkout, on success create subscription record and schedule billing
5. If DVA selected: System calls `POST /api/payments/dva/create` which returns bank details to display. Owner makes transfer; Paystack notifies via webhook; system activates subscription automatically when webhook verified.

**Onboarding wizard steps for non-technical owners**:

* Step 1: Basic info (company, store name)
* Step 2: Number of physical segments/floors and initial pricing skeleton (1–3 hr, 4–6 hr)
* Step 3: Payment method (Card or DVA) + enable trial toggle
* Step 4: Add first Sales Rep (optional) — owner can defer
* Step 5: Quick tour / how to accept walk-ins and check-in

**Agent Task**: When creating a workspace, the agent should create a default DVA request but not create until owner confirms "Use DVA" option.

---

### 3.3 Admin Portal (Workstation Owner)

**Who**: Owners of a physical workspace.

**Primary goals**:

* Configure facility (floors/segments), time-based pricing
* Manage Sales Reps and permissions
* View and reconcile daily sales using calendar filters
* See live occupancy and session expiries
* Manage subscription (upgrade/downgrade/renew)

**UI / Pages**:

* Workspace Dashboard (today's occupancy, active sessions, revenue)
* Workstations / Segments management (add/edit segments like VIP, Ground floor)
* Pricing matrix (set per-segment time bands and prices)
* Sales Rep management (invite, role assignment, revoke)
* Reservations (pending, active, expired)
* Sales & Reports (calendar filter + CSV export)
* Payments (subscription status, DVA details, invoices)
* Settings (opening hours, grace period, notification preferences)

**Important features (detailed)**:

* **Segment pricing**: For each segment, Admin defines a price table: e.g., 1–3 hrs -> ₦3,000; 4–6 hrs -> ₦5,000; Overnight -> ₦X
* **Reservation grace period**: Admin sets default (e.g., 15 minutes). Unchecked reservations auto-cancel.
* **Sales transparency**: Every transaction recorded with `repId`, `method` (cash/card/DVA), `segment`, `duration`, `workstationId`, `checkinTime`, `checkoutTime`.
* **Calendar filter**: Admin can pick a date or range and see aggregated totals, and drill down by rep and segment.
* **Manual reconciliation**: Admin can upload a bank statement CSV to assist manual reconciliation (advanced).

**APIs used by this portal**:

* `GET /api/admin/workspaces/:id/dashboard`
* `POST /api/admin/workspaces/:id/segments` (create segment)
* `POST /api/admin/workspaces/:id/prices` (set price bands)
* `GET /api/admin/reports/sales?start=YYYY-MM-DD&end=YYYY-MM-DD`

**Acceptance criteria**:

* Admin can create segments and price bands and they immediately affect sales calculation
* Admin can view per-rep totals and export CSV
* Admin can mark offline payments as verified (creates transaction entry with `verifiedBy` set to superAdmin or admin)

---

### 3.4 Sales Rep / Cashier Portal

**Who**: The on-site front-desk staff who accept payments, check customers in, and start timed sessions.

**Primary goals**:

* Quickly process walk-ins (select segment + duration)
* Accept payment (cash marking or Paystack PWA / POS URL)
* Start session timer and optionally extend
* See personal sales history and shift summary (end-of-day close)

**UI / Pages**:

* Quick POS-style screen: segment dropdown, duration buttons, price preview, payment method chooser, start session button
* Active Sessions list: remaining time and extend button
* My Transactions: list of transactions the rep processed (filter by date)
* Shift close-out: rep submits final cash tally for Admin verification

**Security & restrictions**:

* Sales Reps cannot modify or delete transactions
* Sales Rep can only see transactions they created (unless Admin toggles view)
* Optionally require PIN for high-value overrides

**APIs used**:

* `POST /api/sales/checkin` { workspaceId, segmentId, durationBandId, customerName?, paymentMethod }
* `POST /api/sales/extend` { sessionId, additionalDuration }
* `GET /api/sales/transactions?repId=xxx&start=...&end=...`

**Acceptance criteria**:

* A checkin creates a Session, Transaction record and starts server-side timer
* If paymentMethod == 'cash', transaction is recorded as `pending` until admin reconciliation (or mark as paid by admin)
* Rep sees popups when sessions are near expiry or expired

---

### 3.5 Physical Context: Walk-in users (explanation)

* Walk-in customers interact physically with Sales Rep. They are not separate system users unless they have an account.
* For traceability, Sales Rep should optionally capture a customer name or phone number for receipts and refunds.

---

## 4. Core Workflows (step-by-step)

This section is explicit and actionable for an AI agent to implement the flows.

### 4.1 Workspace Owner Signup (Landing Page)

1. Owner fills signup form → `POST /api/onboard/workspace` → returns temporary workspace token.
2. Owner chooses plan.
3. If card: redirect to Paystack Checkout → `onSuccess` webhook triggers `POST /api/payments/subscribe/confirm`.
4. If DVA: call `POST /api/payments/dva/create` -> returns `{ account_number, bank, reference }` display to owner; when Paystack webhook for DVA transfer arrives, activate subscription.
5. On success: show onboarding wizard to add segments, price bands, and a Sales Rep.

### 4.2 Walk-in check-in flow (Sales Rep)

1. Sales Rep: select `segment` and `durationBand` on POS screen.
2. System calculates price (server-side call for reliable pricing): `POST /api/sales/price`.
3. Sales Rep chooses payment type:

   * **Cash:** record `Transaction` with status `paid_cash` and Session created and `status=active`. Server logs as cash.
   * **DVA/Bank Transfer:** display DVA or shared bank details; mark `Transaction` as `pending` and create Session with `status=active` (or `reserved` until payment verified depending on business rule).
   * **Paystack PWA / Card:** redirect to Paystack or present Paystack PWA modal; on success webhook marks transaction `paid`
4. Server creates `Session` with `startAt`, `endAt` (startAt + duration) and `transactionId` linked.
5. Timer starts and UI shows countdown. Popup at configured TTL (e.g., 5 minutes left) appears.

### 4.3 Session expiry and extension

* Server runs scheduler (CRON or job queue) to set `status=expired` when `endAt` is passed.
* When 5 minutes remain, server emits a `session.expiry.warning` event to workspace subscribers (Admin dashboard + Sales Rep) via WebSockets.
* To extend: `POST /api/sales/extend` -> if payment required, process payment and on success update `endAt`.

### 4.4 Subscription manual activation via coupon

1. Owner pays offline to company account.
2. Super Admin verifies proof and creates coupon `POST /api/super/coupons` { workspaceId, planId, expiresAt }.
3. Owner redeems coupon `POST /api/admin/coupons/redeem` -> system activates subscription and schedules next renewal appropriately.

---

## 5. Payment & DVA flows (technical)

### 5.1 Goals

* Support both Card (Paystack Checkout) and DVA bank transfers.
* Keep PCI scope zero — never store raw card data.
* Use webhook verification with HMAC signatures.

### 5.2 DVA lifecycle

1. Admin/Owner requests DVA: `POST /api/payments/dva/create` → request payload: `{ workspaceId, metadata }`.
2. Backend calls Paystack DVA API to create a dedicated virtual account for workspace and stores the returned details in `DVAccount` table: `{ accountNumber, bank, reference, createdAt }`.
3. Owner displays DVA details to make transfer.
4. Paystack notifies via webhook `POST /api/webhooks/paystack` with event `transfer.success` or `dva_transfer` (provider-specific). Backend verifies signature and matches metadata/ref to workspace.
5. On verified payment: create `Transaction` record with `method: 'dva'`, `status: 'paid'`, and update Subscription / Session accordingly.

### 5.3 Webhook security

* Verify HMAC signature header (Paystack has `x-paystack-signature` or provider specific header).
* Store raw payload in `PaymentEvent` table for replay or investigation.
* If webhook cannot be processed, enqueue for retry and flag Super Admin.

### 5.4 Sample webhook handling pseudocode

```js
// express-style pseudocode
app.post('/api/webhooks/paystack', verifySignature, async (req, res) => {
  const event = req.body;
  await db.paymentEvent.create({ raw: event });
  if (event.type === 'charge.success') { /* map to subscription or session */ }
  res.status(200).send('ok');
});
```

---

## 6. Data model (Prisma-esque)

Below is a recommended Prisma model. Adjust fields to your needs; store minimal PII.

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role
  createdAt DateTime @default(now())
}

enum Role {
  SUPER
  ADMIN
  REP
}

model Workspace {
  id            String   @id @default(cuid())
  name          String
  ownerId       String
  plan          Plan
  planLimit     Int
  dvaAccountId  String?
  createdAt     DateTime @default(now())
}

enum Plan { BASIC STANDARD PREMIUM }

model Segment {
  id          String @id @default(cuid())
  workspaceId String
  name        String
  createdAt   DateTime @default(now())
}

model PriceBand {
  id          String @id @default(cuid())
  segmentId   String
  minHours    Int
  maxHours    Int
  amount      Int
}

model Reservation {
  id           String @id @default(cuid())
  workspaceId  String
  segmentId    String
  createdById  String?
  startAt      DateTime
  endAt        DateTime
  status       String // pending, active, completed, expired
  sessionId    String?
}

model Session {
  id            String @id @default(cuid())
  reservationId String?
  startAt       DateTime
  endAt         DateTime
  status        String // active, expired, completed
  transactionId String?
}

model Transaction {
  id           String @id @default(cuid())
  workspaceId  String
  repId        String?
  method       String // cash, card, dva
  amount       Int
  status       String // pending, paid, failed
  details      Json?
  createdAt    DateTime @default(now())
}

model DVAccount {
  id           String @id @default(cuid())
  workspaceId  String
  accountNumber String
  bank         String
  reference    String
  createdAt    DateTime @default(now())
}

model Coupon {
  id String @id @default(cuid())
  code String @unique
  workspaceId String?
  discount Int?
  expiresAt DateTime?
}

model AuditLog {
  id String @id @default(cuid())
  actorId String?
  action String
  meta Json?
  createdAt DateTime @default(now())
}
```

---

## 7. API surface (specs & sample payloads)

Below are the key endpoints that an AI agent should scaffold first. Authentication: Bearer token with role checks.

### Auth

* `POST /api/auth/login` { email, password } -> { token }
* `POST /api/auth/refresh` { refreshToken } -> { token }

### Super Admin

* `GET /api/super/workspaces` -> list of workspaces
* `GET /api/super/workspaces/:id/metrics?start=YYYY-MM-DD&end=YYYY-MM-DD` -> revenue & usage
* `POST /api/super/coupons` { workspaceId, code, expiresAt }
* `POST /api/super/workspaces/:id/dva` -> create DVA via provider

### Landing / Onboard

* `POST /api/onboard/workspace` { companyName, email, phone, plan } -> { workspaceId, nextStep }
* `POST /api/payments/dva/create` { workspaceId } -> { bank, accountNumber, reference }

### Admin

* `POST /api/admin/workspaces/:id/segments` { name }
* `POST /api/admin/segments/:id/prices` { minHours, maxHours, amount }
* `GET /api/admin/reports/sales?start=&end=` -> { totals, byRep, bySegment }
* `POST /api/admin/sales/verify` { transactionId } -> mark verified

### Sales / Cashier

* `POST /api/sales/checkin` { workspaceId, segmentId, priceBandId, repId, paymentMethod, customerName? }
* `POST /api/sales/extend` { sessionId, addHours }
* `GET /api/sales/transactions?repId=&start=&end=` -> list

### Payments & Webhooks

* `POST /api/payments/create_checkout` { workspaceId, amount } -> { checkoutUrl }
* `POST /api/webhooks/paystack` -> webhook handler

**Sample checkin request**

```http
POST /api/sales/checkin
Authorization: Bearer <REP_TOKEN>
Content-Type: application/json

{
  "workspaceId": "wrk_abc",
  "segmentId": "seg_vip",
  "priceBandId": "pb_1",
  "repId": "rep_123",
  "paymentMethod": "card",
  "customerName": "Ada"
}
```

**Sample checkin response**

```json
{
  "sessionId": "sess_abc",
  "transactionId": "tx_123",
  "startAt": "2025-10-08T10:00:00Z",
  "endAt": "2025-10-08T13:00:00Z",
  "status": "active"
}
```

---

## 8. Notifications & real-time events (expiry popups)

**Architecture options**:

* **WebSocket (preferred)**: Use a lightweight WebSocket server (Socket.io or Pusher). Server emits `session.warning` and `session.expired` events to subscribers (Admin dashboard, Sales Rep clients) based on session timers.
* **Polling**: Client polls `GET /api/admin/sessions/active` every 30s (fallback for low infra).
* **Push SMS/WhatsApp**: Integrate Termii or Africa's Talking for critical alerts (optional).

**Server job responsibilities**:

* Scheduler monitors sessions and emits `warning` event when `endAt - warningThreshold` reached.
* Scheduler marks sessions as `expired` when `endAt` passed and emits `expired` event.

**Event payload**

```json
{ "event": "session.warning", "sessionId": "sess_abc", "minutesLeft": 5 }
```

---

## 9. Reporting: Daily sales breakdown & calendar filter

**UI behaviour**:

* Calendar component allows selecting single day or range.
* On selection, call `GET /api/admin/reports/sales?start=&end=` which returns aggregated totals and grouped breakdown by `repId` and `segmentId`.

**Server SQL Example**:

```sql
SELECT rep_id, segment_id, SUM(amount) as total, COUNT(*) as tx_count
FROM transactions
WHERE workspace_id = $workspaceId
  AND created_at BETWEEN $start AND $end
GROUP BY rep_id, segment_id
ORDER BY total DESC;
```

**CSV export**: API `GET /api/admin/reports/sales/export?start=&end=` which streams a CSV `transactionId, date, repName, segmentName, duration, amount, paymentMethod, status`.

---

## 10. Security & compliance

* Use HTTPS/TLS everywhere. Vercel provides TLS by default.
* Use Paystack tokens and do not store card numbers — rely on provider tokenization.
* Validate webhooks using provider-supplied signature header.
* RBAC: `SUPER`, `ADMIN`, `REP` with clear authorization rules on each endpoint.
* Audit logs for all financial actions (create transaction, verify, mark as refunded).
* Secrets & environment variables stored securely in Vercel and in CI secrets store (GitHub Actions secrets).

---

## 11. UI/UX and accessibility notes

* Mobile-first responsive layout for Sales Rep POS screens. Quick-action buttons and large touch targets.
* Use Framer Motion for subtle transitions (not required for core function); ensure motion-reduced settings available.
* Colors and visual indicators for session state: active (green), expiring (amber), expired (red).
* Accessibility labels on key buttons for screen readers.

---

## 12. Deployment (Vercel) & infra notes

**Architecture**:

* Frontend + API routes deployed to Vercel. Serverless functions handle short tasks.
* PostgreSQL hosted on Railway/Render. Use connection pooling (PgBouncer) for serverless environments.
* Redis (optional) for job scheduling / pub-sub for WebSockets.

**Vercel env vars (minimum)**:

* DATABASE_URL
* NEXT_PUBLIC_PAYSTACK_KEY
* PAYSTACK_SECRET
* NEXT_PUBLIC_APP_URL
* JWT_SECRET
* NODEMAILER_SMTP_URL

**Webhook URL**:

* Configure `https://<your-vercel-domain>/api/webhooks/paystack` as webhook handler in Paystack dashboard

**Agent Task**: Create GitHub Actions to run `prisma migrate deploy`, `pnpm build`, and deploy to Vercel Preview. On `main` push, auto-deploy to production.

---

## 13. AI Agent: build checklist & automation tasks

This section is written as a step list an AI agent can follow to fully scaffold the platform.

### Phase 0 — Repo & infra

1. Create repo `stack-station` with LICENSE and README
2. Scaffold Next.js App Router project with TypeScript and Tailwind
3. Add Prisma and setup PostgreSQL dev database
4. Configure BetterAuth / auth library (JWT flow)
5. Add environment variable template `.env.example`

### Phase 1 — Core models & migrations

1. Add Prisma models from section 6 and run `prisma migrate dev`
2. Seed admin user (SUPER) and create sample workspace

### Phase 2 — Payment integration

1. Integrate Paystack SDK for Checkout and DVA creation
2. Implement `POST /api/payments/dva/create` and `POST /api/payments/create_checkout`
3. Add webhook endpoint with signature verification

### Phase 3 — Portals & UI

1. Super Admin dashboard pages
2. Landing page & onboarding wizard
3. Admin portal: segments, pricing, reports
4. Sales Rep POS: quick register and check-in

### Phase 4 — Real-time & notifications

1. Add Socket.io server or Pusher integration
2. Implement scheduler (BullMQ/Redis) to emit session warnings and expiries

### Phase 5 — Reporting & export

1. Implement `GET /api/admin/reports/sales` and CSV export
2. Add calendar component and filters in Admin UI

### Phase 6 — QA & deployment

1. Add unit tests for pricing logic and webhook verification
2. Configure GitHub Actions for CI (run lint, tests) and CD to Vercel
3. Deploy to Vercel staging and test webhooks

**Agent acceptance criteria**: Each endpoint must have tests verifying role-based access & business logic (e.g., price calculation, session expiry, DVA matching)

---

## 14. Testing & acceptance criteria

* Price calculation: given segment and duration, server returns correct price
* Session lifecycle: check-in -> active -> warning -> expired
* Payments: card & DVA create paid transaction on webhook
* Reconciliation: Admin calendar report totals match transaction sums
* RBAC: REP cannot access Super Admin endpoints

---

## 15. Appendix (snippets)

### 15.1 SQL: daily totals by rep

```sql
SELECT rep_id, SUM(amount) as total_sales, COUNT(*) as tx_count
FROM transactions
WHERE workspace_id = $1
  AND created_at::date = $2
GROUP BY rep_id
ORDER BY total_sales DESC;
```

### 15.2 Sample Paystack webhook payload (simplified)

```json
{
  "event": "charge.success",
  "data": {
    "reference": "ps_abc123",
    "amount": 300000,
    "metadata": { "workspaceId": "wrk_abc" }
  }
}
```

### 15.3 Sample UI flow wireframe notes (POS screen)

* Large "Segment" dropdown
* Duration quick-buttons [1h] [3h] [6h]
* Price preview (server call)
* Payment buttons: [Cash] [Card] [DVA]
* Start Session button (visible after payment confirmed)

---

## Final notes for the AI Agent

* This guide assumes direct access to provider credentials (Paystack) and Vercel deploy permissions.
* Use feature flags for DVA creation and for switching between Paystack and a future provider.
* The system must prioritize security, auditability and simplicity for non-technical owners.

---

*End of guide*

