import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import {
  MenuIcon,
  AddIcon,
  PointIcon,
  NotificationIcon,
} from "./Icon";
import Dropdown from "./Dropdown";

const Right = styled.div`
  display: flex;
`;

export default function Menu({ profileImage }) {
  return (
    <Nav>
      <MenuIcon />
      <Right>
        <AddIcon />
        <PointIcon />
        <NotificationIcon />
        <Dropdown profileImage={profileImage} />
      </Right>
    </Nav>
  );
}
