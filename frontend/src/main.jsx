import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {ClerkProvider} from '@clerk/react';

// const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if(!publishableKey) {
//   throw new Error('VITE_CLERK_PUBLISHABLE_KEY is not defined in the environment variables');
// }

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
createRoot (document.getElementById ('root')).render (
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  </StrictMode>
);
