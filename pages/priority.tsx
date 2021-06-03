import React from "react";
import Layout from "../container/Layout";
import PriorityContainer from "../container/Priority";

export default function Priority(): JSX.Element {
  return (
    <Layout activePath="priority">
      <PriorityContainer />
    </Layout>
  );
}
