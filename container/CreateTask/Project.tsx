import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../../context/userContext";
import createData from "../../scripts/createData";
import fetchData from "../../scripts/fetchData";
import { ToastContainer, toast } from "react-toastify";
import { useTaskDispatch, useTaskState } from "./context/Task";
import { addTask } from "./redux/actions";

const Select = styled.div`
  margin-bottom: 4px;
  & > select {
    border: none;
    border-bottom: 1px solid silver;
    padding: 4px;
  }
`;

const toUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Project() {
  const [list, setList] = useState([]);
  const { loadingUser, user } = useUser();
  const [newProject, setNewProject] = useState("");

  const taskDispatch = useTaskDispatch();
  const { project } = useTaskState();

  const setProject = (project: string) =>
    taskDispatch(
      addTask({
        project,
      })
    );

  useEffect(() => {
    fetchData("user", `${user.uid}`)
      .then((data) => {
        if (data) {
          const { projects } = data;
          setList(projects);
        }
      })
      .catch((err) => console.log({ err }));
  }, []);

  const addNewProject = () => {
    createData("user", `${user.uid}`, {
      projects: [...list, newProject],
    })
      .then(() => setList([...list, newProject]))
      .then(() => setProject(newProject))
      .then(() => setNewProject(""))
      .then(() => toast("Project created"))
      .catch((err) => console.log({ err }));
  };
  return (
    <div>
      <ToastContainer />
      <Select>
        <label htmlFor="project">Select group:</label>
        <select
          name="project"
          value={project}
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
        <input
          value={newProject}
          onChange={(e) => setNewProject(toUpperCase(e.target.value))}
        />{" "}
        {newProject && !list.includes(newProject) && (
          <button onClick={() => addNewProject()}>create</button>
        )}
      </div>
    </div>
  );
}
