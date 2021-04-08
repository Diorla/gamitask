import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";

export default function Home() {
  return (
    <Layout>
      <AppContainer active="projects">
        These are projects and task under it
      </AppContainer>
    </Layout>
  );
}
