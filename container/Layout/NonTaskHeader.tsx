import Link from "next/link";
import React from "react";
import styled from "styled-components";
import H4 from "../../atoms/H4";
import Text from "../../atoms/Text";

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
  return (
    <Wrapper>
      <Link href="/">
        <a>
          &larr; <Text>back</Text>
        </a>
      </Link>
      <H4>{title}</H4>
    </Wrapper>
  );
}
