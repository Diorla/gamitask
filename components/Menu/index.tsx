import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import { MenuIcon, AddIcon } from "./Icon";
import Dropdown from "./Dropdown";
import Link from "next/link";
import CreateTask from "../../components/CreateTask";
import Modal from "../Modal";
import { useTaskState, useTaskDispatch } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import { useUser } from "../../context/userContext";
import getTodayPoints from "../../scripts/getTodayPoints";

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled.a<{ variant?: string }>`
  color: ${({ theme }) => theme.palette.default.main};
  background-color: ${({ theme, variant }) =>
    variant ? theme.palette[variant].main : "transparent"};
  margin-right: 0.4rem;
  padding: 0.4rem;
  border-radius: 0.2rem;
  cursor: pointer;
  box-shadow: 0 0 0.2rem white;
`;

export default function Menu({ onClick }: { onClick: () => void }) {
  const task = useTaskState();
  const taskDispatch = useTaskDispatch();
  const {
    user: { dailyPoints, dailyGoal, profileImage, lifetimeHours },
  } = useUser();
  const openModal = () =>
    taskDispatch(
      addTask({
        ...task,
        showModal: true,
      })
    );
  const todayPoints = getTodayPoints(dailyPoints);
  const remainPoints = todayPoints - dailyGoal;
  const colourCode = remainPoints > 0 ? "success" : "error";
  // log2 of 0 -Infinity, while log2 of 1 is 0;
  // 1 is the minimum level
  const level = Math.floor(Math.log2(lifetimeHours + 1)) + 1;
  return (
    <>
      <Nav>
        <MenuIcon onClick={onClick} />
        <Right>
          <StyledLink>Lv-{level}</StyledLink>
          <Link href="/stats">
            <StyledLink variant={colourCode}>
              {Math.abs(remainPoints)}
            </StyledLink>
          </Link>
          <AddIcon onClick={openModal} />
          {/* <Link href="/notifications">
            <StyledLink>
              <NotificationIcon />
            </StyledLink>
          </Link> */}
          <Dropdown profileImage={profileImage} />
        </Right>
      </Nav>
      <Modal visible={Boolean(task.showModal)} onClose={() => ""} width={32}>
        <CreateTask />
      </Modal>
    </>
  );
}
