import Link from "next/link";
import React, { useState } from "react";
import EditProfile from "../container/EditProfile";
import Layout from "../container/Layout";
import ReadProfile from "../container/ReadProfile";

export default function Profile() {
  const [edit, setEdit] = useState(false);
  return (
    <Layout activePath="profile" hideMenu>
      <Link href="/">
        <a>Home</a>
      </Link>
      {edit ? (
        <EditProfile closeEdit={() => setEdit(false)} />
      ) : (
        <ReadProfile openEdit={() => setEdit(true)} />
      )}
    </Layout>
  );
}
