import React from "react";
import ExpandDrawer from "./ExpandDrawer";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { useIntl } from "react-intl";

export default function DifficultyDropdown({
  activePath,
}: {
  activePath: string;
}) {
  const intl = useIntl();
  const low = intl.formatMessage({
    id: "Easy",
    defaultMessage: "Easy",
  });
  const medium = intl.formatMessage({
    id: "Medium",
    defaultMessage: "Medium",
  });
  const high = intl.formatMessage({
    id: "Difficult",
    defaultMessage: "Difficult",
  });
  const difficulty = intl.formatMessage({
    id: "Difficulty",
    defaultMessage: "Difficulty",
  });
  const data = {
    header: difficulty,
    base: "/difficulty",
    path: ["low", "medium", "high"],
    title: [low, medium, high],
    icons: [<FcLowPriority />, <FcMediumPriority />, <FcHighPriority />],
  };
  return <ExpandDrawer data={data} activePath={activePath} />;
}
