import { useState } from "react";
import styled from "styled-components";
import CountDown from "./CountDown";
import PlayStop from "./PlayStop";
import { useInterval } from "react-use";
import { useUser } from "../../context/userContext";
import truncateText from "../../scripts/truncateText";
import closeTask from "../../services/closeTask";

const StyledDiv = styled.div`
  background: ${({ theme }) => theme.palette.tertiary.dark};
  color: white;
  display: flex;
  justify-content: space-around;
  height: 4.8rem;
  align-items: center;
  font-size: 2.1rem;
  right: 0;
  position: sticky;
  top: 0;
  z-index: 2;
`;

export default function RunningTask(): JSX.Element {
  const [count, setCount] = useState(0);

  const { user } = useUser();
  const {
    runningTask: { name, startTime },
  } = user;

  useInterval(() => {
    setCount(Date.now() - startTime);
  }, 1000);

  return (
    <StyledDiv>
      <PlayStop running={true} toggleRunning={() => closeTask(user)} />
      <CountDown time={count} />
      {truncateText(name, 16)}
    </StyledDiv>
  );
}
