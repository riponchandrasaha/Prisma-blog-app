# 🚀 Restaurant Backend API

A scalable backend API built with **Express, Prisma, and Better Auth**, featuring:

- Modular architecture  
- Role-based authorization (ADMIN / USER)  
- Session-based authentication  
- Production-ready structure for real-world apps  

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Better Auth (session-based auth)
- Zod (validation)
- Docker (optional)

---

## 📁 Project Structure

```text
restaurant-backend/
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/env.ts
│   ├── lib/prisma.ts
│   ├── lib/auth.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   └── error.middleware.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── user/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.route.ts
│   │   ├── product/
│   │   ├── order/
│   │   └── payment/
│   │
│   └── routes/index.ts
│
├── prisma/schema.prisma
├── .env
├── package.json
├── tsconfig.json
└── README.md