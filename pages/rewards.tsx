import React, { useEffect, useState } from "react";
import { MdAddBox, MdCheck } from "react-icons/md";
import { toast } from "react-toastify";
import styled from "styled-components";
import { v4 } from "uuid";
import AppContainer from "../container/AppContainer";
import Layout from "../container/Layout";
import { useUser } from "../context/userContext";
import { useUserInfo } from "../context/userInfoContext";
import createData from "../scripts/createData";
import watchData from "../scripts/watchData";

// TODO: use batch write for all complex update instead of chaining
// TODO: use useEffect to clean up all watch mode
const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  align-items: center;
  box-shadow: 0 0 2px silver;
  margin: 4px;
  background: ${({ disabled }) => (disabled ? "silver" : "white")};
  & > div {
    display: flex;
    align-items: center;
  }
  & svg {
    margin-left: 20px;
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
    margin-right: 4px;
    font-size: 32px;
  }
`;
export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [value, setValue] = useState({ name: "", cost: 0 });
  const { user } = useUser();
  const { points } = useUserInfo();
  useEffect(() => {
    user &&
      watchData(`user/${user.uid}/rewards`, (e) => {
        setRewards(e);
      }).catch((err) => toast.error(err));
  }, [user]);

  const useReward = ({ id, done, cost, name }) => {
    if (points > cost)
      createData("user", `${user.uid}/rewards/${id}`, {
        done: [...done, Date.now()],
      })
        .then(() => {
          createData("user", user.uid, {
            points: points - cost,
          });
          toast(`${name} done`);
        })
        .catch((err) => toast.error(err));
  };

  const createNewReward = () => {
    const id = v4();
    createData("user", `${user.uid}/rewards/${id}`, {
      id,
      done: [],
      ...value,
    })
      .then(() => {
        setValue({ name: "", cost: 0 });
        setIsAddVisible(false);
        toast.success("New reward created");
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <Layout>
      <AppContainer active="rewards">
        <h2>Total points: {points}</h2>
        <Add onClick={() => setIsAddVisible(!isAddVisible)}>
          <MdAddBox /> Add
        </Add>
        {isAddVisible && (
          <div>
            <input
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              placeholder="Name"
            />
            <input
              onChange={(e) =>
                setValue({ ...value, cost: Number(e.target.value) })
              }
              placeholder="Cost"
              type="number"
            />
            <button onClick={createNewReward}>Create</button>
          </div>
        )}
        {rewards
          .sort((prev, next) => (prev.cost < next.cost ? -1 : 1))
          .map((item, idx) => (
            <Wrapper key={idx} disabled={points < item.cost}>
              <h4>{item.name}</h4>
              <div>
                {item.cost}
                <MdCheck onClick={() => useReward(item)} />
              </div>
            </Wrapper>
          ))}
      </AppContainer>
    </Layout>
  );
}
