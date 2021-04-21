import { FaFlag } from "react-icons/fa";
import styled from "styled-components";
import Accordion from "./Accordion";

const Flag = styled(FaFlag)<{ color: string }>`
  color: ${({ theme, color }) => theme.palette[color].main};
`;

const data = {
  header: "Priority",
  base: "/priority",
  path: ["1", "2", "3", "4", "5"],
  title: ["Priority 1", "Priority 2", "Priority 3", "Priority 4", "Priority 5"],
  icons: [
    <Flag color="success" />,
    <Flag color="info" />,
    <Flag color="primary" />,
    <Flag color="warning" />,
    <Flag color="error" />,
  ],
};

export default function DifficultyDropdown({ activePath }: { activePath: string }) {
  return <Accordion data={data} activePath={activePath} />;
}
