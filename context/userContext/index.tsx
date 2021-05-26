import React, { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";
import firebase from "../../firebase/clientApp";
import UserInfo from "../../props/UserInfo";
import getUserInfo from "../../services/getUserInfo";
import initialState from "./initialState";

export const UserContext = createContext(initialState);

export default function UserContextComp({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { user: userInfo } = initialState;
  const [user, setUser] = useState(userInfo);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        getUserInfo(user.uid, (data) => {
          const userData = {
            ...data,
            uid: user.uid,
            name: data.name || user.displayName || "",
            email: data.email || user.email || "",
            profileImage: data.profileImage || user.photoURL || "",
          };
          setUser(userData);
          setLoadingUser(false);
        }).catch((err) => toast.error(err));
      } else {
        setUser(userInfo);
        setLoadingUser(false);
      }
    });

    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): {
  user: UserInfo;
  loadingUser: boolean;
} =>
  useContext<{
    user: UserInfo;
    loadingUser: boolean;
  }>(UserContext);
