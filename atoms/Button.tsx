import { useIntl } from "react-intl";
import styled from "styled-components";
import { contrastColor } from "../scripts/color-functions";

type variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "warning"
  | "info"
  | "success";
const Wrapper = styled.button<{ variant?: variant }>`
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 0.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: ${({ variant, theme }) =>
    variant && theme.palette[variant].main};
  color: ${({ variant, theme }) =>
    variant && contrastColor(theme.palette[variant].main)};
  &:hover {
    box-shadow: ${({ theme }) => theme.elevation[1]};
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactChild;
  variant?: variant;
  /**
   * Need this to add extra content without translation
   */
  extra?: React.ReactNode;
}
export default function Button({
  children,
  iconLeft,
  iconRight,
  variant,
  extra,
  ...props
}: ButtonProps): JSX.Element {
  const intl = useIntl();
  return (
    <Wrapper variant={variant} {...props}>
      {iconLeft}
      {intl.formatMessage({
        id: children,
        defaultMessage: children,
      })}
      {extra}
      {iconRight}
    </Wrapper>
  );
}
