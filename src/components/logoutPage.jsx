import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });
      document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    logout();
  }, []); // Empty dependency array ensures the effect runs only once

  return <div>Logging out...</div>;
};

export default Logout;
