# ReturnDesk Application

## Deployed URL
- Live Demo: [TO_BE_PASTED_AFTER_VERCEL_DEPLOYMENT]

## Tech Stack
- Next.js 14 App Router, PostgreSQL (Neon), Prisma ORM, Tailwind CSS

## Core Business Logic (Server-Side)
- Enforces lifecycle status progression (OPEN -> IN_REVIEW -> APPROVED/REJECTED -> COMPLETED).
- Approval requires resolution type; REFUND requires amount > 0.
- Prevents duplicate live requests for same item on order.
- Locks records on final decision; restricts soft-deletes to OPEN/REJECTED.