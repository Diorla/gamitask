import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import RewardProps from "../../props/Reward";
import CreateReward from "../../compounds/CreateReward";
import RewardCard from "../../compounds/RewardCard";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";
import Line from "../../atoms/Line";
import initialState from "./initialState";
import fetchRewards from "./fetchRewards";
import consumeReward from "./consumeReward";
import { createReward } from "../../services/createReward";
import Stack from "../../atoms/Stack";
import Text from "../../atoms/Text";
import Spinner from "../../atoms/Spinner";

export default function Rewards(): JSX.Element {
  const [rewards, setRewards] = useState<RewardProps[]>([]);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [value, setValue] = useState<RewardProps>(initialState);
  const { user } = useUser();
  const { totalPoints, pointsPerHour } = user;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRewards(user, setRewards, setLoading);
  }, [user]);

  const content = isAddVisible ? "collapse" : "addReward";

  return (
    <>
      <h2>
        <Text>points</Text>: {totalPoints}
      </h2>
      <Card
        elevation={1}
        style={{
          padding: "0.4rem",
          alignItems: "center",
          marginBottom: "1.2rem",
        }}
      >
        <Line style={{ justifyContent: "space-between" }}>
          <Button
            onClick={() => setIsAddVisible(!isAddVisible)}
            variant="primary"
          >
            {content}
          </Button>
        </Line>
        {isAddVisible && (
          <Stack>
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
              <Button
                onClick={() =>
                  createReward(value, user, setValue, setIsAddVisible)
                }
                variant="secondary"
              >
                createReward
              </Button>
            </Line>
          </Stack>
        )}
      </Card>

      {loading ? (
        <Spinner />
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
              onCheck={() => consumeReward(item, user)}
            />
          ))
      )}
    </>
  );
}