import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import { MenuIcon, AddIcon, PointIcon, NotificationIcon } from "./Icon";
import Dropdown from "./Dropdown";
import Link from "next/link";
import CreateTask from "../../components/CreateTask";
import Modal from "../Modal";
import { useTaskState, useTaskDispatch } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import initialState from "../../context/taskContext/initialState";

const Right = styled.div`
  display: flex;
`;

const StyledLink = styled.a`
  color: white;
`;

export default function Menu({
  profileImage,
  onClick,
}: {
  profileImage: string;
  onClick: () => void;
}) {
  const task = useTaskState();
  const taskDispatch = useTaskDispatch();

  const openModal = () =>
    taskDispatch(
      addTask({
        ...task,
        showModal: true,
      })
    );

  const closeModal = () =>
    taskDispatch(
      addTask({
        ...initialState,
        showModal: false,
      })
    );
  return (
    <>
      <Nav>
        <StyledLink>
          <MenuIcon onClick={onClick} />
        </StyledLink>
        <Right>
          <AddIcon onClick={openModal} />
          <Link href="/points">
            <StyledLink>
              <PointIcon />
            </StyledLink>
          </Link>
          <Link href="/notifications">
            <StyledLink>
              <NotificationIcon />
            </StyledLink>
          </Link>
          <Dropdown profileImage={profileImage} />
        </Right>
      </Nav>
      <Modal visible={Boolean(task.showModal)} onClose={closeModal}>
        <CreateTask />
      </Modal>
    </>
  );
}
