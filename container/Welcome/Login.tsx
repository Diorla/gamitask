import React, { useState } from "react";
import Button from "../../atoms/Button";
import Line from "../../atoms/Line";
import Spinner from "../../atoms/Spinner";
import Stack from "../../atoms/Stack";
import FormInput from "../../molecules/FormInput";
import { loginWithEmail } from "../../scripts/login";

const Login = ({ onClose }: { onClose: () => void }): JSX.Element => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const login = () => {
    loginWithEmail(credentials, () => {
      setLoading(true);
    });
  };

  const { email, password } = credentials;
  const active = email !== "" && password !== "";

  return (
    <Stack style={{ padding: "0.8rem" }}>
      <FormInput
        label="email"
        placeholder="email"
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
        value={password}
      />
      <Line style={{ justifyContent: "flex-end" }}>
        <Button
          variant="primary"
          disabled={loading || !active}
          onClick={login}
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
          disabled={loading}
          iconLeft={loading && <Spinner size="2rem" />}
        >
          close
        </Button>
      </Line>
    </Stack>
  );
};

export default Login;
