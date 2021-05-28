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
}): JSX.Element {
  const intl = useIntl();
  const priority = intl.formatMessage({
    id: "priority",
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
      <Flag color="#00796b" key={0} />,
      <Flag color="#689f38" key={1} />,
      <Flag color="#ffeb3b" key={2} />,
      <Flag color="#ff9800" key={3} />,
      <Flag color="#e83c3d" key={4} />,
    ],
  };
  return <ExpandDrawer data={data} activePath={activePath} />;
}
