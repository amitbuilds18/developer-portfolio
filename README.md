# 🚀 Full-Stack Developer Portfolio

A production-ready full-stack portfolio web application with a modern React frontend and a Node.js Express backend connected to **Neon Serverless PostgreSQL**.

---

## 📁 Project Structure

```text
developer-portfolio/
├── frontend/                     # React 19 + TypeScript + Tailwind CSS v4
│   ├── src/
│   │   ├── components/           # Navbar, Hero, About, Skills, Projects, Contact, Footer
│   │   ├── data/portfolioData.ts # ⭐️ Single file to customize all portfolio info
│   │   └── App.tsx
│   ├── vite.config.ts            # Proxy configured for /api -> localhost:5000
│   └── package.json
│
├── backend/                      # Node.js + Express + TypeScript + Neon PostgreSQL
│   ├── src/
│   │   ├── db.ts                 # Neon PostgreSQL connection pool & auto-table creation
│   │   └── server.ts             # REST API (POST /api/contact, GET /api/health)
│   ├── .env                      # Contains your DATABASE_URL (from Neon console)
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 🐘 Neon PostgreSQL Setup (2 Minutes)

1. Go to [neon.tech](https://neon.tech) and sign up for free.
2. Click **"Create Project"** (e.g., `portfolio-db`).
3. In your Neon dashboard, copy the **Connection string** (it looks like):
   ```text
   postgresql://neondb_owner:npg_xxxx@ep-xyz-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Open `backend/.env` and paste your string:
   ```env
   DATABASE_URL=your_neon_connection_string_here
   PORT=5000
   CLIENT_URL=http://localhost:3000
   ```
5. **That's it!** When the backend starts, it automatically creates the `messages` table for you:
   ```sql
   CREATE TABLE IF NOT EXISTS messages (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(255) NOT NULL,
     subject VARCHAR(255),
     message TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );
   ```

---

## 🛠️ How to Run Locally

### 1. Run Backend:
```bash
cd backend
npm run dev
```
Backend will start on `http://localhost:5000`.

### 2. Run Frontend:
In a new terminal window:
```bash
cd frontend
npm run dev
```
Frontend will open on `http://localhost:3000`.

When a visitor submits the contact form, the message is stored directly in your Neon PostgreSQL database!
