import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const StyledInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const StyledLabel = styled.label<{ isChecked: boolean }>`
  cursor: pointer;
  width: 2.5rem;
  height: 1.5rem;
  display: block;
  border-radius: 1.25rem;
  position: relative;
  margin: 0.2rem;

  &:after {
    content: "";
    position: absolute;
    top: 0.2rem;
    left: 0.125rem;
    width: 1.125rem;
    height: 1.125rem;
    background: #fff;
    border-radius: 1.125rem;
    transition: 0.5s;
  }

  background: ${({ isChecked, theme }) =>
    isChecked ? theme.palette.primary.main : theme.palette.default.light};

  &:after {
    left: ${({ isChecked }) => isChecked && "calc(100% - 0.2rem)"};
    transform: ${({ isChecked }) => isChecked && "translateX(-100%)"};
  }

  &:active:after {
    width: 2rem;
  }
`;

const Text = styled.span<{ active: boolean }>`
  color: ${({ active, theme }) =>
    active ? theme.palette.primary.main : theme.palette.default.light};
  transition: 0.2s linear;
`;

export default function Switch({
  positive,
  negative,
  isChecked,
  onChange,
}: {
  positive: string;
  negative: string;
  isChecked: boolean;
  onChange: (e: any) => void;
}) {
  return (
    <StyledWrapper>
      <Text active={!isChecked}>{negative}</Text>
      <StyledInput type="checkbox" />
      <StyledLabel isChecked={isChecked} onClick={onChange} />
      <Text active={isChecked}>{positive}</Text>
    </StyledWrapper>
  );
}
