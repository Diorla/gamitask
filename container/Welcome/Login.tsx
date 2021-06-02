import React, { useState } from "react";
import Button from "../../atoms/Button";
import FormInput from "../../molecules/FormInput";
import { loginWithEmail } from "../../scripts/login";
import Column, { Action } from "./Column";

const Login = ({ onClose }: { onClose: () => void }): JSX.Element => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const login = () => {
    loginWithEmail(credentials, onClose);
  };

  const { email, password } = credentials;
  const active = email !== "" && password !== "";

  return (
    <Column>
      <FormInput
        label="email"
        placeholder="Email"
        onChange={(e: any) =>
          setCredentials({
            ...credentials,
            email: e.target.value,
          })
        }
        value={email}
      />
      <FormInput
        label="password"
        placeholder="password"
        type="password"
        onChange={(e: any) =>
          setCredentials({
            ...credentials,
            password: e.target.value,
          })
        }
        value="password"
      />
      <Action>
        <Button variant="primary" disabled={!active} onClick={login}>
          submit
        </Button>
        <Button onClick={onClose} variant="error">
          close
        </Button>
      </Action>
    </Column>
  );
};

export default Login;
