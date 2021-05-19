import Head from "next/head";
import React, { useState } from "react";
import styled from "styled-components";
import Menu from "../components/Menu";
import RunningTask from "../components/TaskCard/RunningTask";
import { useUser } from "../context/userContext";
import Drawer from "../components/Drawer";
import LayoutLoader from "./LayoutLoader";
import Welcome from "./Welcome";
import Wrapper from "./Wrapper";
import { ToastContainer } from "react-toastify";

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
  uid,
  children,
  activePath,
  id,
  hideMenu,
}: {
  uid: string;
  children: React.ReactNode;
  activePath: string;
  id: string;
  hideMenu: boolean;
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  if (uid) {
    if (hideMenu) return <div style={{ fontSize: "1.6rem" }}>{children}</div>;
    return (
      <div style={{ fontSize: "1.6rem" }}>
        <Menu onClick={() => setShowDrawer(!showDrawer)} />
        <Drawer showDrawer={showDrawer} activePath={activePath} />
        <Content showDrawer={showDrawer} onClick={() => setShowDrawer(false)}>
          {id && <RunningTask />}
          {children}
        </Content>
      </div>
    );
  }
  return <Welcome />;
};

export default function Layout({
  children,
  activePath,
  hideMenu = false,
}: {
  children: React.ReactNode;
  activePath: string;
  hideMenu?: boolean;
}): JSX.Element {
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
        <ToastContainer
          position="bottom-center"
          style={{ fontSize: "1.6rem" }}
          autoClose={3000}
        />
        {loadingUser ? (
          <LayoutLoader />
        ) : (
          <Control
            activePath={activePath}
            uid={user.uid}
            id={id}
            hideMenu={hideMenu}
          >
            {children}
          </Control>
        )}
      </Wrapper>
    </div>
  );
}
