import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";

const Wrapper = styled.h1``;

export default function H1({
  children,
  ...props
}: {
  children: string;
  props: React.HtmlHTMLAttributes<any>;
}) {
  const intl = useIntl();
  return (
    <Wrapper {...props}>
      {intl.formatMessage({
        id: children,
        defaultMessage: "header 1",
      })}
    </Wrapper>
  );
}
