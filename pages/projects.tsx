import React from "react";
import Layout from "../container/Layout";
import ProjectsContainer from "../container/Projects";

export default function Projects(): JSX.Element {
  return (
    <Layout activePath="projects">
      <ProjectsContainer />
    </Layout>
  );
}
