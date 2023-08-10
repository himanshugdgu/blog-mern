import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = () => {
    // Make a request to the backend to check authentication status
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/check-auth`)
      .then((response) => {
        console.log("User is logged in:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        // If the user is not authenticated or the token is invalid,
        // redirect to the login page or show a message
        console.log("Not logged in:", error);
        // Redirect to the login page
        // window.location.href = "/login";
      });
  };
  return (
    <div className="w-screen h-screen bg-red-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
