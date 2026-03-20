import {Inggest} from 'inngest';
import {connectDb} from './db.js';
import User from './models/User.js';
import {email} from '../../node_modules/zod/v4/classic/schemas';
import {create} from '../../node_modules/@bufbuild/protobuf/dist/esm/create';
import {from} from '../../node_modules/@types/node/vm.d';

export const inngest = new Inggest ({id: 'interview-platform'});

const syncUser = inngest.createFunction (
  {id: 'sync/user'},
  {event: 'clerk/user.created'},
  async ({event}) => {
    await connectDb ();

    const {id, email_address, first_name, last_name, image_url} = event.data;

    const newUser = {
      clerkId: id,
      email: email_address,
      name: `${first_name || ' '} ${last_name || ' '}`.trim (),
      profileImage: image_url,
    };
    await User.create (newUser);
  }
);

const deleteUserFromDB = inngest.createFunction (
  {id: 'delete-user-from-db'},
  {event: 'clerk/user.deleted'},
  async ({event}) => {
    await connectDb ();

    const {id} = event.data;

    await User.deleteOne ({clerkId: id});
    
  }
);

export const functions = [syncUser, deleteUserFromDB];
