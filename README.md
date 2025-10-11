# Stack-Station (Next.js)

## Auth & Onboarding (new)
- Sign In: /auth/sign-in (email + password, Google button)
- Sign Up: /auth/sign-up (full name, email, password, Google button)
- Onboarding: /onboard/workstation (Name, Location, Phone number, Email optional, Address)

Notes:
- BetterAuth integration points are scaffolded in the UI and API placeholder at /api/auth/google. Replace placeholders with actual BetterAuth setup (credentials and Google provider) and connect to your database (Prisma) per the system guide.
- First registered user in a workstation should be assigned ADMIN. The current API mock returns ADMIN; wire to DB checks in production.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000.

## Environment variables (for real auth)
Add the following to your environment when implementing BetterAuth + Google:
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NEXT_PUBLIC_APP_URL (e.g., http://localhost:3000)
- JWT_SECRET
- DATABASE_URL (PostgreSQL for Prisma)

Refer to .github/copilot-instructions.md for the broader system design and API surface.
