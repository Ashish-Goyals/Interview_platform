import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { useUser } from "@clerk/react";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProblemsPage from "./pages/ProblemsPage";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast";
import ProblemPage from "./pages/ProblemPage";
import SessionPage from "./pages/SessionPage";
function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  const routes = [
    {
      path: "/",
      element: <HomePage />,
      public: true,
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
      protected: true,
    },
    {
      path: "/about",
      element: <AboutPage />,
      public: true,
    },
    {
      path: "/problems",
      element: <ProblemsPage />,
      protected: true,
    },
    {
      path: "/problem/:id",
      element: <ProblemPage />,
      protected: true,
    },
    {
      path: "/session/:id",
      element: <SessionPage />,
      protected: true,
    },
  ];

  const ProtectedRoute = ({ children }) =>
    isSignedIn ? children : <Navigate to="/" />;

  const PublicRoute = ({ children }) =>
    !isSignedIn ? children : <Navigate to="/dashboard" />;

  return (
    <>
      <Routes>
        {routes.map((route, index) => {
          if (route.protected) {
            return (
              <Route
                key={index}
                path={route.path}
                element={<ProtectedRoute>{route.element}</ProtectedRoute>}
              />
            );
          }

          if (route.public) {
            return (
              <Route
                key={index}
                path={route.path}
                element={<PublicRoute>{route.element}</PublicRoute>}
              />
            );
          }

          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
