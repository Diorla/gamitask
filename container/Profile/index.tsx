import React from "react";
import EditProfile from "./EditProfile";
import ReadProfile from "./ReadProfile";

export default function Profile({
  edit,
  toggleEdit,
}: {
  edit: boolean;
  toggleEdit: (val: boolean) => void;
}): JSX.Element {
  if (edit) return <EditProfile closeEdit={() => toggleEdit(false)} />;
  return <ReadProfile openEdit={() => toggleEdit(true)} />;
}
