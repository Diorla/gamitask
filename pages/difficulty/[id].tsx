import { useRouter } from "next/router";
import React from "react";
import AppContainer from "../../container/AppContainer";
import Layout from "../../container/Layout";

export default function Labels() {
  const router = useRouter();
  const { id } = router.query;
  const path = Array.isArray(id) ? id[0] : id;
  return (
    <Layout>
      <AppContainer active={path}>This is {path} difficulty</AppContainer>
    </Layout>
  );
}
