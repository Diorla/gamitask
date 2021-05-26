export default function Option({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return <option value={value}>{label}</option>;
}
