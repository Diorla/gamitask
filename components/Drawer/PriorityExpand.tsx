import { FaFlag } from "react-icons/fa";
import { useIntl } from "react-intl";
import styled from "styled-components";
import ExpandDrawer from "./ExpandDrawer";

const Flag = styled(FaFlag)<{ color: string }>`
  color: ${({ color }) => color};
`;

export default function DifficultyDropdown({
  activePath,
}: {
  activePath: string;
}) {
  const intl = useIntl();
  const priority = intl.formatMessage({
    id: "Priority",
    defaultMessage: "Priority",
  });
  const data = {
    header: priority,
    base: "/priority",
    path: ["1", "2", "3", "4", "5"],
    title: [
      `${priority} 1`,
      `${priority} 2`,
      `${priority} 3`,
      `${priority} 4`,
      `${priority} 5`,
    ],
    icons: [
      <Flag color="#00796b" />,
      <Flag color="#689f38" />,
      <Flag color="#ffeb3b" />,
      <Flag color="#ff9800" />,
      <Flag color="#e83c3d" />,
    ],
  };
  return <ExpandDrawer data={data} activePath={activePath} />;
}
