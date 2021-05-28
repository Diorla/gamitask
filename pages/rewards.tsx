import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../container/Layout";
import { useUser } from "../context/userContext";
import createData from "../scripts/createData";
import RewardProps from "../props/Reward";
import CreateReward from "../compounds/CreateReward";
import toMS from "../scripts/toMS";
import batchWrite from "../scripts/batchWrite";
import RewardCard from "../compounds/RewardCard";
import getRewards from "../services/getRewards";
import createReward from "../services/createReward";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import Line from "../atoms/Line";
import Text from "../atoms/Text";

const initialState: RewardProps = {
  name: "",
  time: toMS(0, "second"),
  type: "timed",
  task: [],
  point: 0,
  done: [],
  note: "",
};

export default function Rewards(): JSX.Element {
  const [rewards, setRewards] = useState<RewardProps[]>([]);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [value, setValue] = useState<RewardProps>(initialState);
  const { user } = useUser();
  const { totalPoints, pointsPerHour } = user;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user.uid &&
      getRewards(user.uid, (rewards) => setRewards(rewards))
        .then(() => setLoading(false))
        .catch((err) => toast.error(err.message));
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

  const content = isAddVisible ? "collapse" : "expand";

  return (
    <Layout activePath="rewards">
      <h2>Points: {totalPoints}</h2>

      <Card elevation={1} style={{ padding: "0.4rem", alignItems: "center" }}>
        <Line style={{ justifyContent: "space-between" }}>
          <Button onClick={() => setIsAddVisible(!isAddVisible)}>
            {content}
          </Button>
          <Text>addReward</Text>
        </Line>
        {isAddVisible && (
          <div>
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
            <Line style={{ justifyContent: "space-around" }}>
              <Button onClick={createNewReward} variant="primary">
                createReward
              </Button>
            </Line>
          </div>
        )}
      </Card>

      {loading ? (
        <div>Reward is loading</div>
      ) : (
        rewards
          .sort(function (prev, next) {
            const prevTime = prev.done[prev.done.length - 1] || 0;
            const nextTime = next.done[next.done.length - 1] || 0;
            return prevTime > nextTime ? 1 : -1;
          })
          .map((item) => (
            <RewardCard
              point={totalPoints}
              perHour={pointsPerHour}
              rewardInfo={item}
              key={item.id}
              onCheck={() => consumeReward(item)}
            />
          ))
      )}
    </Layout>
  );
}
