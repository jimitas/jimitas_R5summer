import { useScoreCounter } from "src/hooks/useScoreCounter";

export function Score() {
  const { count, isShow, handleClick, handleDisplay } = useScoreCounter();
  return <div>{count}</div>;
}
