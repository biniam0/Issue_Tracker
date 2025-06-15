# 🐛 Issue Tracker

A modern and minimal issue tracking application built with [Next.js](https://nextjs.org/), Prisma, PostgreSQL, and deployed on [Vercel](https://vercel.com/).

---

## 🚀 Getting Started

To run the development server locally:

```bash
# Using npm
npm install
npm run dev
```

Then open your browser and visit:  
👉 [http://localhost:3000](http://localhost:3000)

You can start editing the app by modifying `app/page.tsx`. The page auto-updates as you save.

---

## 🔧 Features

- ✅ Create, edit, and manage issues
- 🔍 Filter issues by status (Open, In Progress, Closed)
- 📄 Pagination support for large lists
- ⚡️ Fast refresh and streamlined dev experience
- 🎨 Clean and responsive UI with [Radix UI](https://www.radix-ui.com/)
- 🧠 Built with App Router (`app/` directory in Next.js 13+)

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js 14](https://nextjs.org) (App Router, TypeScript)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon](https://neon.tech))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Deployment:** [Vercel](https://vercel.com)
- **UI Components:** [Radix Themes](https://www.radix-ui.com/themes)

---

## 🌐 Deployment

### ▶️ Deploy on Vercel

Click the button below to deploy your own copy of the Issue Tracker app:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### ✅ Environment Variables

Before deploying, make sure to set the following environment variables in your Vercel project settings:

| Key            | Value                                                                  |
|----------------|------------------------------------------------------------------------|
| `DATABASE_URL` | Your PostgreSQL connection string (e.g. from [Neon](https://neon.tech))<br>Make sure it includes `?sslmode=require` |

Example:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/dbname?sslmode=require"
```

---

## 📚 Learn More

- [📖 Next.js Documentation](https://nextjs.org/docs)
- [⚙️ Prisma Documentation](https://www.prisma.io/docs)
- [🎨 Radix UI](https://www.radix-ui.com/themes)
- [🚀 Vercel Deployment Guide](https://vercel.com/docs)

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
