import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // 🔥 Groups with localStorage
  const [groups, setGroups] = useState(() => {
    return JSON.parse(localStorage.getItem("groups")) || [];
  });

  // 🔍 User selected filters
  const [userData, setUserData] = useState(null);

  // ✅ Persist groups
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  return (
    <UserContext.Provider
      value={{ groups, setGroups, userData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
