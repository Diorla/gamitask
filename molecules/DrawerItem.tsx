import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

export interface DrawerItemProps {
  title?: string;
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
  padding: 0.8rem;
  cursor: pointer;
  align-items: center;
  color: initial;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  & > svg {
    color: ${({ iconColor, theme }) =>
      iconColor && theme.palette[iconColor].main};
    margin-right: 0.8rem;
  }
`;

export default function DrawerItem({
  title,
  icon,
  iconColor,
  active,
  href,
  onClick,
}: DrawerItemProps): JSX.Element {
  return href ? (
    <Link href={href}>
      <Styled iconColor={iconColor} active={active}>
        {icon}
        <FormattedMessage id={title} defaultMessage={title} />
      </Styled>
    </Link>
  ) : (
    <Styled iconColor={iconColor} active={active} onClick={onClick}>
      {icon}
      <FormattedMessage id={title} defaultMessage={title} />
    </Styled>
  );
}
