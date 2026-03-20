import { Inngest } from 'inngest';
import { connectDB } from './db.js';
import User from '../models/Users.js';
import { Webhook } from 'svix';
import { ENV } from './env.js';

export const inngest = new Inngest({ id: 'interview-platform' });

// Webhook handler for Clerk events
export const handleClerkWebhook = async (req) => {
  const payload = req.body;
  const headers = req.headers;

  // Get webhook signing secret from environment
  const secret = ENV.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error('CLERK_WEBHOOK_SECRET is not set');
  }

  // Verify and parse the webhook
  const wh = new Webhook(secret);
  let evt;
  
  try {
    evt = wh.verify(JSON.stringify(payload), headers);
  } catch (err) {
    console.error('Webhook verification failed:', err);
    throw new Error('Webhook verification failed');
  }

  // Send events to Inngest based on Clerk event type
  if (evt.type === 'user.created') {
    await inngest.send({
      name: 'clerk/user.created',
      data: evt.data,
    });
  } else if (evt.type === 'user.deleted') {
    await inngest.send({
      name: 'clerk/user.deleted',
      data: evt.data,
    });
  }

  return { success: true };
};

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