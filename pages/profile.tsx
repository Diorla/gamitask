import React, { useState } from "react";
import Layout from "../container/Layout";
import ProfileContainer from "../container/Profile";

export default function Profile(): JSX.Element {
  const [edit, setEdit] = useState(false);
  return (
    <Layout activePath="profile" hideMenu>
      <ProfileContainer
        edit={edit}
        toggleEdit={(val: boolean) => setEdit(val)}
      />
    </Layout>
  );
}
