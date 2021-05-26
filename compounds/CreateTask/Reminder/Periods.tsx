import Monthly from "./Monthly";
import Weekly from "./Weekly";
import Yearly from "./Yearly";

export default function Periods({ period }: { period: string }) {
  if (period === "weekly") return <Weekly />;
  if (period === "monthly") return <Monthly />;
  if (period === "yearly") return <Yearly />;
  return null;
}
