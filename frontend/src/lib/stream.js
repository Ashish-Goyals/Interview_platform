import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

let client = null;

export const initializeStreamClient = async (user, token) => {
  // If client exists with same user  instead of creating again return it
  if (client && client?.user?.id === user.id) return client;

  if (!apiKey) throw new Error("Stream API Key  is not provided");

  client = new StreamVideoClient({ apiKey, user, token });
  return client;
};

export const disconnectStreamClient = async () => {
  if (client) {
    try {
      await client.disconnectUser();
      client = null;
    } catch (error) {
      console.error("Error disconnecting Stream client:", error);
    }
  }
};
