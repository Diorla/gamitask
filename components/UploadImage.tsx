import { useRef, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import ProfileImage from "../container/Profile/ProfileImage";
import { useUser } from "../context/userContext";
import firebase from "../firebase/clientApp";

export const ImageBackground = styled.div<{ bkg: string }>`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid silver;
  background: url(${({ bkg }) => bkg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const ImageInput = styled.input`
  height: 0px;
  width: 0px;
  cursor: pointer;
`;
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
    <div>
      <div style={{ height: "8rem", textAlign: "center" }}>
        {loading ? (
          <div
            className="spinner-border text-info"
            style={{ height: "10rem", width: "10rem", display: "inline-block" }}
          ></div>
        ) : (
          <ProfileImage src={imageUrl} alt="User profile" />
        )}
      </div>
      <ImageInput
        type="file"
        accept="image/*"
        onChange={(e) => {
          selectFile(e);
        }}
        ref={inputRef}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "20rem",
        }}
      >
        <button
          className="btn btn-primary"
          onClick={openImageDialog}
          style={{ fontSize: "1.6rem" }}
        >
          Select Image
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setImage("./profile.png")}
          style={{ fontSize: "1.6rem" }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
