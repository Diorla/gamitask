import { useState, useEffect, createContext, useContext } from "react";
import { watchDoc } from "../../scripts/watchData";
import { useUser } from "../userContext";

export const UserInfoContext = createContext<{ [key: string]: any }>({});

export default function UserInfoContextWrapper({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const { loadingUser, user } = useUser();

  useEffect(() => {
    if (user && user.uid)
      watchDoc("user", user.uid, setUserInfo)
        .then(() => console.log("done"))
        .catch((err) => console.log({ err }));
  }, [loadingUser]);

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
}

export const useUserInfo = () => useContext(UserInfoContext);
