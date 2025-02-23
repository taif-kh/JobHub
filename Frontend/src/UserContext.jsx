import React, { createContext, useState, useEffect } from 'react';

// Create UserContext
export const UserContext = createContext();

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const addToken = async (data) => {
    try {
      let response = await fetch("http://localhost:3000/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
        mode: "cors",
      });

      const result = await response.json();
      console.log("Response from server:", result);

      const jwt_token = result.token;
      const id = result.id;
      const email = result.email;
      const username = result.username;
      const isHr = result.isHr;

      if (jwt_token && id && email && username) {
        const userData = { token: jwt_token, id, email, username, isHr };
        setUser(userData);
        localStorage.setItem("jwt_token", jwt_token);
        localStorage.setItem("id", id);
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("isHr", isHr);
        console.log("User state set:", userData);
        return userData;
      } else {
        console.log("JWT token, id, email, or username is missing from the response.");
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const removeToken = () => {
    setUser(null);
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("isHr");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    const storedEmail = localStorage.getItem("email");
    const storedId = localStorage.getItem("id");
    const storedUsername = localStorage.getItem("username");
    const storedIsHr = localStorage.getItem("isHr") === 'true';
    if (storedToken && storedEmail && storedId && storedUsername) {
      setUser({ token: storedToken, email: storedEmail, id: storedId, username: storedUsername, isHr: storedIsHr });
      console.log("User restored from localStorage:", { token: storedToken, email: storedEmail, isHr: storedIsHr });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, addToken, removeToken }}>
      {children}
    </UserContext.Provider>
  );
};
