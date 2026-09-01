# ReturnDesk 📦

ReturnDesk is an internal dashboard for managing customer return requests, built with Next.js, Prisma, Neon PostgreSQL, and Tailwind CSS.

## 🚀 Live Demo

- **Deployed URL:** [https://returndesk-psi.vercel.app/](https://returndesk-psi.vercel.app/)

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL (Hosted on Neon)
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## ✨ Key Features

- **Return Requests Overview:** View, search, and paginate through customer return requests.
- **Filtering & Search:** Real-time filtering by status, return reason, customer name, email, or order ID.
- **Create Requests:** Add new return requests with duplicate prevention validation.
- **Detailed View:** Inspect request history and associated internal notes.

## 📁 Folder Structure

```text
returndesk/
├── app/
│   ├── api/
│   │   └── requests/
│   │       └── route.ts         # REST API routes (GET, POST)
│   ├── layout.tsx               # App root layout
│   └── page.tsx                 # Dashboard home page (Client component)
├── components/                  # UI Modal and List Components
│   ├── CreateRequestModal.tsx
│   ├── RequestDetailModal.tsx
│   └── RequestList.tsx
├── lib/
│   └── db.ts                    # Prisma client instance
├── prisma/
│   ├── schema.prisma            # Database schema models & enums
│   └── seed.ts                  # Database seeding script
├── public/                      # Static assets
├── .env                         # Environment variables (Ignored in Git)
├── package.json
└── README.md

