import React, { useState } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import { MenuIcon, AddIcon, PointIcon, NotificationIcon } from "./Icon";
import Dropdown from "./Dropdown";
import Link from "next/link";
import CreateTask from "../../container/CreateTask";
import Modal from "../Modal";

const Right = styled.div`
  display: flex;
`;

const StyledLink = styled.a`
  color: white;
`;

export default function Menu({ profileImage }) {
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  return (
    <Nav>
      <Link href="/">
        <StyledLink>
          <MenuIcon />
        </StyledLink>
      </Link>
      <Right>
        <AddIcon onClick={() => setAddTaskVisible(true)} />
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
      <Modal visible={addTaskVisible} onClose={() => setAddTaskVisible(false)}>
        <CreateTask />
      </Modal>
    </Nav>
  );
}
