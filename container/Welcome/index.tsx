import React, { useState } from "react";
import Modal from "../../compounds/Modal";
import SignInForm from "./SignInForm";
import Stack from "../../atoms/Stack";
import Landing from "./Landing";
import Top from "./Top";
import CTA from "./CTA";

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
    <Stack style={{ fontSize: "1.6rem" }}>
      <Landing>
        <Top openNewUser={openNewUser} openOldUser={openOldUser} />
        <CTA />
      </Landing>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <SignInForm
          onClose={() => setVisible(false)}
          isNew={isNew}
          setIsNew={() => setIsNew(!isNew)}
        />
      </Modal>
    </Stack>
  );
}
