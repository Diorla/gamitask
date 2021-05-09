import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../../context/userContext";
import createData from "../../scripts/createData";
import fetchData from "../../scripts/fetchData";
import { toast } from "react-toastify";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import formatText from "../../scripts/formatText";
import { FormattedMessage, useIntl } from "react-intl";

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
  const intl = useIntl();
  const noProject = intl.formatMessage({
    id: "noProject",
    defaultMessage: "Miscellaneous",
  });

  const createProject = intl.formatMessage({
    id: "createProject",
    defaultMessage: "Create new project",
  });

  return (
    <div>
      <Select>
        <label htmlFor="project">
          <FormattedMessage
            id="selectProject"
            defaultMessage="Select project"
          />
          :
        </label>
        <select
          name="project"
          value={task.project}
          onChange={(e) => setProject(e.target.value)}
        >
          {[...list, noProject].map((item, idx) => (
            <option value={item} key={idx}>
              {item}
            </option>
          ))}
        </select>
      </Select>
      <div style={{ display: "flex" }}>
        <Input
          value={newProject}
          placeholder={createProject}
          onChange={(e: { target: { value: string } }) =>
            setNewProject(formatText(e.target.value, "title"))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") addNewProject();
          }}
        />{" "}
        {newProject && !list.includes(newProject) && (
          <button onClick={() => addNewProject()}>
            <FormattedMessage id="Create" defaultMessage="Create" />
          </button>
        )}
      </div>
    </div>
  );
}
