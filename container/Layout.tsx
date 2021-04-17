import Head from "next/head";
import React from "react";
import Menu from "../components/Menu";
import RunningTask from "../components/TaskCard/RunningTask";
import { useUser } from "../context/userContext";
import LayoutLoader from "./LayoutLoader";
import Welcome from "./Welcome";
import Wrapper from "./Wrapper";

const Control = ({ loadingUser, user, children }) => {
  if (loadingUser)
    return (
      <div>
        <LayoutLoader />
      </div>
    );
  if (user)
    return (
      <div>
        <Menu profileImage={user.photoURL} />
        <div>{children}</div>
      </div>
    );
  return <Welcome />;
};

export default function Layout({ children }) {
  const { loadingUser, user } = useUser();
  const { runningTask } = user;
  const { id } = runningTask || {};

  return (
    <div>
      <Head>
        <title>Gamitask</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Control loadingUser={loadingUser} user={user}>
          {children}
          {id && <RunningTask />}
        </Control>
      </Wrapper>
    </div>
  );
}
