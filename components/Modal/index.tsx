import { useEffect } from "react";
import RModal from "react-modal";

const getCustomStyles = (width: number) => {
  return {
    overlay: {
      backgroundColor: "#000000b3",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: width ? width + "rem" : "80%",
      fontSize: "1.6rem",
    },
  };
};
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
  function closeModal() {
    onClose();
  }

  useEffect(() => {
    const elem = document.createElement("div");
    elem.id = "my-modal";
    document.body.appendChild(elem);
    RModal.setAppElement("#my-modal");
  }, []);
  return (
    <div>
      <RModal
        isOpen={visible}
        closeTimeoutMS={2000}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={getCustomStyles(width)}
        contentLabel="Example Modal"
      >
        {children}
      </RModal>
    </div>
  );
}
