import { useIntl } from "react-intl";
import styled from "styled-components";

const Wrapper = styled.textarea`
  outline: none;
  border: 0.1rem solid silver;
  padding: 0.4rem;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  display: flex;
  flex: 1;
  &:hover {
    border-color: ${({ theme }) => theme.palette.default.dark};
  }
`;

export default function TextArea({
  placeholder,
  id,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>): JSX.Element {
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
