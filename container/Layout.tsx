import Head from "next/head";
import React, { useState } from "react";
import styled from "styled-components";
import Menu from "../components/Menu";
import RunningTask from "../components/TaskCard/RunningTask";
import { useUser } from "../context/userContext";
import Drawer from "./AppContainer";
import LayoutLoader from "./LayoutLoader";
import Welcome from "./Welcome";
import Wrapper from "./Wrapper";

const Content = styled.div<{ showDrawer: boolean }>`
  flex: 1;
  position: absolute;
  left: 24rem;
  height: calc(100vh - 7rem);
  top: 5rem;
  overflow-y: scroll;
  width: calc(100% - 26rem);
  padding: 1rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: silver;
    border: 0.2rem solid silver;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm + "px"}) {
      width: calc(100% - 2rem);
      left: 0;
    }
  }
`;

const Control = ({
  loadingUser,
  uid,
  children,
  profileImage,
  activePath,
  id,
}: {
  loadingUser: boolean;
  uid: string;
  children: React.ReactNode;
  profileImage: string;
  activePath: string;
  id: string;
}) => {
  const [showDrawer, setShowDrawer] = useState(false);

  if (loadingUser) return <LayoutLoader />;
  if (uid)
    return (
      <div style={{ fontSize: "1.6rem" }}>
        <Menu
          profileImage={profileImage}
          onClick={() => setShowDrawer(!showDrawer)}
        />
        <Drawer showDrawer={showDrawer} activePath={activePath} />
        <Content showDrawer={showDrawer} onClick={() => setShowDrawer(false)}>
          {id && <RunningTask />}
          {children}
        </Content>
      </div>
    );
  return <Welcome />;
};

export default function Layout({
  children,
  activePath,
}: {
  children: React.ReactNode;
  activePath: string;
}) {
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
        <Control
          loadingUser={loadingUser}
          activePath={activePath}
          uid={user.uid}
          profileImage={user.profile.profileImage}
          id={id}
        >
          {children}
        </Control>
      </Wrapper>
    </div>
  );
}
