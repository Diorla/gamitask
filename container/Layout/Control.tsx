import React, { useState } from "react";
import Menu from "../../compounds/Menu";
import RunningTask from "../../compounds/TaskCard/RunningTask";
import Drawer from "../../compounds/Drawer";
import Welcome from "../Welcome";
import { Content } from "./Content";
import NonTaskContainer from "./NonTaskContainer";

export default function Control({
  uid,
  children,
  activePath,
  id,
  hideMenu,
}: {
  uid: string;
  children: React.ReactNode;
  activePath: string;
  id: string;
  hideMenu: boolean;
}): JSX.Element {
  const [showDrawer, setShowDrawer] = useState(false);
  if (uid) {
    if (hideMenu)
      return <NonTaskContainer title={activePath}>{children}</NonTaskContainer>;
    return (
      <div style={{ fontSize: "1.6rem" }}>
        <Menu onClick={() => setShowDrawer(!showDrawer)} />
        <Drawer showDrawer={showDrawer} activePath={activePath} />
        <Content showDrawer={showDrawer} onClick={() => setShowDrawer(false)}>
          {id && <RunningTask />}
          {children}
        </Content>
      </div>
    );
  }
  return <Welcome />;
}
