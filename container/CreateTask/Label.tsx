import styled from "styled-components";
import Input from "../../components/Form/Input";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import { useUser } from "../../context/userContext";
import { contrastColor } from "../../scripts/color-functions";

const trim = (str: string) => str.trim();

const removeEmpty = (str: string) => !!str;
const Badge = styled.span`
  display: inline-block;
  margin: 0.2rem;
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => contrastColor(theme.palette.primary.main)};
  padding: 0.2rem;
  font-size: 1.4rem;
  border-radius: 0.4rem;
`;

const ExtBadge = styled(Badge)`
  background: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => contrastColor(theme.palette.secondary.main)};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.palette.secondary.light};
    color: ${({ theme }) => contrastColor(theme.palette.secondary.light)};
  }
`;
export default function Label() {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();
  const {
    user: { labels },
  } = useUser();

  const setLabel = (n: string) =>
    taskDispatch(
      addTask({
        ...task,
        labels: n,
      })
    );

  const addTolabel = (label: string) => {
    if (task.labels.includes(label)) return 0;
    const full = `${label}, ${task.labels}`;
    setLabel(full);
  };
  return (
    <div>
      <div>
        {labels &&
          labels
            .map(trim)
            .filter(removeEmpty)
            .map((item: any, idx: any) => (
              <ExtBadge
                key={idx}
                onClick={() => addTolabel(item)}
                style={{ cursor: "pointer" }}
              >
                {item}
              </ExtBadge>
            ))}
      </div>
      <Input
        value={task.labels}
        onChange={(e: { target: { value: any } }) =>
          setLabel(e.target.value.toLowerCase())
        }
        placeholder="abc, def, ghi"
      />
      <div>
        {task.labels &&
          task.labels
            .split(",")
            .map(trim)
            .filter(removeEmpty)
            .map((item: any, idx: any) => <Badge key={idx}>{item}</Badge>)}
      </div>
    </div>
  );
}
