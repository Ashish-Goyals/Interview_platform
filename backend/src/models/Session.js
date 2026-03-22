import mongoose from 'mongoose';
import {requireAuth} from '@clerk/express';

const sessionSchema = new mongoose.Schema (
  {
    problem: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required:true,
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active',
    },
    callID: {
      type: String,
      default: '',
    },
  },
  {timestamps: true}
);
const Session = mongoose.model ('Session', sessionSchema);
export default Session;
