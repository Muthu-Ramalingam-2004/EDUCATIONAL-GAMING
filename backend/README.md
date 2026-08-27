# MathQuest Backend API Server

High-performance Express.js backend server with Supabase integration for **MathQuest – 9th & 10th Standard Mathematics Gaming Platform**.

## 🚀 Features

- **Express.js API Engine**: Modular architecture with routes, controllers, middleware, and services.
- **Database & Supabase Integration**: PostgreSQL Supabase client configuration with schema persistence.
- **Real-Time Gameplay Calculator**: Calculates scores, accuracy %, XP, coins, streak, level-up state (`levelUp: true/false`, `newLevel`).
- **7 Core Modules**: Auth, Games, Questions, Progress, Rewards, Leaderboards, and Admin Management.

## 🛠️ Setup & Running

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Run development server with auto-reload
npm run dev
```

Server runs at `http://localhost:5000/api`
Health Check: `http://localhost:5000/api/health`
