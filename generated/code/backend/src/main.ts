import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';





const app = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  }
});

const prisma = new PrismaClient();

async function start() {
  try {
    // Initialize services and controllers




    // Register plugins
    await app.register(cors, {
      origin: true,
      credentials: true
    });

    // Register routes
  // MetaRoutes disabled for now - enable when meta-routes generator is integrated
  // await app.register(MetaRoutes, {
  //   prefix: '/api'
  // });


    const preferredPort = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    const host = process.env.HOST || '0.0.0.0';

    // Try to start server with automatic port fallback
    let port = preferredPort;
    let started = false;
    const maxAttempts = 10;

    for (let i = 0; i < maxAttempts && !started; i++) {
      port = preferredPort + i;
      try {
        await app.listen({ port, host });
        started = true;

        if (i > 0) {
          console.log(`⚠️  Port ${preferredPort} was in use, using ${port} instead`);
        }
        console.log(`🚀 Server running on http://${host}:${port}`);
        console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
      } catch (err: any) {
        if (err.code === 'EADDRINUSE' && i < maxAttempts - 1) {
          // Port in use, try next port
          continue;
        } else {
          // Different error or ran out of attempts
          throw err;
        }
      }
    }

    if (!started) {
      throw new Error(`Could not find available port in range ${preferredPort}-${preferredPort + maxAttempts - 1}`);
    }
  } catch (err) {
    app.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down gracefully...');
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n👋 Shutting down gracefully...');
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
});

start();
