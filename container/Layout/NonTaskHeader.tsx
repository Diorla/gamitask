import Link from "next/link";
import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  justify-content: space-between;
  border-bottom: 0.1rem solid silver;
  background-color: white;
  top: 0;
  position: fixed;
  width: 100%;
  & > a {
    text-decoration: none;
  }
`;

export default function NonTaskHeader({
  title,
}: {
  title: string;
}): JSX.Element {
  const intl = useIntl();
  return (
    <Wrapper>
      <Link href="/">
        <a>&larr; Back</a>
      </Link>
      <h4>
        {intl.formatMessage({
          id: title,
          defaultMessage: title,
        })}
      </h4>
    </Wrapper>
  );
}
