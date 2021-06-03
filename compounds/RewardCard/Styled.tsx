import styled from "styled-components";

export const StrikeThrough = styled.div`
  text-decoration: line-through;
  display: flex;
  align-items: center;
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
  padding: 0.8rem;
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
