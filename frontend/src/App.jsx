import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import { SendMoney } from "./components/SendMoney";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import axios from "axios";

const App = () => {
  const [userName, setUserName] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const REACT_APP_URI = import.meta.env.VITE_REACT_APP_URI;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`${REACT_APP_URI}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.authenticated) {
          setUserName(
            `${response.data.user.firstName} ${response.data.user.lastName}`
          );
          setAuthenticated(true);
        }
      } catch (err) {
        console.error("Error checking auth:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            authenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Signup setAuthenticated={setAuthenticated} />
            )
          }
        />
        <Route
          path="/signin"
          element={
            authenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Signin
                setUserName={setUserName}
                setAuthenticated={setAuthenticated}
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            authenticated ? (
              <Dashboard
                userName={userName}
                setAuthenticated={setAuthenticated}
              />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
