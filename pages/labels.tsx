import React from "react";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";

export default function Home() {
  return (
    <Layout>
      <AppContainer active="labels">
        List of labels and their tasks
      </AppContainer>
    </Layout>
  );
}
