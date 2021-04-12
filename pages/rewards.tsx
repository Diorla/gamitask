import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";

/**
 * ?//TODO: Add reward modal
 * @returns sfs
 */
export default function Home() {
  return (
    <Layout>
      <AppContainer active="rewards">This is reward</AppContainer>
    </Layout>
  );
}
