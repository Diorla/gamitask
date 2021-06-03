import elevation from "../../../theme/elevation";

export default function isFocus(isBold: boolean): string {
  return isBold ? elevation[1] : elevation[0];
}
