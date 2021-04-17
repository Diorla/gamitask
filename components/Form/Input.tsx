import styled from "styled-components";

export interface InputProps {
  label?: string;
  [props: string]: any;
}

const StyledInput = styled.input<InputProps>`
  border: 0.1rem solid ${({ theme }) => theme.palette.default.light};
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.palette.default.dark};
  font-size: 1.6rem;
  padding: 0.6rem 0.8rem;
  border-radius: 1.6rem;
  &::placeholder {
    font-size: 1.4rem;
  }
  &:focus {
    box-shadow: 0 0 0.2rem;
  }
  &:invalid {
    box-shadow: 0 0 0.2rem crimson;
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
