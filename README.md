# 💰 Digital Wallet Platform

A **secure, role-based digital wallet system** built with **React (TypeScript)** and **Node.js (Express)**. The platform allows **users, agents, and admins** to manage transactions with a modern, responsive UI and real-time updates powered by Redux and RTK Query!

---

## 🚀 Overview

This is a **full-stack application** that simulates a digital wallet service. It includes:

- **JWT Authentication**
- **Role-based separate Dashboards**
- **Secure Transactions**
- **Responsive UI** with Tailwind CSS and Shad Cn and other ui blocks from various sources
- **Data Visualization** using chart components and Interactive Guided Tour using **React JoyRide**

---

## 🛠 Tech Stack

### **Frontend**

- ⚛ **React (TypeScript)**
- 🔄 **Redux Toolkit + RTK Query**
- 🌍 **React Router**
- 🎨 **Tailwind CSS, ShadCn and other blocks**

### **Backend**

- 🟢 **Node.js + Express**
- 🗄 **MongoDB + Mongoose**
- 🔐 **JWT + bcrypt**

---

## Live Links

- Front-end(current repo): [https://qui-cash-front-end.vercel.app/](https://qui-cash-front-end.vercel.app/)
- Back-end: [https://quicash-digitalwallet-express.onrender.com/](https://quicash-digitalwallet-express.onrender.com/)
- Note! The backend takes a few moments to spin up! please visit the backend URL to wake it up before proceeding to the front-end URL

---

## Testing Credentials

### Admin

```
phone: 01744161517
password: admin_password
```

### Agent

```
phone: 01715151515
password: admin_password
```

---

## ✨ Features

### ✅ **Public Section**

- **Home Page** — Hero banner, responsive design with guided tour on first visit
- **About, Features, Contact, FAQ** pages
- **Pricing Page** to display service fees

### ✅ **Authentication**

- **Login / Register** with JWT
- Role selection: **User** or **Agent** while signing up
- Persistent sessions & secure token storage
- Role-based separated dashboards with respective features

### ✅ **User Dashboard**

- Wallet overview with **real-time balance**
- **Cash Out, Send Money, (Cash In through Agent like bKash)**
- Transaction history with **pagination & filters**
- Profile management

### ✅ **Agent Dashboard**

- **Cash In** for users
- Track handled transactions
- Profile management

### ✅ **Admin Dashboard**

- Overview: total users, agents, transaction stats
- Manage users, block/unblock any account. Blocked accounts can't visit their dashboards, nor can they perform transactions
- Advanced transaction filtering & search
- Add money to literally any account (as admin)
- Profile management

### ✅ **General Features**

- Role-based navigation
- Skeleton loaders & smooth transitions
- **Toast notifications** for feedback
- **Guided Tour** with `react-joyride`
- Dark/Light **Theme Toggle**
- Fully **responsive design**

---

## 📂 Project Structure

```
project-root/
├── public/
│
├── src/
│   ├── assets/            # Static files like images, icons, etc.
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions or helper libraries
│   ├── pages/             # Page-level components (routes)
│   ├── redux/             # Redux Toolkit slices, store, and RTK Query
│   ├── App.css            # Global CSS for the App component
│   ├── App.tsx            # Root App component
│   ├── index.css          # Global styles
│   ├── main.tsx           # App entry point (React DOM render)
│   ├── routes.ts          # Centralized app route definitions
│   └── vite-env.d.ts      # Vite TypeScript environment definitions
│
├── .env                   # Environment variables
├── .gitignore             # Git ignore file

```

---

## ⚡ Installation & Setup

### **Steps**

```bash
# Clone repository
git clone https://github.com/Towhidkarim/qui-cash-front-end

#Navigate to the project directory
cd qui-cash-front-end

#Run installation commands
pnpm install

#Set Environment variable, for example like this

VITE_BACKEND_URL='http://localhost:4000/api/v1'

#Start in dev mode
pnpm dev

```
