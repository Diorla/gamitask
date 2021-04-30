import styled from "styled-components";

export const StrikeThrough = styled.div`
  text-decoration: line-through;
  display: flex;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const Wrapper = styled.div<{ disabled: boolean }>`
  box-shadow: 0 0 0.2rem silver;
  margin: 0.6rem 0.2rem;
  display: flex;
  & > div:last-child {
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  }
  & .disabled {
    background-color: ${({ theme }) => theme.palette.error.main};
  }
  & .enabled {
    background-color: ${({ theme }) => theme.palette.success.main};
  }
`;

export const Time = styled.div`
  display: inline-flex;
  flex-direction: column;
  text-align: center;
  margin: 0.4rem;
  line-height: 1.4rem;
`;

export const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0.4rem;
`;

export const Right = styled.div`
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
`;

export const Title = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
`;

export const Centre = styled.div`
  padding-left: 0.4rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: bold;
`;

export const Bottom = styled.div`
  margin: 0.4rem 0;
  border-top: 0.1rem solid silver;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.1rem;
`;

/**
 * TODO: Merge this button with Taskcard button
 * So I will move it to components
 * And if possible/better, will create EditButton, DeleteButton and ArchiveButton
 */
export const Button = styled.button<{ variant: string }>`
  border: 0.1rem solid silver;
  cursor: pointer;
  margin: 0.2rem;
  display: inline-flex;
  align-items: center;
  padding: 0.2rem;
  & > svg {
    color: ${({ theme, variant }) => theme.palette[variant].dark};
    margin-right: 0.4rem;
  }
  &:hover {
    border: 0.1rem solid #949090;
    background: silver;
  }
`;

export const StyledNotes = styled.div`
  border-left: 0.2rem solid silver;
  padding-left: 0.4rem;
  margin-left: 0.4rem;
  font-style: italic;
`;
