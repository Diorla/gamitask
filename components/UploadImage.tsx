import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useUser } from "../context/userContext";
import firebase from "../firebase/clientApp";

export const ImageBackground = styled.div<{ bkg: string }>`
  height: 200px;
  width: 200px;
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
  height: 200px;
  width: 200px;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  cursor: pointer;
`;
export default function UploadImage({
  imageUrl,
  alt,
  setImage,
}: {
  imageUrl: string;
  alt: string;
  setImage: (e: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const {
    user: { uid },
  } = useUser();
  const selectFile = (e: any) => {
    setLoading(true);
    firebase
      .storage()
      .ref(`public/${uid}/profile_img`)
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

  if (loading) return <div>Image loading</div>;
  return (
    <ImageBackground bkg={imageUrl}>
      <ImageInput
        type="file"
        accept="image/*"
        onChange={(e) => {
          selectFile(e);
        }}
      />
    </ImageBackground>
  );
}
