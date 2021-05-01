import React from "react";
import ExpandDrawer from "./ExpandDrawer";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";

const data = {
  header: "Difficulty",
  base: "/difficulty",
  path: ["low", "medium", "high"],
  title: ["Low", "Medium", "High"],
  icons: [<FcLowPriority />, <FcMediumPriority />, <FcHighPriority />],
};

export default function DifficultyDropdown({ activePath }: { activePath: string }) {
  return <ExpandDrawer data={data} activePath={activePath} />;
}
