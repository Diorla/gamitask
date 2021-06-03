import React from "react";
import Layout from "../container/Layout";
import RewardsContainer from "../container/Rewards";

export default function Rewards(): JSX.Element {
  return (
    <Layout activePath="rewards">
      <RewardsContainer />
    </Layout>
  );
}
