import styled from "styled-components";
import Input from "../../components/Form/Input";
import { useTaskDispatch, useTaskState } from "./context/Task";
import { addTask } from "./redux/actions";

const trim = (str: string) => str.trim();

const removeEmpty = (str: string) => !!str;
const Badge = styled.span`
  display: inline-block;
  margin: 2px;
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.text};
  padding: 2px;
  font-size: 14px;
  border-radius: 4px;
`;
export default function Label() {
  const taskDispatch = useTaskDispatch();
  const { label } = useTaskState();

  const setLabel = (n: string) =>
    taskDispatch(
      addTask({
        label: n,
      })
    );

  return (
    <div>
      <Input
        value={label}
        onChange={(e: { target: { value: any } }) =>
          setLabel(e.target.value.toLowerCase())
        }
        placeholder="abc, def, ghi"
      />
      <div>
        {label &&
          label
            .split(",")
            .map(trim)
            .filter(removeEmpty)
            .map((item: any, idx: any) => <Badge key={idx}>{item}</Badge>)}
      </div>
    </div>
  );
}
