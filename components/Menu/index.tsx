import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import {
  UserIcon,
  MenuIcon,
  AddIcon,
  PointIcon,
  HelpIcon,
  NotificationIcon,
} from "./Icon";
import Avatar from "./Avatar";
import { PrimaryButton } from "../Button";

const Right = styled.div``;

export default function Menu({ profileImage, user }) {
  const User = () =>
    profileImage ? <Avatar src={profileImage} /> : <UserIcon />;
  return (
    <Nav>
      <MenuIcon />
      {user ? (
        <Right>
          <AddIcon />
          <PointIcon />
          <HelpIcon />
          <NotificationIcon />
          <User />
        </Right>
      ) : (
        <PrimaryButton>Login</PrimaryButton>
      )}
    </Nav>
  );
}
