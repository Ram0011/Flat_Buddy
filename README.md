# Flat_Buddy 🏡

Flat_Buddy is a modern web platform designed to help users list and find rental flats as well as discover compatible roommates based on lifestyle and preference filters. The system uses a scalable microservice architecture with a powerful and responsive frontend.

---

## 🌟 Features

- 🔍 **Browse Flats** – Explore available rental listings with full details.
- 🏘️ **List Your Property** – Landlords or users can list their own flats for rent.
- 👯 **Roommate Matching** – Match with potential roommates based on filters like profession, habits, and lifestyle.
- 🧑‍💼 **Authentication** – Secure login/register system with JWT-based auth.
- 🧾 **User Profiles** – Manage personal details and posted listings.
- 📱 **Responsive Design** – Mobile-friendly and intuitive UI.
- ✨ **Smooth Animations** – Interactive and appealing transitions using Motion.dev.

---

## 🛠️ Tech Stack

### Frontend (React + Vite)
- **React.js**
- **Ant Design (antd)** – UI components
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Animations (motion.dev)
- **Axios** – HTTP client
- **React Router DOM** – Routing

### Backend (Microservices)
The backend follows a **microservice architecture** built using multiple technologies:
- 🔹 **Node.js** – Handles user authentication and session management
- 🟦 **Spring Boot** – Manages roommate matching, profile services
- 🟥 **.NET Core** – Handles flat listing and search services

### Database
- **MySQL** – Shared relational database for all services

---

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ram0011/Flat_Buddy.git
cd Flat_Buddy
cd Frontend_project
npm install
npm run dev

