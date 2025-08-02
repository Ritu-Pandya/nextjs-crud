# Next.js Simple Notes CRUD

## Features
- Create, Read, Update, Delete notes
- Next.js App Router
- SQLite database via Prisma (file-based, no server)
- Zero-config: ready to push to GitHub

## Setup

```bash
git clone <your-repo-url>
cd nextjs-crud
npm install

# generate Prisma client and apply migration
npx prisma generate
npx prisma migrate dev --name init

# run
npm run dev
```

App runs at http://localhost:3000.

## Folder Highlights

- `prisma/schema.prisma` – DB schema.
- `lib/prisma.ts` – Prisma client singleton.
- `app/api/notes/route.ts` – List & create.
- `app/note/[id]/route.ts` – Update & delete.
- `app/page.tsx` – UI for listing & creating.
- `app/note/[id]/page.tsx` – View/edit/delete.

## Deploy

You can deploy to Vercel directly; it understands Next.js and will handle SQLite for small use cases (or swap to PostgreSQL by changing Prisma datasource).
