import React, { useState } from "react";
import Button from "../../atoms/Button";
import Line from "../../atoms/Line";
import Spinner from "../../atoms/Spinner";
import Stack from "../../atoms/Stack";
import FormInput from "../../molecules/FormInput";
import signUpWithEmail from "./signUpWithEmail";

const SignUp = ({ onClose }: { onClose: () => void }): JSX.Element => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    repassword: "",
  });

  const [loading, setLoading] = useState(false);
  const signUp = () => {
    signUpWithEmail(credentials, () => {
      setLoading(true);
    });
  };

  const { email, password, repassword } = credentials;
  const active = email !== "" && password !== "" && password === repassword;
  return (
    <Stack style={{ padding: "0.8rem" }}>
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
      <Line style={{ justifyContent: "flex-end" }}>
        <Button
          variant="primary"
          disabled={!active}
          onClick={signUp}
          style={{
            marginRight: "0.4rem",
          }}
          iconLeft={loading && <Spinner size="2rem" />}
        >
          submit
        </Button>
        <Button
          onClick={onClose}
          variant="error"
          iconLeft={loading && <Spinner size="2rem" />}
        >
          close
        </Button>
      </Line>
    </Stack>
  );
};

export default SignUp;
