const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config({ path: 'D:\\MERN_PROJECT\\backend\\.env' });

console.log('Environment variables loaded:');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'defined' : 'undefined');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'defined' : 'undefined');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'defined' : 'undefined');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/prompts', require('./routes/promptRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));