import logger from '../utils/logger';
import prisma from './prisma';

const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.clear();
    logger.info('🚀 Database connected');
  } catch (err) {
    console.log('❌ Database connection failed');
    logger.error(err);
    process.exit(1);
  }
};

export default connectToDatabase;
