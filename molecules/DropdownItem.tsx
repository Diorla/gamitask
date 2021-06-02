import Link from "next/link";
import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";

export const Wrapper = styled.a`
  margin: 0.4rem 0.8rem;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

export default function DropdownItem({
  title,
  href = "",
  onClick,
}: {
  title: string;
  href?: string;
  onClick?: () => void;
}): JSX.Element {
  const intl = useIntl();
  return (
    <Link href={href}>
      <Wrapper onClick={onClick}>
        {intl.formatMessage({
          id: title,
          defaultMessage: title,
        })}
      </Wrapper>
    </Link>
  );
}
