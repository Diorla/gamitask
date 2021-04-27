import RewardProps from "../../props/Reward";

export default interface RewardCardProps extends RewardProps {
  point: number;
  onCheck: () => void;
}
