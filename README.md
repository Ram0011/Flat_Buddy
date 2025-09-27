# 🏠 Flat Buddy

**Flat Buddy** is a modern web platform designed to help users list and find rental flats as well as discover compatible roommates based on lifestyle and preference filters.  
It uses a **scalable microservice architecture** with separate backends for authentication and property management, and a powerful **React frontend**.

---

## ✨ Features

- 🔍 **Browse Flats** – Explore available rental listings with full details.  
- 🏡 **List Your Property** – Landlords or users can list their flats for rent.  
- 👥 **Roommate Matching** – Match with compatible roommates based on lifestyle preferences.  
- 🔐 **Authentication & Roles** – Node.js backend handles JWT-based authentication and role-based access control.  
- ⚡ **Scalable Microservices** – Clean separation between authentication and property services.  

---

## 🛠 Tech Stack

### Frontend
- ⚛️ React (JavaScript)  
- 🎨 Tailwind CSS + Ant Design  
- 🎬 Framer Motion (animations)  

### Backend
- 🌱 Spring Boot (Java, Maven) → Flats, properties, tenants  
- 🟩 Node.js + Express → Authentication, JWT, Role management  
- 🗄 MySQL → Database  

---

## 📂 Project Structure

- Flat-Buddy/
- │
- ├── Frontend_project/ # React-based frontend
- │ └── package.json
- │
- ├── BACKEND/ # Spring Boot backend (properties, flats, tenants)
- │ └── pom.xml
- │
- ├── auth-backend/ # Node.js backend (JWT authentication, roles)
- │ └── package.json
- │
- └── README.md


---

## 🚀 Getting Started

### ✅ Prerequisites
Make sure you have the following installed:
- Git  
- Node.js & npm  
- Java JDK & Maven  
- A text editor or IDE (VS Code, IntelliJ, or Eclipse)  

---

# 📥 Installation

Clone the repository:

```bash
git clone https://github.com/Ram0011/Flat-Buddy.git
cd Flat-Buddy
```

## 🎨 Setup Frontend
```
cd Frontend_project
npm install
npm start
```
👉 Runs at: http://localhost:3000

---

## ⚙️ Setup Authentication Backend (Node.js)
```
cd auth-backend
npm install
npm start
```
👉 Runs at: http://localhost:4000

---

## 🏡 Setup Property Backend (Spring Boot)
```
cd BACKEND
mvn clean install
mvn spring-boot:run
```
👉 Runs at: http://localhost:8080

---

## 🔎 Verify Setup
- Frontend → http://localhost:3000
- Auth Backend → http://localhost:4000
- Spring Boot Backend → http://localhost:8080

# 🤝 Contributing
Contributions are welcome! 🎉
1. Fork the repository
2. Create a branch
```
git checkout -b feature/your-feature
```

3. Commit your changes
```
git commit -m "Add feature"
```

4. Push to the branch
```
git push origin feature/your-feature
```

5. Create a Pull Request


# 🌟 Show Your Support
If you like this project, give it a ⭐ on GitHub!
