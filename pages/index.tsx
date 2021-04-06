import React from "react";
import Layout from "../container/Layout";

const ar = [];
ar.length = 10000;
ar.fill("hello");
export default function Home() {
  return (
    <Layout>
      <div>exe</div>
      {ar.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
    </Layout>
  );
}
