export default interface CreateRewardProps {
  onChangeName: (name: any) => void;
  onChangeType: (time: any) => void;
  onChangeTime: (type: any) => void;
  onChangeTask: (task: any[]) => void;
  onChangeNote: (note: any) => void;
  name: string;
  time: number;
  type: "timed" | "task";
  task: any[];
  note: string;
}
