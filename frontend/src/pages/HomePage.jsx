import React from 'react';

import {Show, SignInButton, SignUpButton, UserButton} from '@clerk/react';
import {toast} from 'react-hot-toast';
import axiosInstance from '../lib/axios';
const HomePage = () => {
   
  return (
    <div>
      <h1 className="text-red-500 bg-orange-400 p-10 text-3xl">
        Welcome to the app
      </h1>
      <button
        className="btn btn-secondary"
        onClick={() => toast.success ('This is a success message!')}
      >
        Click Me
      </button>

      <Show when="signed-out">
        <SignInButton className="btn" mode="modal">
          <button className="jghkjhk">
            Sign In Please
          </button>
        </SignInButton>
        {/* <SignUpButton /> */}
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>

    </div>
  );
};

export default HomePage;
