import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

export interface InputProps {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "warning"
    | "success"
    | "info";
  label?: string;
  [props: string]: any;
}

const StyledInput = styled.input<InputProps>`
  border: 0.1rem solid
    ${({ theme, variant }) =>
      variant ? theme.palette[variant].color : theme.palette.default.offwhite};
  outline: none;
  background: transparent;
  font-size: 1.6rem;
  padding: 0.6rem 0.8rem;
  border-radius: 0.6rem;
  &::placeholder {
    font-size: 1.4rem;
  }
  &:focus {
    box-shadow: 0 0 0.2rem;
  }
  &:invalid {
    box-shadow: 0 0 0.4rem ${({ theme }) => theme.palette.error.color};
  }
`;

const StyledLabel = styled.label`
  font-size: 1.4rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = ({ label, variant, ...props }: InputProps) => {
  const randomId = "s" + ~~(1000000000 * Math.random());
  return (
    <Wrapper>
      {label && (
        <StyledLabel htmlFor={randomId}>
          <FormattedMessage id={label} />
        </StyledLabel>
      )}
      <StyledInput variant={variant} id={randomId} {...props} />
    </Wrapper>
  );
};

export default Input;
