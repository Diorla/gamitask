import React from "react";
import styled from "styled-components";
import Nav from "../../atoms/Nav";
import { MenuIcon, AddIcon } from "../../atoms/MenuIcon";
import Dropdown from "../Dropdown";
import Link from "next/link";
import CreateTask from "../../container/CreateTask";
import Modal from "../Modal";
import { useTaskState, useTaskDispatch } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import { useUser } from "../../context/userContext";
import getTodayPoints from "../../scripts/getTodayPoints";
import createData from "../../scripts/createData";
import { toast } from "react-toastify";
import Line from "../../atoms/Line";

const StyledLink = styled.a<{ variant?: string }>`
  color: ${({ theme }) => theme.palette.default.main};
  background-color: ${({ theme, variant }) =>
    variant ? theme.palette[variant].main : "transparent"};
  margin-right: 0.4rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  box-shadow: 0 0 0.2rem white;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.palette.default.main};
  }
`;

export default function Menu({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element {
  const task = useTaskState();
  const taskDispatch = useTaskDispatch();
  const {
    user: {
      uid,
      dailyPoints,
      dailyGoal,
      profileImage,
      lifetimeHours,
      previousLevel,
    },
  } = useUser();

  /**
   * For opening "Create Task"
   * @returns void
   */
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
  const level = Math.floor(Math.log2(lifetimeHours + 1));
  const previousLevelValue = previousLevel.value;

  /**
   * Inform user when they reach new level
   * And it will also update backend data
   * First test if current level is greater than registered level
   * Note, even though initialState is 0, it won't affect it because
   * without uid (and real level loaded), menu will never be registered
   */
  if (previousLevelValue < level) {
    createData("user", `${uid}`, {
      previousLevel: {
        value: level,
        date: Date.now(),
      },
    })
      .then(() => toast.success(`Congratulations! You reached level ${level}`))
      .catch((err) => toast.error(err.message));
  }
  return (
    <Nav>
      <MenuIcon onClick={onClick} />
      <Modal visible={Boolean(task.showModal)} onClose={() => ""} width={32}>
        <CreateTask />
      </Modal>
      <Line style={{ alignItems: "center", justifyContent: "flex-end" }}>
        {/* Minimum level is 0 */}
        <StyledLink>Lv-{level + 1}</StyledLink>
        <Link href="/stats">
          <StyledLink variant={colourCode}>{Math.abs(remainPoints)}</StyledLink>
        </Link>
        <AddIcon onClick={openModal} />
        <Dropdown profileImage={profileImage} />
      </Line>
    </Nav>
  );
}
