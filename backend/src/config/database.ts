/**
 * Database Configuration
 * MongoDB and PostgreSQL connections
 */

import mongoose from 'mongoose';
import { Pool } from 'pg';

// MongoDB Connection
export async function connectMongoDB(): Promise<void> {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jetstream';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// PostgreSQL Connection
let pgPool: Pool;

export async function connectPostgres(): Promise<void> {
  try {
    pgPool = new Pool({
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      database: process.env.POSTGRES_DB || 'jetstream',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD,
    });

    // Test connection
    const client = await pgPool.connect();
    console.log('✅ PostgreSQL connected successfully');
    client.release();
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error);
    throw error;
  }
}

export function getPostgresPool(): Pool {
  return pgPool;
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔌 Closing database connections...');
  await mongoose.connection.close();
  await pgPool.end();
  process.exit(0);
});
