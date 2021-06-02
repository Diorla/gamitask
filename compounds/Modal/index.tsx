import React from "react";
import Card from "../../atoms/Card";
import Backdrop from "./Backdrop";

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
}): JSX.Element | null {
  if (visible)
    return (
      <Backdrop
        onClick={(e: React.SyntheticEvent) => {
          if (e.currentTarget === e.target) onClose();
        }}
      >
        <Card
          style={{
            width: width ? width + "rem" : "80%",
            backgroundColor: "white",
            padding: "0.2rem",
          }}
        >
          {children}
        </Card>
      </Backdrop>
    );
  return null;
}
