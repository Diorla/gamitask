import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import { MenuIcon, AddIcon, PointIcon, NotificationIcon } from "./Icon";
import Dropdown from "./Dropdown";
import Link from "next/link";

const Right = styled.div`
  display: flex;
`;

const StyledLink = styled.a`
  color: white;
`;

export default function Menu({ profileImage }) {
  return (
    <Nav>
      <Link href="/">
        <StyledLink>
          <MenuIcon />
        </StyledLink>
      </Link>
      <Right>
        <AddIcon />
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
  );
}
