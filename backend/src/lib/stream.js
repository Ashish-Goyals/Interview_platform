import {StreamChat} from 'stream-chat';
import {ENV} from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error (
    'STREAM_API_KEY or STREAM_API_SECRET is not defined in the environment variables'
  );
}

export const chatClient = StreamChat.getInstance (apiKey, apiSecret);

export const upsertStreamUser = async userData => {
  try {
    await chatClient.upsertUser (userData);

    console.log ('Stream User Upserted Succesfully', userData);
  } catch (error) {
    console.error ('Error upserting Stream user', error);
  }
};

export const deleteStreamUser = async userId => {
  try {
    await chatClient.deleteUser (userId);
    console.log ('Stream User Deleted Succesfully');
  } catch (error) {
    console.error ('Error deleteing Stream user', error);
  }
};
