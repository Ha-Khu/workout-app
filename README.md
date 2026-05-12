# 💪 Workout Tracker

A full-stack workout tracking application built with React, Node.js, and MySQL.

## 🚀 Live Demo

_Coming soon..._

## 🛠️ Tech Stack

**Frontend:**

- React + Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast

**Backend:**

- Node.js + Express
- MySQL + mysql2
- JWT Authentication
- bcryptjs

## ✨ Features

- 🔐 User authentication (register/login with JWT)
- 🏋️ Create and track workouts with exercises and sets
- 📚 Exercise library (add/delete exercises)
- 🏆 Personal records tracking
- 📈 XP and level system
- 📊 Workout history
- 🔒 Each user sees only their own data

## 📸 Screenshots

_Coming soon..._

## ⚙️ Installation

### Prerequisites

- Node.js
- MySQL

### Clone the repository

```bash
git clone https://github.com/tvoje-meno/workout-tracker.git
cd workout-tracker
```

### Backend setup

```bash
cd server
npm install
```

Create `.env` file in `server/`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=workout_tracker
JWT_SECRET=your_jwt_secret
PORT=5000
```

```bash
node index.js
```

### Frontend setup

```bash
cd client
npm install
npm run dev
```

## 🗄️ Database Schema

- **users** – user accounts with XP and level
- **workout** – workout sessions
- **exercise_library** – global exercise library
- **workout_exercise** – exercises in a workout
- **workout_set** – sets for each exercise
- **personal_record** – personal records per exercise

## 👨‍💻 Author

[Dávid](https://github.com/Ha-Khu)
