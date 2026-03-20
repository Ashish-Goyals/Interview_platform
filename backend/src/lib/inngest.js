import { Inngest } from 'inngest';
import { connectDB } from './db.js';
import User from '../models/Users.js';

export const inngest = new Inngest({ id: 'interview-platform' });

const syncUser = inngest.createFunction(
  { id: 'sync/user' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    try {
      await connectDB();

      const { id, email_addresses, first_name, last_name, image_url } = event.data;

      const newUser = {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        profileImage: image_url,
      };
      const savedUser = await User.create(newUser);
      console.log('User synced:', savedUser);
      return { success: true, user: savedUser };
    } catch (error) {
      console.error('Error syncing user:', error);
      throw error;
    }
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: 'delete-user-from-db' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    try {
      await connectDB();

      const { id } = event.data;

      const result = await User.deleteOne({ clerkId: id });
      console.log('User deleted:', result);
      return { success: true, result };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
);

export const functions = [syncUser, deleteUserFromDB];