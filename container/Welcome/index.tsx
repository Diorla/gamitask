import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../atoms/Button";
import { MenuIcon } from "../../atoms/MenuIcon";
import Modal from "../../compounds/Modal";
import SignInForm from "./SignInForm";

const Wrapper = styled.div`
  min-height: 100vh;
  font-size: 1.6rem;
`;

const LandingPage = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.palette.secondary.light}66;
  overflow-x: hidden;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
`;

const CTA = styled.div`
  background-image: url(welcome/control.svg);
  height: 32rem;
  background-size: 15rem;
  background-repeat: no-repeat;
  background-position: center;
  padding: 1.6rem;
  & > h1 {
    font-family: cursive;
    color: ${({ theme }) => theme.palette.primary.dark};
  }
  & > div {
    width: 30rem;
    font-size: 1.8rem;
    text-shadow: 0 0 ${({ theme }) => theme.palette.secondary.main};
  }
`;

export default function SignIn(): JSX.Element {
  const [visible, setVisible] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const openNewUser = () => {
    setIsNew(true);
    setVisible(true);
  };

  const openOldUser = () => {
    setIsNew(false);
    setVisible(true);
  };
  return (
    <Wrapper>
      <LandingPage>
        <Top>
          <MenuIcon />
          <div>
            <Button onClick={openOldUser} variant="secondary">
              login
            </Button>
            <Button onClick={openNewUser} variant="primary">
              join
            </Button>
          </div>
        </Top>
        <CTA>
          <h1>Take Control</h1>
          <div>
            Find the motivation to fight procrastination and become more
            efficient
          </div>
        </CTA>
      </LandingPage>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <SignInForm
          onClose={() => setVisible(false)}
          isNew={isNew}
          setIsNew={() => setIsNew(!isNew)}
        />
      </Modal>
    </Wrapper>
  );
}
