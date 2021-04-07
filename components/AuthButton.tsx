import styled from "styled-components";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";

export interface AuthButtonProps {
  type?: "google" | "facebook";
  [props: string]: any;
}

const StyledButton = styled.button`
  display: flex;
  border: none;
  padding: 8px;
  min-width: 180px;
  width: 80%;
  margin: auto;
  border-radius: 16px;
  justify-content: flex-start;
  outline: none;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid;
  background: ${({ theme }) => theme.palette.default.color};
  font-weight: bold;
  transition: 0.4s linear;
`;

const StyledGoogle = styled(StyledButton)`
  color: #dc4e41;
  &:hover {
    background-color: #dc4e4116;
  }
  &:active {
    background-color: #dc4e4166;
  }
`;
const StyledFacebook = styled(StyledButton)`
  color: #3b5998;
  &:hover {
    background-color: #3b599816;
  }
  &:active {
    background-color: #3b599866;
  }
`;

const GoogleButton = ({ ...props }: { [props: string]: any }) => (
  <StyledGoogle {...props}>
    <FaGoogle style={{ marginRight: 4 }} />
    Google
  </StyledGoogle>
);
const FacebookButton = ({ ...props }: { [props: string]: any }) => (
  <StyledFacebook {...props}>
    <FaFacebookSquare style={{ marginRight: 4 }} />
    Facebook
  </StyledFacebook>
);

const AuthButton = ({ type = "google", ...props }: AuthButtonProps) => {
  if (type === "facebook") return <FacebookButton {...props} />;
  return <GoogleButton {...props} />;
};

export default AuthButton;
