ReturnDesk 

ReturnDesk is a web app for viewing, searching, and managing customer return requests. Built with Next.js 14, Prisma, PostgreSQL (Neon), and Tailwind CSS.

-------------------------------------------------------------------------------------------------------------

 Live Project Links

 Live App: [https://returndesk-psi.vercel.app/](https://returndesk-psi.vercel.app/)
 GitHub Repository: [https://github.com/snehasabde/returndesk](https://github.com/snehasabde/returndesk)

-------------------------------------------------------------------------------------------------------------

 Assignment Details

- Time Spent: approx 10 to 12 hours total.
- Assumptions Made:
  - Every new return request starts in the `PENDING` state.
  - Email addresses and Order IDs are checked on the server to prevent duplicate entries.
- Future Improvements:
  - Adding a button to update request statuses directly on the page.
  - Adding user login and admin permissions.

-------------------------------------------------------------------------------------------------------------

How it Was Built (Design Choices)

1. Next.js App Router:
   - All main logic (search, filter, pagination, and data checking) runs on the server side inside `app/api/requests/route.ts`.
   - UI components are kept in a separate `components/` folder to keep the code clean.

2. Database Choice:
   - Used **Prisma** to easily interact with a cloud-hosted **PostgreSQL** database on Neon.

3. User Experience:
   - Real-time search by name, email, or order ID.
   - Filter by return reason or status with pagination.
   - Shows helpful messages when data is loading or if no results are found.

-------------------------------------------------------------------------------------------------------------

 Tech Stack Used Are:-

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Database: PostgreSQL (Hosted on Neon)
- Database Tool: Prisma ORM
- Styling: Tailwind CSS
- Hosting: Vercel

-------------------------------------------------------------------------------------------------------------

 File Structure

```text
returndesk/
├── app/
│   ├── api/requests/route.ts   # Server routes (GET, POST)
│   ├── layout.tsx              # Main layout
│   └── page.tsx                # Main dashboard page
├── components/                 # Page components & popups
│   ├── CreateRequestModal.tsx
│   ├── RequestDetailModal.tsx
│   └── RequestList.tsx
├── prisma/
│   ├── schema.prisma           # Database structure
│   └── seed.ts                 # Sample data generator (32+ items)
├── .env.example                # Sample environment file
└── README.md