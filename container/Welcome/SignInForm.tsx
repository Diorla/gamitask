import React, { useState } from "react";
import Button from "../../atoms/Button";
import AuthButton from "../../compounds/AuthButton";
import { loginWithGoogle } from "../../scripts/login";
import { Header } from "./Column";
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

const SignInForm = ({ onClose, isNew, setIsNew }: SignInFormProps) => {
  const title = isNew ? "Sign Up" : "Sign In";
  const login = () => {
    loginWithGoogle(onClose);
  };
  return (
    <div>
      <Header>{title}</Header>
      <div>
        <AuthButton onClick={login} />
        <Button
          // variant="link" href="#"
          onClick={setIsNew}
        >
          {isNew ? "Already a user?" : "New user?"}
        </Button>
        {isNew ? <SignUp onClose={onClose} /> : <Login onClose={onClose} />}
      </div>
    </div>
  );
};

export default SignInForm;
