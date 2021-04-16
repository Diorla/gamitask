import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { MenuIcon } from "../../components/Menu/Icon";
import Modal from "../../components/Modal";
import SignInForm from "./SignInForm";
// import { loginWithGoogle } from "../scripts/login";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const LandingPage = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.palette.secondary.light}66;
  overflow-x: hidden;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const CTA = styled.div`
  background-image: url(welcome/control.svg);
  height: 320px;
  background-size: 150px;
  background-repeat: no-repeat;
  background-position: center;
  padding: 16px;
  & > h1 {
    font-family: cursive;
    color: ${({ theme }) => theme.palette.primary.dark};
  }
  & > div {
    width: 300px;
    font-size: 18px;
    text-shadow: 0 0 ${({ theme }) => theme.palette.secondary.main};
  }
`;

export default function SignIn() {
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
            <Button onClick={openOldUser} variant="link">
              Login
            </Button>
            <Button onClick={openNewUser} variant="primary">
              Join now
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
      <Modal visible={visible} width={320} onClose={() => setVisible(false)}>
        <SignInForm
          onClose={() => setVisible(false)}
          isNew={isNew}
          setIsNew={() => setIsNew(!isNew)}
        />
      </Modal>
    </Wrapper>
  );
}
