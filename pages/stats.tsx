import Stats from "../container/Stats";
import Layout from "../container/Layout";

export default function stats(): JSX.Element {
  return (
    <Layout activePath="profile" hideMenu>
      <Stats />
    </Layout>
  );
}
