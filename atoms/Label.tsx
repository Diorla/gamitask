import { useIntl } from "react-intl";
import styled from "styled-components";

const Wrapper = styled.label``;

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: string;
}
export default function H1({ children, htmlFor, ...props }: LabelProps) {
  const intl = useIntl();
  return (
    <Wrapper htmlFor={htmlFor} {...props}>
      {intl.formatMessage({
        id: children,
        defaultMessage: children,
      })}
    </Wrapper>
  );
}
