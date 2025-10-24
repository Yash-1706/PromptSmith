# PromptSmith – AI Prompt Engineering Playground

## 1. Project Overview

**Project Name:** PromptSmith  
**Type:** Full-Stack MERN Web Application with AI Integration  

**Description:**  
PromptSmith is an **AI-powered prompt engineering platform** that allows users to create, test, refine, and evaluate AI prompts using the **Gemini API**. Users can save prompts, compare outputs, and track version history.

**Tech Stack:**
- **Frontend:** React.js + Tailwind CSS + Zustand/Redux + React Query  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB Atlas (Mongoose ODM)  
- **Authentication:** JWT + bcrypt  
- **AI Integration:** Gemini API (text generation, evaluation, refinement)  
- **Deployment:**  
  - Frontend → Vercel  
  - Backend → Render / Railway  

---

## 2. Objectives

- Allow users to **create, edit, delete, and view prompts**.  
- Integrate **Gemini API** to test prompts and get AI-generated outputs.  
- Maintain **secure user authentication** and role-based access.  
- Present a **modern, responsive UI** for prompt management.  

---

## 3. User Roles & Permissions

| Role   | Description | Permissions |
|--------|-------------|-------------|
| User   | Registered user | Create, edit, delete prompts; test prompts; view prompt history |
| Admin  | Platform administrator | Manage users; full access |

---

## 4. Core Features

### 4.1 Prompt Management
- CRUD operations for prompts  
- Each prompt contains:
  - Title  
  - Prompt text  
  - Category/tag  
  - AI-generated outputs  
  - Version history  
  - Creation and update timestamps  

### 4.2 AI Integration (Gemini API)
- Test prompts live using Gemini  
- Store AI-generated outputs in database  
- Maintain version history of prompt refinements  

### 4.3 User Dashboard
- Display user’s saved prompts  
- View prompt details and AI outputs  
- Compare outputs for different versions  

### 4.4 Authentication & Authorization
- JWT-based login and signup  
- Password hashing using bcrypt  
- Role-based access control (User/Admin)  

---

## 5. System Architecture
Frontend (React) <--> Backend (Express) <--> MongoDB Atlas
| |
| --> Gemini API (text generation & evaluation)
|
--> Zustand/Redux + React Query (state management)


---

## 6. Database Schema (Mongoose)

### 6.1 User Schema
```js
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String, // hashed
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: Date,
  updatedAt: Date
}

6.2 Prompt Schema
{
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'User' },
  title: String,
  promptText: String,
  category: String,
  aiResponses: [
    {
      responseText: String,
      createdAt: Date
    }
  ],
  versions: [
    {
      promptText: String,
      aiResponse: String,
      createdAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}

7. REST API Endpoints
| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/register` | Register user            |
| POST   | `/api/auth/login`    | Login & get JWT          |
| GET    | `/api/auth/me`       | Get current user profile |


7.2 Prompt Routes
| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | `/api/prompts`     | Create new prompt        |
| GET    | `/api/prompts`     | Get all prompts for user |
| GET    | `/api/prompts/:id` | Get single prompt        |
| PUT    | `/api/prompts/:id` | Update prompt            |
| DELETE | `/api/prompts/:id` | Delete prompt            |


7.3 AI Routes
| Method | Endpoint           | Description                            |
| ------ | ------------------ | -------------------------------------- |
| POST   | `/api/ai/test`     | Send prompt to Gemini & get AI output  |
| POST   | `/api/ai/refine`   | Refine prompt using Gemini suggestions |
| POST   | `/api/ai/evaluate` | Evaluate prompt (clarity, creativity)  |

8. Frontend Structure
/frontend
├── src/
│   ├── api/
│   │   ├── authAPI.js
│   │   ├── promptAPI.js
│   │   └── aiAPI.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PromptCard.jsx
│   │   ├── PromptEditor.jsx
│   │   ├── AIOutput.jsx
│   │   └── VersionHistory.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── PromptDetails.jsx
│   │
│   ├── context/ or store/
│   │   └── useAuthStore.js
│   │
│   ├── utils/
│   │   └── formatDate.js
│   │
│   ├── App.jsx
│   └── main.jsx


9. Backend Structure
/backend
├── server.js
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── promptController.js
│   └── aiController.js
├── models/
│   ├── User.js
│   └── Prompt.js
├── routes/
│   ├── authRoutes.js
│   ├── promptRoutes.js
│   └── aiRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
└── utils/
    └── geminiClient.js


10. Gemini API Integration Flow

Frontend sends prompt to backend /api/ai/test

Backend calls Gemini API via geminiClient.js

Gemini returns output → backend saves in DB → frontend displays

Version history and outputs are stored for each prompt

11. Deployment Plan

Frontend: Vercel

Backend: Render / Railway

Database: MongoDB Atlas

Environment Variables:

MONGO_URI → MongoDB connection string

JWT_SECRET → JWT signing secret

GEMINI_API_KEY → Gemini API key

12. Deliverables

GitHub repository (frontend + backend)

Deployed app links (Vercel frontend + Render backend)

README with setup instructions, screenshots, and demo