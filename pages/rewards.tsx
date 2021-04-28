import React, { useEffect, useState } from "react";
import { MdAddBox } from "react-icons/md";
import { toast } from "react-toastify";
import styled from "styled-components";
import { v4 } from "uuid";
import Layout from "../container/Layout";
import { useUser } from "../context/userContext";
import createData from "../scripts/createData";
import watchData from "../scripts/watchData";
import RewardProps from "../props/Reward";
import CreateReward from "../container/CreateReward";
import toMS from "../scripts/toMS";
import transation from "../scripts/transation";
import firebase from "firebase";
import batchWrite from "../scripts/batchWrite";
import RewardCard from "../components/RewardCard";

const initialState: RewardProps = {
  name: "",
  time: toMS(0, "second"),
  type: "point",
  task: [],
  point: 0,
  done: [],
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
  const { points, points_per_hour } = user;
  useEffect(() => {
    user &&
      watchData(`user/${user.uid}/rewards`, (e) => setRewards(e)).catch((err) =>
        toast.error(err)
      );
  }, [user]);

  const consumeReward = (taskInfo: RewardProps) => {
    if (taskInfo.type === "timed") consumeTimeReward(taskInfo);
    if (taskInfo.type === "task") consumeTaskReward(taskInfo);
    if (taskInfo.type === "point") consumePointReward(taskInfo);
  };
  const consumeTimeReward = (taskInfo: RewardProps) => {
    const { time, name } = taskInfo;
    const timeToPoints = (time * points_per_hour) / toMS(1, "hour");
    createData("user", user.uid, {
      points: points - timeToPoints,
    })
      .then(() => toast.info(`${name} done`))
      .catch((err) => toast.error(err.messsage));
  };
  const consumeTaskReward = (taskInfo: RewardProps) => {
    const { name, id } = taskInfo;
    createData("user", `${user.uid}/rewards/${id}`, {
      checklist: [],
    })
      .then(() => toast.info(`${name} done`))
      .catch((err) => toast.error(err.messsage));
  };
  const consumePointReward = (taskInfo: RewardProps) => {
    const { name, point } = taskInfo;
    createData("user", user.uid, {
      points: points - point,
    })
      .then(() => toast.info(`${name} done`))
      .catch((err) => toast.error(err.messsage));
  };

  const createNewReward = () => {
    if (!value.name) {
      toast.warn("Please provide a name");
      return 0;
    }
    if (value.type === "task") {
      if (value.task.length) createTaskReward();
      else toast.warn("Please add task to the list");
    } else {
      if (value.type === "timed" && value.time === 0) {
        toast.warn("Please set a time");
        return 0;
      }
      if (value.type === "point" && value.point === 0) {
        toast.warn("Please provide points");
        return 0;
      }
      createOtherReward();
    }
  };

  const createOtherReward = () => {
    const id = v4();
    createData("user", `${user.uid}/rewards/${id}`, {
      id,
      ...value,
      task: [],
      points: value.type === "point" ? value.point : 0,
      time: value.type === "timed" ? value.time : 0,
    })
      .then(() => {
        setValue(initialState);
        setIsAddVisible(false);
        toast.success("New reward created");
      })
      .catch((err) => toast.error(err.message));
  };

  const createTaskReward = () => {
    const id = v4();
    const projectRefList: {
      projectRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
      rewardList: any[];
    }[] = [];

    transation((db, t) => {
      value.task.forEach(async (element) => {
        const projectRef = db
          .collection("user")
          .doc(`${user.uid}/tasks/${element.value}`);
        const projectDoc = await t.get(projectRef);
        const data = projectDoc?.data();
        const rewardList = data?.rewards || [];
        projectRefList.push({ projectRef, rewardList });
      });
    })
      .then(() => {
        batchWrite((db, batch) => {
          const rewardRef = db
            .collection("user")
            .doc(`${user.uid}/rewards/${id}`);
          projectRefList.forEach((element) => {
            const { projectRef, rewardList } = element;
            batch.set(
              projectRef,
              { rewards: [...rewardList, id] },
              { merge: true }
            );
          });
          batch.set(
            rewardRef,
            { ...value, id, time: 0, points: 0 },
            { merge: true }
          );
        });
      })
      .then(() => {
        setValue(initialState);
        setIsAddVisible(false);
        toast.success("New reward created");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <Layout activePath="rewards">
      <h2>Points: {points}</h2>
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
            point={value.point}
            onChangePoint={(e) => setValue({ ...value, point: e.target.value })}
            time={value.time}
            onChangeTime={(ev) => setValue({ ...value, time: ev })}
            task={value.task}
            onChangeTask={(e) => setValue({ ...value, task: e })}
          />
          <button onClick={createNewReward}>Create Reward</button>
        </>
      )}

      {rewards.map((item, idx) => (
        <RewardCard
          {...item}
          point={points}
          perHour={points_per_hour}
          rewardInfo={item}
          key={idx}
          onCheck={() => consumeReward(item)}
        />
      ))}
    </Layout>
  );
}
