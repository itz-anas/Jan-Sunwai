# JAN - SUNWAI - Public Grievance Redressal System

A modern web application for citizens to submit and track their grievances to local authorities. Built with React, TypeScript, and Express.js.

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- npm or bun

### Setup & Run

```bash
# 1. Install dependencies (frontend & backend)
npm install
cd citizen-connect-backend && npm install && cd ..

# 2. Start Backend (in one terminal)
cd citizen-connect-backend && npm start

# 3. Start Frontend (in another terminal)
npm run dev
```

**Open your browser:** http://localhost:8081

For detailed setup, see [QUICK_START.md](./QUICK_START.md)

## 📋 Features

✅ **Frontend**
- Modern React + TypeScript + Vite interface
- Submit grievances with AI-powered categorization
- Track grievance status with ticket numbers
- Admin dashboard for managing grievances
- Beautiful UI with Shadcn/ui components
- Responsive design

✅ **Backend**
- Express.js REST API
- CORS configured
- In-memory storage (development)
- DynamoDB ready (production)
- Full CRUD operations
- Error handling

✅ **Integration**
- Frontend-Backend fully integrated
- API service layer for clean communication
- Real-time API calls
- Fallback support for offline scenarios

## 📁 Project Structure

```
citizen-connect/
├── src/                    # Frontend (React + TypeScript)
│   ├── components/        # UI Components
│   ├── context/           # React Context for state
│   ├── services/api.ts    # API integration layer
│   └── pages/            # Page components
├── citizen-connect-backend/  # Backend (Express.js)
│   ├── server.js         # Express server
│   ├── services/         # Business logic
│   └── utils/           # Helper functions
├── QUICK_START.md        # Quick start guide
├── SETUP_GUIDE.md        # Detailed setup instructions
└── INTEGRATION_STATUS.md # Technical integration details
```

## 🔗 API Endpoints

**Base URL:** http://localhost:3000/api

- `POST /grievances` - Create grievance
- `GET /grievances` - Get all grievances
- `GET /grievances/:id` - Get grievance by ID
- `PUT /grievances/:id` - Update grievance
- `DELETE /grievances/:id` - Delete grievance

## 🛠️ Development

### Frontend Commands
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Backend Commands
```bash
npm run start:backend   # Start backend server
npm run dev:backend     # Start with auto-reload
```

## 📚 Documentation

- [QUICK_START.md](./QUICK_START.md) - Quick setup guide
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup instructions
- [INTEGRATION_STATUS.md](./INTEGRATION_STATUS.md) - Technical integration details

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Citizen Connect
```

### Backend (.env)
```
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:8081
AWS_REGION=ap-south-1
USE_DYNAMODB=false
TABLE_NAME=Grievances
```

## 🚀 Deploy

### Frontend
```bash
npm run build
# Deploy dist/ folder to Vercel, Netlify, or similar
```

### Backend
```bash
# Deploy citizen-connect-backend/ to Heroku, AWS, or similar
# Update environment variables before deployment
```

## 🐛 Troubleshooting

### Port Already in Use
Change PORT in `citizen-connect-backend/.env` and VITE_API_URL in `.env`

### CORS Errors
Verify FRONTEND_URL in backend matches your frontend URL

### Data Not Persisting
By default, data is stored in memory. Set `USE_DYNAMODB=true` to use DynamoDB.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

---

**Status:** ✅ Development Ready

**Last Updated:** January 4, 2026
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


