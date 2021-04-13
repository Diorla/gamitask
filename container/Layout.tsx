import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Menu from "../components/Menu";
import RunningTask from "../components/TaskCard/RunningTask";
import { useCurrentTaskState } from "../context/currentTaskContext";
import { useUser } from "../context/userContext";
import LayoutLoader from "./LayoutLoader";
import Welcome from "./Welcome";

const Content = styled.div`
  margin-top: 50px;
`;

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
        <Content>{children}</Content>
      </div>
    );
  return <Welcome />;
};

export default function Layout({ children }) {
  const { loadingUser, user } = useUser();
  const { id } = useCurrentTaskState();

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
      <Control loadingUser={loadingUser} user={user}>
        {children}
        {id && <RunningTask />}
      </Control>
    </div>
  );
}
