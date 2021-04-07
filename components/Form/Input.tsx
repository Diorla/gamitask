import styled from "styled-components";

export interface InputProps {
  label?: string;
  [props: string]: any;
}

const StyledInput = styled.input<InputProps>`
  border: 1px solid ${({ theme }) => theme.palette.default.light};
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.palette.default.dark};
  font-size: 16px;
  padding: 6px 8px;
  border-radius: 16px;
  &::placeholder {
    font-size: 14px;
  }
  &:focus {
    box-shadow: 0 0 2px;
  }
  &:invalid {
    box-shadow: 0 0 2px crimson;
  }
`;

const StyledLabel = styled.label`
  font-size: 14px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = ({ label, variant, ...props }: InputProps) => {
  // ~~ = Math.floor, only for positive values
  const randomId = "s" + ~~(1000000000 * Math.random());
  return (
    <Wrapper>
      {label && <StyledLabel htmlFor={randomId}>{label}</StyledLabel>}
      <StyledInput variant={variant} id={label && randomId} {...props} />
    </Wrapper>
  );
};

export default Input;
