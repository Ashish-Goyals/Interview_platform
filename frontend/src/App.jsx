import './App.css';
import {Show, SignInButton, SignUpButton, UserButton} from '@clerk/react';

function App () {
  return (
    <div className="Apps">

      <h1>Welcome to the app</h1>
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
}

export default App;
