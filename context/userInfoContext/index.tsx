import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";
import UserInfo from "../../props/UserInfo";
import { watchDoc } from "../../scripts/watchData";
import { useUser } from "../userContext";
import initialState from "./initialState";

export const UserInfoContext = createContext<UserInfo>(initialState);

export default function UserInfoContextWrapper({ children }) {
  const [userInfo, setUserInfo] = useState(initialState);
  const { loadingUser, user } = useUser();

  useEffect(() => {
    if (user && user.uid)
      watchDoc("user", user.uid, setUserInfo).catch((err) => toast.error(err));
  }, [loadingUser]);

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
}

export const useUserInfo = () => useContext(UserInfoContext);
