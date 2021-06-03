import { useIntl } from "react-intl";
import styled from "styled-components";

type variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "warning"
  | "info"
  | "success";

const Wrapper = styled.a<{ variant?: variant }>`
  cursor: pointer;
  color: ${({ variant, theme }) =>
    variant ? theme.palette[variant].main : theme.palette.link.main};
  &:hover {
    color: ${({ variant, theme }) =>
      variant ? theme.palette[variant].dark : theme.palette.link.dark};
    text-decoration: underline;
  }
`;

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
  variant?: variant;
}
export default function Link({
  children,
  variant,
  ...props
}: LinkProps): JSX.Element {
  const intl = useIntl();
  return (
    <Wrapper variant={variant} {...props}>
      {intl.formatMessage({
        id: children,
        defaultMessage: children,
      })}
    </Wrapper>
  );
}
