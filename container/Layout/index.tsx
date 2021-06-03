import Head from "next/head";
import React from "react";
import { useUser } from "../../context/userContext";
import LayoutLoader from "./LayoutLoader";
import Wrapper from "./Wrapper";
import { ToastContainer } from "react-toastify";
import Control from "./Control";

export default function Layout({
  children,
  activePath,
  hideMenu = false,
  title = "Gamitask",
}: {
  children: React.ReactNode;
  activePath: string;
  hideMenu?: boolean;
  title?: string;
}): JSX.Element {
  const { loadingUser, user } = useUser();
  const { runningTask } = user;
  const { id } = runningTask || {};

  return (
    <div>
      <Head>
        <title>{title}</title>
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
