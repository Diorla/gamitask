import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "react-toastify";
import firebase from "../../firebase/clientApp";
import UserInfo from "../../props/UserInfo";
import { watchDoc } from "../../scripts/watchData";
import formatData from "./formatData";
import initialState from "./initialState";

export const UserContext = createContext(initialState);

export default function UserContextComp({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user: userInfo } = initialState;
  const [user, setUser] = useState(userInfo);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          watchDoc("user", user.uid, (data) => {
            const formattedData = formatData(data);

            const {
              profile,
              profile: { profileImage },
            } = formattedData;

            const userData = {
              ...formattedData,
              uid: user.uid,
              email: user.email,
              profile: {
                ...profile,
                profileImage: profileImage || user.photoURL,
              },
            };

            setUser(formatData(userData));
          }).catch((err) => toast.error(err));
        } else setUser(userInfo);
      } catch (error) {
      } finally {
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

export const useUser = () =>
  useContext<{
    user: UserInfo;
    loadingUser: boolean;
  }>(UserContext);
