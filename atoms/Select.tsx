import styled from "styled-components";

const Wrapper = styled.select`
  outline: none;
  border: 0.1rem solid silver;
  padding: 0.4rem;
  border-radius: 0.4rem;
  &:hover {
    border-color: ${({ theme }) => theme.palette.default.dark};
  }
`;

export default function Select({
  value,
  id,
  onChange,
  disabled,
  children,
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrapper id={id} value={value} onChange={onChange} disabled={disabled}>
      {children}
    </Wrapper>
  );
}
