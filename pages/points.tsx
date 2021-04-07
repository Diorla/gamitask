import { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;
export default function Points() {
  const [timing, setTiming] = useState({
    hr: 0,
    mm: 0,
    ss: 0,
    ms: 0,
    difficulty: 1,
    priority: 1,
  });

  const { hr, mm, ss, ms, difficulty, priority } = timing;
  const value =
    ((ms + ss * 1000 + mm * 1000 * 60 + hr * 1000 * 60 * 60) *
      difficulty *
      priority) /
    18482;
  return (
    <StyledDiv>
      <label>difficulty</label>
      <input
        type="number"
        min={1}
        max={3}
        onChange={(e) =>
          setTiming({
            ...timing,
            difficulty: Number(e.target.value),
          })
        }
        placeholder="difficulty"
      />
      <label>priority</label>
      <input
        type="number"
        min={1}
        max={5}
        onChange={(e) =>
          setTiming({
            ...timing,
            priority: Number(e.target.value),
          })
        }
        placeholder="priority"
      />
      <label>hr</label>
      <input
        min={1}
        max={23}
        type="number"
        onChange={(e) =>
          setTiming({
            ...timing,
            hr: Number(e.target.value),
          })
        }
        placeholder="hr"
      />
      <label>mm</label>
      <input
        min={1}
        max={59}
        type="number"
        onChange={(e) =>
          setTiming({
            ...timing,
            mm: Number(e.target.value),
          })
        }
        placeholder="mm"
      />
      <label>ss</label>
      <input
        min={1}
        max={59}
        type="number"
        onChange={(e) =>
          setTiming({
            ...timing,
            ss: Number(e.target.value),
          })
        }
        placeholder="ss"
      />
      <label>ms</label>
      <input
        min={1}
        max={999}
        type="number"
        onChange={(e) =>
          setTiming({
            ...timing,
            ms: Number(e.target.value),
          })
        }
        placeholder="ms"
      />
      <div>Output: {value}</div>
    </StyledDiv>
  );
}
