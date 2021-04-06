import Head from "next/head";
import React, { useEffect } from "react";
import styled from "styled-components";
import Menu from "../components/Menu";
import { useUser } from "../context/userContext";
import SignIn from "./SignIn";

const Content = styled.div`
  margin-top: 70px;
`;

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
        <Content>{children}</Content>
      </div>
    );
  return <SignIn />;
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
