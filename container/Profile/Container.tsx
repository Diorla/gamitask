import styled from "styled-components";
import Link from "next/link";

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.default.light};
  min-height: 100vh;
  font-size: 1.6rem;
`;
export const Main = styled.div`
  max-width: 96rem;
  margin: auto;
  background-color: white;
  padding-top: 0.8rem;
  min-height: 100vh;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 0.8rem;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  justify-content: space-between;
  border-bottom: 0.1rem solid silver;
  background-color: white;
  top: 0;
  position: fixed;
  width: 100%;
  & > a {
    text-decoration: none;
  }
`;

export default function Container({
  children,
}: {
  children: React.ReactChild | React.ReactChild[];
}): JSX.Element {
  return (
    <Wrapper>
      <Header>
        <h4>Profile</h4>
        <Link href="/">
          <a>Home</a>
        </Link>
      </Header>
      <Main>{children}</Main>
    </Wrapper>
  );
}
