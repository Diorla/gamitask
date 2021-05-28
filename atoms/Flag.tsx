import { FaFlag } from "react-icons/fa";
import styled from "styled-components";

const Flag = styled(FaFlag)<{ color: string }>`
  color: ${({ color }) => color};
`;

export default Flag;
