import { useState } from "react";
import styled from "styled-components";
import CountDown from "./CountDown";
import PlayStop from "./PlayStop";
import { useInterval } from "react-use";
import createData from "../../scripts/createData";
import { useUser } from "../../context/userContext";
import { toast } from "react-toastify";

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
`;

const truncateText = (str: string, length: number) =>
  str.length <= length ? str : str.slice(0, length) + "...";
export default function RunningTask() {
  const [count, setCount] = useState(0);

  const { user } = useUser();
  const {
    points: pt,
    runningTask: { name, startTime, priority, difficulty, id, countdowns },
  } = user;

  const closeTask = () => {
    const timeDiff = Date.now() - startTime;
    let points = timeDiff * priority * difficulty;
    points /= 18482.52;
    points += pt;
    points = Math.floor(points);
    const now = "t" + Date.now();
    createData("user", user.uid, {
      points,
      runningTask: {},
    })
      .then(() => {
        createData("user", `${user.uid}/tasks/${id}`, {
          countdowns: {
            ...countdowns,
            [now]: timeDiff,
          },
        });
      })
      .then(() => toast.info(`${name} ended`))
      .catch((err) => toast.error(err));
  };
  useInterval(() => {
    setCount(Date.now() - startTime);
  }, 1000);

  return (
    <StyledDiv>
      <PlayStop running={true} toggleRunning={closeTask} />
      <CountDown time={count} />
      {truncateText(name, 16)}
    </StyledDiv>
  );
}
