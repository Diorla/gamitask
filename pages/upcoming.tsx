import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";

export default function Home() {
  return (
    <Layout>
      <AppContainer active="upcoming">
        This is the content of upcoming
      </AppContainer>
    </Layout>
  );
}
