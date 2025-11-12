/**
 * JetStream Backend Server
 * Main entry point
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { connectMongoDB, connectPostgres } from './config/database';
import { errorHandler } from './middlewares/errorHandler';
import { rateLimiter } from './middlewares/rateLimiter';

// Import routes
import authRoutes from './routes/authRoutes';
import trackRoutes from './routes/trackRoutes';
import playlistRoutes from './routes/playlistRoutes';
import userRoutes from './routes/userRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
import audioRoutes from './routes/audioRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true,
}));
app.use(compression()); // Compress responses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging

// Rate limiting
app.use('/api', rateLimiter);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'JetStream API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/users', userRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/audio', audioRoutes); // YouTube audio extraction (Discord bot style!)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

// Initialize databases and start server
async function startServer() {
  try {
    // Skip database connections for now (we only need audio API)
    console.log('⚠️  Skipping database connections (audio API only mode)');
    // await connectMongoDB();
    // await connectPostgres();
    
    app.listen(PORT, () => {
      console.log(`🚀 JetStream Backend Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`🎵 Audio API: http://localhost:${PORT}/api/audio/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
