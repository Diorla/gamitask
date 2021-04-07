import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Menu from "../components/Menu";
import { useUser } from "../context/userContext";
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
