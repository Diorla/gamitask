import styled from "styled-components";
import { loginWithGoogle } from "../scripts/login";

const Lnk = styled.a`
  color: ${({ theme }) => theme.palette.link.color};
`;
export default function SignIn() {
  return (
    <div className="container">
      <main>
        <button onClick={() => loginWithGoogle()}>Login</button>
      </main>
    </div>
  );
}
