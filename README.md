# MathQuest – 9th & 10th Standard Mathematics Gaming Platform

A full-stack educational gaming application designed to teach 9th & 10th Standard Mathematics (Algebra, Geometry, Trigonometry, Real Numbers, Statistics & Probability) through an interactive game-first experience.

---

## 📁 Full-Stack Project Structure

```
EDUCATIONAL-MATHS-GAMING/
│
├── frontend/                  # React 18 + Vite Gaming UI
│   ├── src/
│   │   ├── components/        # Layouts & Modals
│   │   ├── screens/           # 17 Interactive Game Screens
│   │   ├── modals/            # Celebration & Profile Modals
│   │   ├── services/          # Axios API Services (Auth, Game, Progress, Rewards, Leaderboard, Admin)
│   │   ├── data/              # Baseline gaming data
│   │   ├── utils/             # Sound Synthesizer & Canvas Confetti
│   │   ├── App.jsx            # State & Router
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # Node.js + Express.js API Server
│   ├── src/
│   │   ├── config/            # Supabase PostgreSQL Configuration
│   │   ├── controllers/       # Auth, Game, Question, Progress, Rewards, Leaderboard, Admin Controllers
│   │   ├── routes/            # Express Router Modules
│   │   ├── middleware/        # JWT Authentication Middleware
│   │   ├── services/          # Persistent Data Service & Score/XP/Level-up Calculators
│   │   ├── data/              # Class 9 & 10 Mathematics Seed Questions
│   │   └── server.js          # Express Entry Point (Port 5000)
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── database/                  # PostgreSQL Database Engine
│   └── schema.sql             # Supabase PostgreSQL DDL Table Schemas & Relational Keys
│
├── README.md                  # Main Documentation
└── .gitignore
```

---

## 🛠️ Quick Start & Setup Guide

### 1. Install & Run Backend Server

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Configure environment variables (optional for default local store)
cp .env.example .env

# Start Express API Server (Runs on http://localhost:5000)
npm run dev
```

- **Health Check Endpoint**: `GET http://localhost:5000/api/health`

---

### 2. Install & Run Frontend Client

```bash
# Open a new terminal and navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start Vite Development Server (Runs on http://localhost:5173)
npm run dev
```

Open `http://localhost:5173/` in your browser to launch the MathQuest application.

---

## 🗄️ Supabase PostgreSQL Setup

1. Create a project at [Supabase.com](https://supabase.com/).
2. Navigate to the SQL Editor in Supabase Dashboard.
3. Copy the contents of `database/schema.sql` and run the script to create the 18 PostgreSQL tables (`users`, `students`, `questions`, `student_game_attempts`, `student_progress`, `rewards`, `leaderboard`, etc.).
4. Update `backend/.env` with your `SUPABASE_URL` and `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`.

---

## 📡 API Endpoint Overview

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Health** | `GET` | `/api/health` | Backend status check |
| **Auth** | `POST` | `/api/auth/register` | Student registration |
| **Auth** | `POST` | `/api/auth/login` | Student / Admin login |
| **Auth** | `GET` | `/api/auth/profile` | Fetch player profile |
| **Games** | `GET` | `/api/games` | Fetch active game modes |
| **Games** | `POST` | `/api/games/:gameId/submit` | Validate answers, calculate score, XP, coins & check level-up |
| **Questions**| `GET` | `/api/questions` | Fetch questions filtered by Class 9 / 10 |
| **Progress** | `GET` | `/api/progress` | Fetch player level, XP, streak, and syllabus progress |
| **Rewards** | `POST` | `/api/rewards/claim` | Claim reward & persist permanently to database |
| **Leaderboard**| `GET` | `/api/leaderboard/daily` | Fetch daily/weekly/monthly/overall player ranks |
| **Admin** | `GET` | `/api/admin/dashboard` | Admin analytics & syllabus content manager |
