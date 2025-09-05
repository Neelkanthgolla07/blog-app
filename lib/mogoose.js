 import mongoose from 'mongoose';

const connectionDatabase = async () => {
  try {
    const mongoUrl = process.env.MongoUrl;

    if (!mongoUrl) {
      throw new Error('MongoUrl environment variable is not defined');
    }

    await mongoose.connect(mongoUrl);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

export default connectionDatabase;
