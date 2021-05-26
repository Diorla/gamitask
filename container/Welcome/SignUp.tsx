import React, { useState } from "react";
import Button from "../../atoms/Button";
import FormInput from "../../molecules/FormInput";
import { signUpWithEmail } from "../../scripts/login";
import Column, { Action } from "./Column";

const SignUp = ({ onClose }: { onClose: () => void }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    repassword: "",
  });

  const signUp = () => {
    signUpWithEmail(credentials, onClose);
  };

  const { email, password, repassword } = credentials;
  const active = email !== "" && password !== "" && password === repassword;
  return (
    <Column>
      <FormInput
        label="email"
        value={email}
        placeholder="email"
        onChange={(e: { target: { value: any } }) =>
          setCredentials({
            ...credentials,
            email: e.target.value,
          })
        }
      />
      <FormInput
        label="password"
        value={password}
        placeholder="password"
        type="password"
        onChange={(e: { target: { value: any } }) =>
          setCredentials({
            ...credentials,
            password: e.target.value,
          })
        }
      />
      <FormInput
        label="repassword"
        value={repassword}
        placeholder="repassword"
        type="password"
        onChange={(e: { target: { value: any } }) =>
          setCredentials({
            ...credentials,
            repassword: e.target.value,
          })
        }
      />
      <Action>
        <Button variant="primary" disabled={!active} onClick={signUp}>
          submit
        </Button>
        <Button onClick={onClose} variant="error">
          close
        </Button>
      </Action>
    </Column>
  );
};

export default SignUp;
