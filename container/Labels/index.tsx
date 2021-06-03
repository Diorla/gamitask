import React from "react";
import { useIntl } from "react-intl";
import PageLoader from "../../compounds/PageLoader";
import TaskCollection from "../../container/TaskCollection";
import { useTaskList } from "../../context/taskListContext";
import formatText from "../../scripts/formatText";
import getLabelCollection from "./getLabelCollection";

// in case someone created "unlabelled" label
export const unlabelled = "egj9b39bn2217352b06a6178c0e95f431f30ej5ra";

export default function Labels(): JSX.Element {
  const { taskList, loadingTask } = useTaskList();
  const labelCollection = getLabelCollection(
    taskList.filter((item) => !item.archive)
  );

  const intl = useIntl();
  const noLabel = intl.formatMessage({
    id: "noLabel",
    defaultMessage: "noLabel",
  });

  if (loadingTask) return <PageLoader />;
  return (
    <>
      {Object.keys(labelCollection).map((item, idx) => {
        if (item !== unlabelled)
          return (
            <TaskCollection
              key={idx}
              data={labelCollection[item]}
              title={formatText(item, "title")}
              type="others"
            />
          );
      })}
      <TaskCollection
        data={labelCollection[unlabelled]}
        title={noLabel}
        type="others"
      />
    </>
  );
}
