# 🔗 Cohorent Frontend

A full-stack developer networking platform where developers can discover other developers, build professional connections, chat in real time, and grow their professional network.

🌐 **Live Product:** https://cohorent.me

## 🧪 Interview Demo Walkthrough

Start the backend with `SEED_DEMO_DATA=true`, open the frontend, and choose
**Fill demo account** on the login screen.

Use the seeded Alex account to demonstrate:

1. Developer discovery and connection requests on the home feed.
2. The incoming request under **Requests**.
3. The accepted connection under **Connections**.
4. Chat history and real-time messaging with Jordan.

---

## 📌 About

**Cohorent** is a MERN-based developer networking platform designed to help developers discover other developers, connect with them, and communicate through one focused platform.

Users can create developer profiles, discover other developers, send and manage connection requests, chat with their connections in real time, and access premium membership plans.

This repository contains the **React + Vite frontend** of Cohorent.

---

## ✨ Key Features

### 🔐 Authentication

- User signup and login
- JWT-based authentication
- Protected routes
- Secure cookie-based authentication flow

### 👨‍💻 Developer Discovery

- Browse developer profiles
- View developer information
- Discover developers for networking
- Responsive developer cards

### 🤝 Connections

- Send connection requests
- Accept or reject incoming requests
- Manage connection requests
- View accepted connections

### 💬 Real-Time Chat

- One-to-one real-time messaging
- Chat with accepted connections
- Real-time communication using Socket.IO
- Real-time chat interface

### 👤 Profile Management

- View user profile
- Edit profile information
- Update personal and developer details

### 💎 Premium Membership

#### Silver Membership

- Unlimited chats with connections
- 100 connection requests per day
- Silver verified badge
- Ad-free experience
- 2-month validity

#### Gold Membership

- Additional premium features
- Unlimited connection requests per day
- Gold verified badge
- Ad-free experience
- 6-month validity

### 💳 Payments

- Razorpay payment integration
- Premium membership purchase flow
- Payment-based membership activation

### 📱 Responsive UI

- Responsive across desktop, tablet, and mobile devices
- Built with Tailwind CSS and DaisyUI

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Redux Toolkit
- Axios
- Socket.IO Client
- Tailwind CSS
- DaisyUI

### Backend Integration

- REST APIs
- JWT authentication
- Socket.IO real-time communication

---

## 🧠 Frontend Architecture

The frontend follows a component-based React architecture with Redux Toolkit for global application state.

```text
User
 │
 ▼
React + Vite
 │
 ├── React Router
 ├── Redux Toolkit
 ├── Axios ───────────────► Express REST APIs
 │
 └── Socket.IO Client ────► Socket.IO Server
                              │
                              ▼
                         Node.js Backend
                              │
                              ▼
                         MongoDB Atlas
