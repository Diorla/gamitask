import React from "react";
import BaseButton from "./BaseButton";
import ButtonProps from "./ButtonProps";
import InversePrimaryButton from "./InversePrimaryButton";
import InverseSecondaryButton from "./InverseSecondaryButton";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function Button({ variant, children, props }: ButtonProps) {
  if (variant && variant.includes("inverse")) {
    if (variant.includes("primary"))
      return <InversePrimaryButton {...props}>{children}</InversePrimaryButton>;
    if (variant.includes("secondary"))
      return (
        <InverseSecondaryButton {...props}>{children}</InverseSecondaryButton>
      );
  }
  if (variant === "primary")
    return <PrimaryButton {...props}>{children}</PrimaryButton>;
  if (variant === "secondary")
    return <SecondaryButton {...props}>{children}</SecondaryButton>;
  return <BaseButton {...props}>{children}</BaseButton>;
}

export {
  BaseButton,
  InversePrimaryButton,
  InverseSecondaryButton,
  PrimaryButton,
  SecondaryButton,
};
