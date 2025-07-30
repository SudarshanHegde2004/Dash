require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const projectRoutes = require('./routes/projects');
const calendarRoutes = require('./routes/calendar');
const openaiRoutes = require('./routes/openai');

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

// Enhanced security middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(limiter); // Apply rate limiting to all routes

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Your existing routes
app.use('/api/projects', projectRoutes);
app.use('/api/calendar', calendarRoutes);

// AI routes
app.use('/api/ai', openaiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'operational',
    services: {
      projects: true,
      calendar: true,
      ai: true
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested route ${req.path} does not exist`,
    availableRoutes: [
      '/api/projects',
      '/api/calendar',
      '/api/ai/generate'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Configured routes:');
  console.log('- /api/projects');
  console.log('- /api/calendar');
  console.log('- /api/ai/generate');
  console.log(`CORS configured for origin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});