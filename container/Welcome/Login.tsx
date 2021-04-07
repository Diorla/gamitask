import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Form/Input";
import { loginWithEmail } from "../../scripts/login";
import Column, { Action } from "./Column";


const Login = ({ onClose }: { onClose: () => void }) => {
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
      <Input
        placeholder="Email"
        onChange={(e) =>
          setCredentials({
            ...credentials,
            email: e.target.value,
          })
        }
      />
      <Input
        placeholder="password"
        type="password"
        onChange={(e) =>
          setCredentials({
            ...credentials,
            password: e.target.value,
          })
        }
      />
      <Action>
        <Button variant="primary" fluid disabled={!active} onClick={login}>
          Submit
        </Button>
        <Button onClick={onClose} color="red">
          Close
        </Button>
      </Action>
    </Column>
  );
};

export default Login;