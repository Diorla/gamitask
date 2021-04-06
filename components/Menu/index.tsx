import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import { UserIcon, MenuIcon, AddIcon, PointIcon, HelpIcon, NotificationIcon } from "./Icon";
import Avatar from "./Avatar";



const Right = styled.div``;


export default function Menu({ profileImage }) {
  const User = () =>
    profileImage ? <Avatar src={profileImage} /> : <UserIcon />;
  return (
    <Nav>
      <MenuIcon />
      <Right>
        <AddIcon />
        <PointIcon />
        <HelpIcon />
        <NotificationIcon />
        <User />
      </Right>
    </Nav>
  );
}
