import app from './app';
import config from './config/config';
import prisma from './lib/prisma';

async function checkMongoDBConnection(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('✅ Successfully connected to MongoDB using Prisma.');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB using Prisma.');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
  checkMongoDBConnection();
});
