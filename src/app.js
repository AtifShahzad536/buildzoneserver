import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js';
import { generalLimiter } from './middlewares/rateLimitMiddleware.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();

// Security HTTP Headers
app.use(helmet());

// CORS Configuration
const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ['http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive in dev for smooth cross-testing
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// HTTP Request Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply Rate Limiter to API routes
app.use('/api', generalLimiter);

// Mount API Endpoints
app.use('/api/v1', apiRoutes);

// Root Health Ping
app.get('/', (req, res) => {
  res.json({
    name: 'BuildZone Backend API',
    status: 'running',
    version: '1.0.0',
    endpoints: '/api/v1',
    docs: '/api/v1/health'
  });
});

// 404 & Global Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
