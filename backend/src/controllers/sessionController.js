import Session from '../models/Session.js';

export async function createSession (req, res) {
  try {
    const {problem, difficulty} = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    // Basic validation
    if (!problem || !difficulty) {
      return res
        .status (400)
        .json ({message: 'Problem and difficulty are required'});
    }

    const callId = `session_${Date.now ()}_${Math.random ()
      .toString (36)
      .substring (7)}`;

    const session = await Session.create ({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    //create a stream video call
    await streamClient.video.call ('default', callId).getOrCreate ({
      data: {
        created_by_id: clerkId,
        custom: {problem, difficulty, sessionId: session._id.toString ()},
      },
    });

    const channel = chatClient.channel ('messaging', callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });

    await channel.create ();
    //todo;
    res.status (201).json ({
      session,
    });
  } catch (error) {
    console.log ('Error in createSession controller', error.message);
    res.status (500).json ({message: 'Internal Server Error'});
  }
}
export async function getActiveSessions (_, res) {
  try {
    const sessions = await Session.find ({status: 'active'})
      .populate ('host', 'name profileImage email clerkId')
      .sort ({createdAt: -1})
      .limit (20);
    res.status (200).json ({sessions});
  } catch (error) {
    console.log ('Error in getActiveSessions controller', error.message);
    res.status (500).json ({message: 'Internal Server Error'});
  }
}
export async function getMyRecentSessions (req, res) {
  try {
    const userId = req.user._id;

    //get sessions Where user is wither host or participant
    const sessions = await Session.find ({
      status: 'completed',
      $or: [{host: userId}, {participant: userId}],
    })
      .sort ({createdAt: -1})
      .limit (20);
    res.status (200).json ({sessions});
  } catch (error) {
    console.log ('Error in getMyRecentSessions controller', error.message);
    res.status (500).json ({message: 'Internal Server Error'});
  }
}
export async function getSessionById (req, res) {
  try {
    const {id} = req.params;
    const session = await Session.findById (id)
      .populate ('host', 'name email profileImage clerkId')
      .populate ('participant', 'name email profileImage clerkId');

    if (!session) {
      return res.status (404).json ({message: 'Session not found'});
    }
    res.status.status (200).json ({message: 'Session found', session});
  } catch (error) {
    console.log ('Error in getSessionById controller', error.message);
    res.status (500).json ({message: 'Internal Server Error'});
  }
}
export async function joinSession (req, res) {
  try {
    const {id} = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById (id);

    if (!session) {
      return res.status (404).json ({message: 'Session not found'});
    }

    if (session.host.toString () === userId.toString ()) {
      return res
        .status (400)
        .json ({message: 'Host cannot join as participant'});
    }

    if (session.participant) {
      return res.status (409).json ({message: 'Session is full'});
    }

    session.participant = userId;
    session.status = 'completed';
    await session.save ();

    //add participant to chat channel
    const channel = chatClient.channel ('messaging', session.callId);
    await channel.addMembers ([clerkId]);

    res.status (200).json ({message: 'Joined session successfully', session});
  } catch (error) {
    console.log ('Error in Joining Session', error.message);
    res.status (500).json ({message: 'Internal Server Error'});
  }
}
export async function endSession (req, res) {
  try {
    const {id} = req.params;
    const userId = req.user._id;

    const session = await Session.findById (id);
    if (!session) {
      return res.status (404).json ({message: 'Session not found'});
    }

    if (session.host.toString () !== userId.toString ()) {
      return res.status (403).json ({message: 'Only host can end the session'});
    }

    if (session.status == 'completed') {
      return res.status (400).json ({message: 'Session is not active'});
    }

    //Delete Stream Video Call
    const call = streamClient.video.call ('default', session.callId);
    await call.delete ({hard: true});

    //Delete Stream Chat Channel
    const channel = chatClient.channel ('messaging', session.callId);
    await channel.delete ();

    session.status = 'completed';
    await session.save ();

    res.status (200).json ({session, message: 'Session ended Successfully'});
  } catch (error) {
    console.log ('Error in Ending Session', error.message);
    res.status (500).json ({message: 'Internal Server Error'});
  }
}
