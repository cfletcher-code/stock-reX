import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a custom hook to access the user context
export const useUser = () => useContext(UserContext);

// Create the UserProvider component to wrap your entire app
export const UserProvider = ({ children }) => {
  const [user_id, setUser_id] = useState(null);

  return (
    <UserContext.Provider value={{ user_id, setUser_id }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;