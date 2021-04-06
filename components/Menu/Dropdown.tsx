import React, { useState } from "react";
import styled from "styled-components";
import logout from "../../scripts/logout";
import Divider from "../Divider";
import Avatar from "./Avatar";
import DropdownItem from "./DropdownItem";
import { UserIcon } from "./Icon";

const DropdownMenu = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background: silver;
  right: 2px;
  min-width: 60px;
  box-shadow: 0 0 2px black;
  background: white;
  border-radius: 4px;
`;

export default function Dropdown({ profileImage }) {
  const User = ({ onClick }) =>
    profileImage ? (
      <Avatar src={profileImage} onClick={onClick} />
    ) : (
      <UserIcon onClick={onClick} />
    );
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);

  return (
    <div>
      <User onClick={() => setShowDropDownMenu(!showDropDownMenu)} />
      {showDropDownMenu && (
        <DropdownMenu>
          <DropdownItem href="/">Profile</DropdownItem>
          <DropdownItem href="/">Settings</DropdownItem>
          <DropdownItem href="/">Help</DropdownItem>
          <DropdownItem href="/">Stats</DropdownItem>
          <Divider />
          <DropdownItem onClick={logout}>Log out</DropdownItem>
        </DropdownMenu>
      )}
    </div>
  );
}
