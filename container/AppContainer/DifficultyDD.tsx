import React from "react";
import Accordion from "./Accordion";
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

export default function DifficultyDropdown({ active }: { active: string }) {
  return <Accordion data={data} active={active} />;
}
