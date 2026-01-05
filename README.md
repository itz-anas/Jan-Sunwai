# JAN–SUNWAI
## Public Grievance Redressal System

JAN–SUNWAI is a modern, full-stack Public Grievance Redressal System that enables citizens to submit, track, and manage grievances efficiently. The platform provides a transparent interface for citizens and a centralized dashboard for authorities, built using scalable and production-ready web technologies.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-Fast-yellow)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Utility--First-38bdf8)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express.js](https://img.shields.io/badge/Express.js-REST-lightgrey)
![License](https://img.shields.io/badge/License-ISC-green)
![Status](https://img.shields.io/badge/Status-Development%20Ready-success)


---

## 📌 Key Highlights
- Citizen-centric grievance submission and tracking
- Admin dashboard for grievance management
- Clean, responsive, and accessible UI
- RESTful backend with cloud-ready architecture
- Suitable for hackathons, academic projects, and real-world deployments

---

## 🧰 Technology Stack

### Frontend
- **Vite** – Fast build tool
- **React** – Component-based UI development
- **TypeScript** – Type safety and maintainability
- **Tailwind CSS** – Utility-first styling
- **shadcn/ui** – Modern and accessible UI components

### Backend
- **Node.js**
- **Express.js** – REST API framework
- **CORS** – Secure cross-origin requests
- **In-Memory Storage** – Development environment
- **AWS DynamoDB** – Production-ready database support

---

## ✨ Features

### Citizen Module
- Submit grievances through a simple and intuitive form
- AI-assisted grievance categorization
- Track grievance status using a unique ticket ID
- Fully responsive design for mobile and desktop

### Admin Module
- View and manage all submitted grievances
- Update grievance status (Open, In-Progress, Resolved)
- Perform full CRUD operations

### System Capabilities
- Frontend–backend integration
- Centralized API service layer
- Error handling and validation
- Offline fallback support (basic)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16 or higher
- **npm** or **bun**

### Installation & Run

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd citizen-connect-backend
npm install
cd ..

# Start backend server (Terminal 1)
cd citizen-connect-backend
npm start
```

🌐 Open in browser: http://localhost:8081

### 📁 Project Structure
```bash
citizen-connect/
├── src/                        # Frontend (React + TypeScript)
│   ├── components/            # Reusable UI components
│   ├── context/               # Global state management
│   ├── services/api.ts        # API integration layer
│   └── pages/                 # Page-level components
│
├── citizen-connect-backend/   # Backend (Express.js)
│   ├── server.js              # Main server entry
│   ├── services/              # Business logic
│   └── utils/                 # Utility helpers
│
├── QUICK_START.md             # Quick setup guide
├── SETUP_GUIDE.md             # Detailed setup documentation
└── INTEGRATION_STATUS.md      # Integration details
```
### 🔗 API Reference
Base URL: http://localhost:3000/api

Method	Endpoint	Description
POST	/grievances	Create a new grievance
GET	/grievances	Retrieve all grievances
GET	/grievances/:id	Retrieve grievance by ID
PUT	/grievances/:id	Update grievance details
DELETE	/grievances/:id	Delete a grievance

### 🛠️ Development Commands
Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```
Backend
```bash
npm run start:backend   # Start backend server
npm run dev:backend     # Start backend with auto-reload
```

### ☁️ Deployment
```bash
npm install
npm run dev
```
### 📄 License
This project is licensed under the ISC License.




