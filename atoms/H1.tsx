import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";

const Wrapper = styled.h1`
  text-align: center;
`;

interface HeaderProps extends React.HtmlHTMLAttributes<HTMLHeadingElement> {
  children: string;
}

export default function H1({ children, ...props }: HeaderProps): JSX.Element {
  const intl = useIntl();
  return (
    <Wrapper {...props}>
      {intl.formatMessage({
        id: children,
        defaultMessage: children,
      })}
    </Wrapper>
  );
}
