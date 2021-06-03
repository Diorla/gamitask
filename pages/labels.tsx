import React from "react";
import Layout from "../container/Layout";
import LabelsContainer from "../container/Labels";

export default function Labels(): JSX.Element {
  return (
    <Layout activePath="labels">
      <LabelsContainer />
    </Layout>
  );
}
