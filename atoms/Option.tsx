export default function Option({
  value,
  label,
}: {
  value: string;
  label: string;
}): JSX.Element {
  return <option value={value}>{label}</option>;
}
