import React, { useState, useRef } from "react";
import styled from "styled-components";
import logout from "../../scripts/logout";
import Divider from "../Divider";
import Avatar from "./Avatar";
import DropdownItem from "./DropdownItem";
import { UserIcon } from "./Icon";
import { useClickAway } from "react-use";
import Link from "next/link";

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
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowDropDownMenu(false);
  });

  return (
    <div ref={ref}>
      <User onClick={() => setShowDropDownMenu(!showDropDownMenu)} />
      {showDropDownMenu && (
        <DropdownMenu>
          <Link href="/profile">
            <DropdownItem>Profile</DropdownItem>
          </Link>
          <Link href="/settings">
            <DropdownItem>Settings</DropdownItem>
          </Link>
          <Link href="/help">
            <DropdownItem>Help</DropdownItem>
          </Link>
          <Link href="/stats">
            <DropdownItem>Stats</DropdownItem>
          </Link>
          <Divider />
          <DropdownItem onClick={logout}>Log out</DropdownItem>
        </DropdownMenu>
      )}
    </div>
  );
}