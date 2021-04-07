import React from "react";
import Backdrop from "./Backdrop";
import Box from "./Box";

/**
 * ?//TODO: Add modal animation
 */
export default function Modal({
  visible,
  children,
  width,
  onClose,
}: {
  visible: boolean;
  children: React.ReactNode;
  width?: number;
  onClose: () => void;
}) {
  if (visible)
    return (
      <Backdrop
        onClick={(e: React.SyntheticEvent) => {
          if (e.currentTarget === e.target) onClose();
        }}
      >
        <Box width={width}>{children}</Box>
      </Backdrop>
    );
  return null;
}
