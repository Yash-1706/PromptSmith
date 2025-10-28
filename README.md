# PromptSmith - AI Prompt Engineering Playground

An AI-powered prompt engineering platform that allows users to create, test, refine, and evaluate AI prompts using the Gemini API.

## Features

- **User Authentication**: Secure JWT-based login and registration
- **Prompt Management**: Create, edit, delete, and organize prompts
- **AI Integration**: Test prompts live with Gemini API
- **Version History**: Track prompt refinements and AI responses
- **Modern UI**: Dark-themed, responsive React interface

## Tech Stack

### Frontend

- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Zustand for state management
- TanStack Query for API calls

### Backend

- Node.js with Express
- MongoDB Atlas with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Google Gemini AI integration

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Google Gemini API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd promptsmith
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:

   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start Backend**

   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend** (in a new terminal)

   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the app**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Prompts

- `GET /api/prompts` - Get user's prompts
- `POST /api/prompts` - Create new prompt
- `GET /api/prompts/:id` - Get specific prompt
- `PUT /api/prompts/:id` - Update prompt
- `DELETE /api/prompts/:id` - Delete prompt

### AI Integration

- `POST /api/ai/test` - Test prompt with Gemini
- `POST /api/ai/refine` - Refine prompt
- `POST /api/ai/evaluate` - Evaluate prompt

## Usage

1. Register/Login to create an account
2. Create new prompts in the dashboard
3. Test prompts with the Gemini AI
4. View response history and version tracking
5. Edit and refine prompts as needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
