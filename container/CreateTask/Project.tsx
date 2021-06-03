import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import createData from "../../scripts/createData";
import fetchData from "../../scripts/fetchData";
import { toast } from "react-toastify";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Stack from "../../atoms/Stack";
import Line from "../../atoms/Line";
import Select from "../../atoms/Select";
import Option from "../../atoms/Option";
import Label from "../../atoms/Label";

export default function Project(): JSX.Element {
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

  const opacity = newProject && !list.includes(newProject) ? 1 : 0;
  return (
    <Stack>
      <Stack style={{ marginBottom: "0.4rem" }}>
        <Label htmlFor="selectProject">selectProject</Label>
        <Select
          id="selectProject"
          value={task.project}
          onChange={(e) => {
            setProject(e.target.value);
          }}
        >
          {[...list].map((item) => (
            <Option key={item} value={item} label={item} />
          ))}
          <Option value="noProject" label="No project" />
        </Select>
      </Stack>
      <Line style={{ alignItems: "center" }}>
        <Input
          value={newProject}
          placeholder="createProject"
          onChange={(e: { target: { value: string } }) =>
            setNewProject(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") addNewProject();
          }}
        />{" "}
        <Button onClick={() => addNewProject()} style={{ opacity }}>
          create
        </Button>
      </Line>
    </Stack>
  );
}
