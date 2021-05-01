import { FaFlag } from "react-icons/fa";
import styled from "styled-components";
import ExpandDrawer from "./ExpandDrawer";

const Flag = styled(FaFlag)<{ color: string }>`
  color: ${({ color }) => color};
`;

const data = {
  header: "Priority",
  base: "/priority",
  path: ["1", "2", "3", "4", "5"],
  title: ["Priority 1", "Priority 2", "Priority 3", "Priority 4", "Priority 5"],
  icons: [
    <Flag color="#00796b" />,
    <Flag color="#689f38" />,
    <Flag color="#ffeb3b" />,
    <Flag color="#ff9800" />,
    <Flag color="#e83c3d" />,
  ],
};

export default function DifficultyDropdown({
  activePath,
}: {
  activePath: string;
}) {
  return <ExpandDrawer data={data} activePath={activePath} />;
}
