import React, { useRef, useState } from "react";
import { MdFileUpload, MdRemoveCircle } from "react-icons/md";
import { toast } from "react-toastify";
import Avatar from "../../atoms/Avatar";
import Button from "../../atoms/Button";
import Line from "../../atoms/Line";
import Spinner from "../../atoms/Spinner";
import Stack from "../../atoms/Stack";
import { useUser } from "../../context/userContext";
import firebase from "../../firebase/clientApp";
import ImageInput from "./ImageInput";

export default function UploadImage({
  imageUrl,
  setImage,
}: {
  imageUrl: string;
  setImage: (e: any) => void;
}): JSX.Element {
  const [loading, setLoading] = useState(false);
  const {
    user: { uid },
  } = useUser();
  const selectFile = (e: any) => {
    const imageName = "a" + Date.now();
    setLoading(true);
    firebase
      .storage()
      .ref(`public/${uid}/${imageName}`)
      .put(e.target.files[0])
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          setImage(downloadURL);
          setLoading(false);
        });
      })

      .catch((fbError) => {
        toast.error(fbError.message);
      });
  };
  const inputRef = useRef<null | HTMLInputElement>(null);

  const openImageDialog = () => {
    inputRef?.current?.click();
  };
  return (
    <Stack style={{ justifyContent: "space-around", flex: 0 }}>
      <Line style={{ justifyContent: "center" }}>
        {loading ? (
          <Spinner size="10rem" />
        ) : (
          <Avatar
            size="10rem"
            src={imageUrl}
            alt="User profile"
            style={{ margin: "0.4rem auto" }}
          />
        )}
      </Line>
      <ImageInput
        type="file"
        accept="image/*"
        onChange={(e) => {
          selectFile(e);
        }}
        ref={inputRef}
      />
      <Line
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          flex: 0,
        }}
      >
        <Button
          onClick={openImageDialog}
          iconLeft={<MdFileUpload />}
          variant="info"
          style={{ marginRight: "0.4rem" }}
        >
          selectImage
        </Button>
        <Button
          iconLeft={<MdRemoveCircle />}
          onClick={() => setImage("./profile.png")}
          variant="warning"
        >
          remove
        </Button>
      </Line>
    </Stack>
  );
}
