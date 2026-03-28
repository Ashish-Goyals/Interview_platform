import './App.css';
import {Routes, Route, Navigate} from 'react-router';

import {useUser} from '@clerk/react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProblemsPage from './pages/ProblemsPage';
import { Toaster } from 'react-hot-toast';
function App () {
  const {isSignedIn, isLoaded} = useUser ();

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/problems"
        element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />}
      />
    </Routes>
    <Toaster  toastOptions={{duration:3000}} />
    </>
  );
}

export default App;


//tw ,daisyui, react-router, clerk, react-hot-toast
// todos: react-query aka tanstack-query, axios

