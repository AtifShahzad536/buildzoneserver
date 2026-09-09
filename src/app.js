import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();

app.set('trust proxy', 1);

// Security HTTP Headers (relaxed for cross-origin APIs)
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// Explicit Global CORS Middleware
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Explicit Header Injection for edge environments
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Body Parsers
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Mount API Endpoints
app.use('/api/v1', apiRoutes);

// Root Health Ping
app.get('/', (req, res) => {
  res.json({
    name: 'BuildZone Backend API',
    status: 'running',
    version: '1.0.0',
    endpoints: '/api/v1'
  });
});

// 404 & Global Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
