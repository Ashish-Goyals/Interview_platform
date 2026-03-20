import { Inngest } from 'inngest';
import { connectDB } from './db.js';
import User from '../models/Users.js';

export const inngest = new Inngest({ id: 'interview-platform' });

const syncUser = inngest.createFunction(
  { id: 'sync/user' },
  { event: 'user.created' },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ''} ${last_name || ''}`.trim(),
      profileImage: image_url,
    };
    await User.create(newUser);
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: 'delete-user-from-db' },
  { event: 'user.deleted' },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });
  }
);

export const functions = [syncUser, deleteUserFromDB];