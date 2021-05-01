import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../../context/userContext";
import createData from "../../scripts/createData";
import fetchData from "../../scripts/fetchData";
import { toast } from "react-toastify";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import toTitleCase from "../../scripts/toTitleCase";

const Input = styled.input`
  border: 0.1rem solid silver;
  padding: 0.4rem;
  width: 24rem;
`;

const Select = styled.div`
  margin-bottom: 0.4rem;
  & > select {
    border: none;
    border-bottom: 0.1rem solid silver;
    padding: 0.4rem;
  }
`;

export default function Project() {
  const [list, setList] = useState([] as string[]);
  const { user } = useUser();
  const [newProject, setNewProject] = useState("");

  const taskDispatch = useTaskDispatch();
  const task = useTaskState();

  const setProject = (project: string) =>
    taskDispatch(
      addTask({
        ...task,
        project,
      })
    );

  useEffect(() => {
    fetchData("user", `${user.uid}`)
      .then((data) => {
        if (data) {
          const { projects = ["Unsorted"] } = data;
          setList(projects);
        }
      })
      .catch((err) => toast.error(err));
  }, []);

  const addNewProject = () => {
    createData("user", `${user.uid}`, {
      projects: [...list, newProject],
    })
      .then(() => setList([...list, newProject]))
      .then(() => setProject(newProject))
      .then(() => setNewProject(""))
      .then(() => toast.info("Project created"))
      .catch((err) => toast.error(err));
  };
  return (
    <div>
      <Select>
        <label htmlFor="project">Select group:</label>
        <select
          name="project"
          value={task.project}
          onChange={(e) => setProject(e.target.value)}
        >
          {list.map((item, idx) => (
            <option value={item} key={idx}>
              {item}
            </option>
          ))}
        </select>
      </Select>
      <div>
        <Input
          value={newProject}
          placeholder="Create new project"
          onChange={(e: { target: { value: string } }) =>
            setNewProject(toTitleCase(e.target.value))
          }
        />{" "}
        {newProject && !list.includes(newProject) && (
          <button onClick={() => addNewProject()}>create</button>
        )}
      </div>
    </div>
  );
}
