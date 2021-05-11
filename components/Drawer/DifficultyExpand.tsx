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
  const easy = intl.formatMessage({
    id: "Easy",
    defaultMessage: "Easy",
  });
  const medium = intl.formatMessage({
    id: "Medium",
    defaultMessage: "Medium",
  });
  const difficult = intl.formatMessage({
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
    path: ["easy", "medium", "difficult"],
    title: [easy, medium, difficult],
    icons: [<FcLowPriority />, <FcMediumPriority />, <FcHighPriority />],
  };
  return <ExpandDrawer data={data} activePath={activePath} />;
}
