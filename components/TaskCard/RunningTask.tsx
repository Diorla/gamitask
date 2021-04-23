import { useState } from "react";
import styled from "styled-components";
import CountDown from "./CountDown";
import PlayStop from "./PlayStop";
import { useInterval } from "react-use";
import createData from "../../scripts/createData";
import { useUser } from "../../context/userContext";
import { toast } from "react-toastify";

const StyledDiv = styled.div`
  position: fixed;
  top: 5rem;
  width: 100%;
  background: ${({ theme }) => theme.palette.primary.dark};
  color: white;
  display: flex;
  width: 24rem;
  justify-content: space-around;
  height: 4.8rem;
  align-items: center;
  font-size: 2.1rem;
`;

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
      .catch((err) => toast.error(err));
  };
  useInterval(() => {
    setCount(Date.now() - startTime);
  }, 1000);

  return (
    <StyledDiv>
      <PlayStop running={true} toggleRunning={closeTask} />
      <CountDown time={count} />
      {name}
    </StyledDiv>
  );
}
