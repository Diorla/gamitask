import styled from "styled-components";

const Wrapper = styled.input`
  outline: none;
  border: 0.1rem solid silver;
  padding: 0.4rem;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  &:hover {
    border-color: ${({ theme }) => theme.palette.default.dark};
  }
  &:disabled {
    color: ${({ theme }) => theme.palette.default.dark};
  }
`;

export default function Input({
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return <Wrapper id={id} type="radio" {...props} />;
}
