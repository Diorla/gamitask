import Head from "next/head";
import React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import Menu from "../components/Menu";
import { useUser } from "../context/userContext";
import { TaskProvider } from "./CreateTask/context/Task";
import LayoutLoader from "./LayoutLoader";
import Welcome from "./Welcome";

const Content = styled.div`
  margin-top: 70px;
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

  return (
    <TaskProvider>
      <ToastContainer position="bottom-center" />
      <div className="container">
        <Head>
          <title>Next.js w/ Firebase Client-Side</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Control loadingUser={loadingUser} user={user}>
          {children}
        </Control>
      </div>
    </TaskProvider>
  );
}
