import Head from "next/head";
import React, { useEffect } from "react";
import Menu from "../components/Menu";
import { useUser } from "../context/userContext";
import firebase from "../firebase/clientApp";
import SignIn from "./SignIn";

const Control = ({ loadingUser, user, children }) => {
  if (loadingUser)
    return (
      <div>
        <div>Page is loading</div>
      </div>
    );
  if (user)
    return (
      <div>
        <Menu profileImage={user.photoURL} />
        <div>{children}</div>
      </div>
    );
  return <SignIn />;
};

export default function Layout({ children }) {
  const { loadingUser, user } = useUser();

  useEffect(() => {
    if (!loadingUser) {
      console.log({ user });
    }

    console.log(firebase);
  }, [loadingUser, user]);

  console.log({ user, loadingUser });
  return (
    <div className="container">
      <Head>
        <title>Next.js w/ Firebase Client-Side</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Control loadingUser={loadingUser} user={user}>
        {children}
      </Control>
    </div>
  );
}
