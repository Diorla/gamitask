import React from "react";
import { MdPlayArrow, MdStop } from "react-icons/md";

export default function PlayPause({ running, toggleRunning }) {
  return running ? (
    <MdStop onClick={toggleRunning} />
  ) : (
    <MdPlayArrow onClick={toggleRunning} />
  );
}
