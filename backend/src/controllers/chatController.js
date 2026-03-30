import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    //use clerk id for stream not mongodb id => it should match the id we hav in the stream dashboard
    const token = chatClient.createToken(req.user.clerkId);

    res.status(200).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.image,
    });
  } catch (error) {
    console.log("Error in getStreamToken controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
