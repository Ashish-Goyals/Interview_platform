import { useState, useEffect, useRef } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/sessions";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);
  const isInitialized = useRef(false);

  useEffect(() => {
    let videoCall = null;
    let chatClientInstance;

    const initCall = async () => {
      if (!session?.callId) {
        setIsInitializingCall(false);
        return;
      }
      if (!isHost && !isParticipant) {
        setIsInitializingCall(false);
        return;
      }
      if (isInitialized.current) return;
      isInitialized.current = true;

      try {
        const { token, userId, userName, userImage } =
          await sessionApi.getStreamToken();
        const client = await initializeStreamClient(
          { id: userId, name: userName, image: userImage },
          token,
        );

        setStreamClient(client);
        videoCall = client.call("default", session.callId);
        await videoCall.join({ create: true });
        setCall(videoCall);

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);

        if (chatClientInstance.userID !== userId) {
          await chatClientInstance.connectUser(
            { id: userId, name: userName, image: userImage },
            token,
          );
        }
        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel("messaging", session.callId);
        await chatChannel.watch({ state: true });
        setChannel(chatChannel);
      } catch (error) {
        toast.error("Failed to join video call");
        console.error("Error init call", error);
        isInitialized.current = false;
      } finally {
        setIsInitializingCall(false);
      }
    };

    if (session && !loadingSession) initCall();

    return () => {
      (async () => {
        try {
          if (videoCall) await videoCall.leave();
          if (chatClientInstance?.userID) await chatClientInstance.disconnectUser();
          await disconnectStreamClient();
          isInitialized.current = false;
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };
  }, [session?.callId, isHost, isParticipant]);

  return { streamClient, call, chatClient, channel, isInitializingCall };
}

export default useStreamClient;
