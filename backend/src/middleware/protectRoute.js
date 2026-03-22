import {requireAuth} from '@clerk/express';
import User from '../models/Users.js';

export const protectRoute = [
  requireAuth (),
  async (req, res, next) => {
    try {
      // Get userId from req.auth (without calling it as function)
      const clerkId = req.auth.userId;

      console.log (' protectRoute - Checking auth for:', clerkId);

      if (!clerkId) {
        console.log (' No clerkId found');
        return res
          .status (401)
          .json ({message: 'Unauthorized - invalid token'});
      }

      const user = await User.findOne ({clerkId});

      if (!user) {
        console.log (' User not found in database:', clerkId);
        return res
          .status (400)
          .json ({message: 'Unauthorized - user not found in database'});
      }

      console.log (' User authenticated:', user.email);
      req.user = user;
      next ();
    } catch (error) {
      console.log (' Error in protectRoute middleware', error);
      res.status (500).json ({message: 'Internal server error'});
    }
  },
];
