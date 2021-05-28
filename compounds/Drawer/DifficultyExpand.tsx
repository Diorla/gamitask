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
}): JSX.Element {
  const intl = useIntl();
  const easy = intl.formatMessage({
    id: "easy",
    defaultMessage: "Easy",
  });
  const medium = intl.formatMessage({
    id: "medium",
    defaultMessage: "Medium",
  });
  const difficult = intl.formatMessage({
    id: "difficult",
    defaultMessage: "Difficult",
  });
  const difficulty = intl.formatMessage({
    id: "difficulty",
    defaultMessage: "Difficulty",
  });
  const data = {
    header: difficulty,
    base: "/difficulty",
    path: ["easy", "medium", "difficult"],
    title: [easy, medium, difficult],
    icons: [
      <FcLowPriority key={0} />,
      <FcMediumPriority key={1} />,
      <FcHighPriority key={2} />,
    ],
  };
  return <ExpandDrawer data={data} activePath={activePath} />;
}
