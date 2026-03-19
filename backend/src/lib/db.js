import mongoose from 'mongoose';
import {ENV} from './env.js';
// import {async} from './db';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect (ENV.MONGO_URI);
    console.log ('DB connected', conn.connection.host);
  } catch (error) {
    console.log ('Error', error);
    process.exit (1);
  }
};
