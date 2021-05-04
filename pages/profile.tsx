import Link from "next/link";
import React, { useState } from "react";
import EditProfile from "../container/EditProfile";
import ReadProfile from "../container/ReadProfile";

export default function Profile() {
  const [edit, setEdit] = useState(false);
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      {edit ? (
        <EditProfile closeEdit={() => setEdit(false)} />
      ) : (
        <ReadProfile openEdit={() => setEdit(true)} />
      )}
    </div>
  );
}
