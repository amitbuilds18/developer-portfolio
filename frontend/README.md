# 🚀 Developer Portfolio Web Application

A modern, responsive, high-performance portfolio web application built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

Designed specifically to showcase projects, skills, and resume downloads for recruiters and hiring managers.

---

## 📁 Project Structure

```text
developer-portfolio/
├── public/                 # Static assets (favicons, resume.pdf)
│   └── resume.pdf          # Your downloadable resume
├── src/
│   ├── components/         # Modular React UI components
│   │   ├── Navbar.tsx      # Sticky header with mobile menu & resume button
│   │   ├── Hero.tsx        # High-impact introduction & call-to-actions
│   │   ├── About.tsx       # Bio & core competencies
│   │   ├── Skills.tsx      # Categorized skill badges
│   │   ├── Projects.tsx    # Featured projects showcase with live demo links
│   │   ├── Experience.tsx  # Interactive career & education timeline
│   │   ├── Contact.tsx     # Direct contact info, social links & contact form
│   │   └── Footer.tsx      # Footer with back-to-top button
│   ├── data/
│   │   └── portfolioData.ts # ⭐️ Single file to customize all text, projects & links
│   ├── App.tsx             # Root page layout
│   ├── index.css           # Global Tailwind CSS imports & styles
│   └── main.tsx            # React application entry point
├── index.html              # HTML shell & font definitions
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration with Tailwind CSS plugin
```

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

---

## ⚙️ How to Customize

All your portfolio content (Name, Bio, Projects, Social links, Skills) is maintained in a single file:
👉 **`src/data/portfolioData.ts`**

Simply update the values in that file and your portfolio updates instantly!

To update your resume:
👉 Replace the file at **`public/resume.pdf`** with your actual PDF resume.

---

## 🌐 Free 1-Click Deployment to Vercel

1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/developer-portfolio.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) using your GitHub account.
3. Click **"Add New Project"** and select `developer-portfolio`.
4. Click **"Deploy"**.
5. You will receive a live URL: `https://your-name.vercel.app`!
