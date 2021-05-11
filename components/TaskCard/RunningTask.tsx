import { useState } from "react";
import styled from "styled-components";
import CountDown from "./CountDown";
import PlayStop from "./PlayStop";
import { useInterval } from "react-use";
import createData from "../../scripts/createData";
import { useUser } from "../../context/userContext";
import { toast } from "react-toastify";
import truncateText from "../../scripts/truncateText";
import { getDayBegin } from "../../scripts/datetime-utils";
import fromMS from "../../scripts/fromMS";

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

export default function RunningTask() {
  const [count, setCount] = useState(0);

  const { user } = useUser();
  const {
    totalPoints,
    dailyPoints,
    lifetimeHours,
    lifetimePoints,
    runningTask: { name, startTime, priority, difficulty, id, countdowns },
  } = user;

  const closeTask = () => {
    const timeDiff = Date.now() - startTime;
    let currentPoints = timeDiff * priority * difficulty;
    currentPoints /= 18482.52;
    let cumulativePoints = (currentPoints + totalPoints);
    cumulativePoints = Math.floor(cumulativePoints);
    currentPoints = Math.floor(currentPoints);
    const todayKey = "t" + getDayBegin(new Date());
    const todayValue = Array.isArray(dailyPoints[todayKey])
      ? dailyPoints[todayKey]
      : [];
    createData("user", user.uid, {
      totalPoints: cumulativePoints,
      runningTask: {},
      dailyPoints: {
        ...dailyPoints,
        [todayKey]: [...todayValue, currentPoints],
      },
      lifetimeHours: lifetimeHours + fromMS(timeDiff, "hour"),
      lifetimePoints: lifetimePoints + Math.floor(currentPoints),
    })
      .then(() => {
        const todayKey = "t" + getDayBegin(new Date());
        const todayValue = Array.isArray(countdowns[todayKey])
          ? countdowns[todayKey]
          : [];
        todayValue.push({
          startTime,
          length: timeDiff,
        });
        createData("user", `${user.uid}/tasks/${id}`, {
          countdowns: {
            ...countdowns,
            [todayKey]: todayValue,
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
