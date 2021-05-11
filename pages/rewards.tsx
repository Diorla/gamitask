import React, { useEffect, useState } from "react";
import { MdAddBox } from "react-icons/md";
import { toast } from "react-toastify";
import styled from "styled-components";
import Layout from "../container/Layout";
import { useUser } from "../context/userContext";
import createData from "../scripts/createData";
import RewardProps from "../props/Reward";
import CreateReward from "../components/CreateReward";
import toMS from "../scripts/toMS";
import batchWrite from "../scripts/batchWrite";
import RewardCard from "../components/RewardCard";
import getRewards from "../services/getRewards";
import createReward from "../services/createReward";

const initialState: RewardProps = {
  name: "",
  time: toMS(0, "second"),
  type: "timed",
  task: [],
  point: 0,
  done: [],
  note: "",
};

const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  align-items: center;
  box-shadow: 0 0 0.2rem silver;
  margin: 0.4rem;
  background: ${({ disabled }) => (disabled ? "silver" : "white")};
  & > div {
    display: flex;
    align-items: center;
  }
  & svg {
    margin-left: 2rem;
    color: beige;
    background: ${({ theme }) => theme.palette.primary.dark};
    border-radius: 50%;
    cursor: pointer;
  }
`;

const Add = styled.div`
  display: flex;
  align-items: center;
  & svg {
    margin-right: 0.4rem;
    font-size: 3.2rem;
  }
`;
export default function Rewards() {
  const [rewards, setRewards] = useState<RewardProps[]>([]);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [value, setValue] = useState<RewardProps>(initialState);
  const { user } = useUser();
  const { totalPoints, pointsPerHour } = user;

  useEffect(() => {
    user &&
      getRewards(user.uid, (rewards) => setRewards(rewards)).catch((err) =>
        toast.error(err.message)
      );
  }, [user]);

  const consumeReward = (taskInfo: RewardProps) => {
    if (taskInfo.type === "timed") consumeTimeReward(taskInfo);
    if (taskInfo.type === "task") consumeTaskReward(taskInfo);
  };

  const consumeTimeReward = (taskInfo: RewardProps) => {
    const { time, name, done = [], id } = taskInfo;
    const timeToPoints = (time * pointsPerHour) / toMS(1, "hour");

    batchWrite((db, batch) => {
      const userRef = db.collection("user").doc(user.uid);
      batch.update(userRef, {
        totalPoints: totalPoints - Math.round(timeToPoints),
      });
      const rewardRef = db.collection("user").doc(`${user.uid}/rewards/${id}`);
      batch.update(rewardRef, {
        done: [...done, Date.now()],
      });
    })
      .then(() => toast.info(`${name} done`))
      .catch((err) => toast.error(err.messsage));
  };

  const consumeTaskReward = (taskInfo: RewardProps) => {
    const { name, id, done = [] } = taskInfo;
    createData("user", `${user.uid}/rewards/${id}`, {
      checklist: [],
      done: [...done, Date.now()],
    })
      .then(() => toast.info(`${name} done`))
      .catch((err) => toast.error(err.messsage));
  };

  const createNewReward = () => {
    createReward(value, user.uid, () => {
      setValue(initialState);
      setIsAddVisible(false);
    });
  };

  return (
    <Layout activePath="rewards">
      <h2>Points: {totalPoints}</h2>
      <Add onClick={() => setIsAddVisible(!isAddVisible)}>
        <MdAddBox /> Add
      </Add>
      {isAddVisible && (
        <>
          <CreateReward
            name={value.name}
            onChangeName={(e) => setValue({ ...value, name: e.target.value })}
            type={value.type}
            onChangeType={(e) => setValue({ ...value, type: e.target.value })}
            time={value.time}
            onChangeTime={(ev) => setValue({ ...value, time: ev })}
            task={value.task}
            onChangeTask={(e) => setValue({ ...value, task: e })}
            note={value.note}
            onChangeNote={(e) => setValue({ ...value, note: e.target.value })}
          />
          <button onClick={createNewReward}>Create Reward</button>
        </>
      )}

      {rewards.map((item) => (
        <RewardCard
          point={totalPoints}
          perHour={pointsPerHour}
          rewardInfo={item}
          key={item.id}
          onCheck={() => consumeReward(item)}
        />
      ))}
    </Layout>
  );
}
