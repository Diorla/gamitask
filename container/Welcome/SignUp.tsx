import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Form/Input";
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
      <Input
        placeholder="Email"
        onChange={(e: { target: { value: any; }; }) =>
          setCredentials({
            ...credentials,
            email: e.target.value,
          })
        }
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e: { target: { value: any; }; }) =>
          setCredentials({
            ...credentials,
            password: e.target.value,
          })
        }
      />
      <Input
        placeholder="Repeat password"
        type="password"
        onChange={(e: { target: { value: any; }; }) =>
          setCredentials({
            ...credentials,
            repassword: e.target.value,
          })
        }
      />
      <Action>
        <Button variant="primary" fluid disabled={!active} onClick={signUp}>
          Submit
        </Button>
        <Button onClick={onClose} color="red">
          Close
        </Button>
      </Action>
    </Column>
  );
};

export default SignUp;
