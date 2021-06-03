import React from "react";
import { FaGoogle } from "react-icons/fa";
import Button from "../../atoms/Button";
import H2 from "../../atoms/H2";
import Line from "../../atoms/Line";
import Link from "../../atoms/Link";
import Stack from "../../atoms/Stack";
import { loginWithGoogle } from "../../scripts/login";
import Login from "./Login";
import SignUp from "./SignUp";

export interface SignInFormProps {
  onClose: () => void;
  isNew: boolean;
  setIsNew: () => void;
}

export interface SignInProps {
  email: string;
  password: string;
  repassword?: string;
}

const SignInForm = ({
  onClose,
  isNew,
  setIsNew,
}: SignInFormProps): JSX.Element => {
  const title = isNew ? "signUp" : "signIn";
  const login = () => {
    loginWithGoogle(onClose);
  };

  return (
    <Stack>
      <H2>{title}</H2>
      <Stack>
        <Line style={{ justifyContent: "space-around" }}>
          <Button
            onClick={login}
            iconLeft={<FaGoogle style={{ marginRight: "0.2rem" }} />}
            style={{
              backgroundColor: "#dc4e41",
              color: "white",
              padding: "0.8rem",
            }}
          >
            loginWithGoogle
          </Button>
        </Line>
        <Link onClick={setIsNew}>{isNew ? "alreadyAUser?" : "newUser?"}</Link>
        {isNew ? <SignUp onClose={onClose} /> : <Login onClose={onClose} />}
      </Stack>
    </Stack>
  );
};

export default SignInForm;
