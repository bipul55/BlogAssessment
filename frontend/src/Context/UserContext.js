import React, { useState, useEffect } from "react";

export const UserValue = React.createContext(null);

export default function UserContext({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserValue.Provider value={{ user, setUser }}>
      {children}
    </UserValue.Provider>
  );
}
