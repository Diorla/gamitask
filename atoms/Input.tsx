import { useIntl } from "react-intl";
import styled from "styled-components";

const Wrapper = styled.input`
  outline: none;
  border: 0.1rem solid silver;
  padding: 0.4rem;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  &:hover {
    border-color: ${({ theme }) => theme.palette.default.dark};
  }
`;

export default function H1({
  placeholder,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const intl = useIntl();
  return (
    <Wrapper
      id={id}
      placeholder={intl.formatMessage({
        id: placeholder,
        defaultMessage: placeholder,
      })}
      {...props}
    />
  );
}
