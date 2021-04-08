import Link from "next/link";
import React from "react";
import styled from "styled-components";

export interface DrawerItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  active?: boolean;
}

const Styled = styled.a<DrawerItemProps>`
  background-color: ${({ active }) =>
    active ? "rgba(0, 0, 0, 0.2)" : "transparent"};
  display: flex;
  padding: 8px;
  cursor: pointer;
  transition: 0.2s linear;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  & > svg {
    color: ${({ iconColor, theme }) =>
      iconColor && theme.palette[iconColor].main};
    margin-right: 8px;
  }
`;

export default function DrawerItem({
  children,
  icon,
  iconColor,
  active,
  href,
  onClick,
}: DrawerItemProps) {
  return href ? (
    <Link href={href}>
      <Styled iconColor={iconColor} active={active}>
        {icon} {children}
      </Styled>
    </Link>
  ) : (
    <Styled iconColor={iconColor} active={active} onClick={onClick}>
      {icon} {children}
    </Styled>
  );
}
