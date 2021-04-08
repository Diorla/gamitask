import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";

export default function Home() {
  return (
    <Layout>
      <AppContainer active="rewards">This is reward</AppContainer>
    </Layout>
  );
}
