# PromptSmith Backend

The backend API for PromptSmith, built with Node.js, Express, and MongoDB. Handles user authentication, prompt management, and AI integration with Google Gemini.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Google Gemini AI** - AI text generation
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Google Gemini API key

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_here
   GEMINI_API_KEY=your_gemini_api_key
   ```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB Atlas connection string | Yes |
| `JWT_SECRET` | Secret key for JWT token signing | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

### Running the Server

#### Development
```bash
npm run dev
```

#### Production
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user info (protected)

### Prompt Routes (`/api/prompts`) - All protected
- `GET /` - Get all user's prompts
- `POST /` - Create new prompt
- `GET /:id` - Get specific prompt
- `PUT /:id` - Update prompt
- `DELETE /:id` - Delete prompt

### AI Routes (`/api/ai`) - All protected
- `POST /test` - Test prompt with Gemini AI
- `POST /refine` - Refine prompt using AI
- `POST /evaluate` - Evaluate prompt quality

## Database Models

### User
- `username`: String (unique, required)
- `email`: String (unique, required)
- `password`: String (hashed, required)
- `createdAt`: Date

### Prompt
- `userId`: ObjectId (reference to User)
- `title`: String (required)
- `promptText`: String (required)
- `category`: String
- `tags`: Array of Strings
- `aiResponses`: Array of response objects
- `versions`: Array of version objects
- `createdAt`: Date
- `updatedAt`: Date

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (if implemented)

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── promptController.js # Prompt CRUD operations
│   └── aiController.js    # AI integration
├── middleware/
│   └── authMiddleware.js  # JWT authentication middleware
├── models/
│   ├── User.js           # User model
│   └── Prompt.js         # Prompt model
├── routes/
│   ├── authRoutes.js     # Auth endpoints
│   ├── promptRoutes.js   # Prompt endpoints
│   └── aiRoutes.js       # AI endpoints
├── utils/
│   └── geminiClient.js   # Gemini API client
├── .env                  # Environment variables (not committed)
├── server.js             # Main server file
└── package.json          # Dependencies and scripts
```

## Error Handling

The API uses consistent error responses:
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Security

- Passwords are hashed using bcryptjs
- JWT tokens for session management
- CORS enabled for frontend communication
- Input validation and sanitization

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Test API endpoints thoroughly
4. Update documentation for new endpoints