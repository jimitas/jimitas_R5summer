import { useCallback, useEffect, useState } from "react";

interface ChangeColorResult {
  colorIndex: number;
  changeColor: () => void;
}

export const useChangeColor = (): ChangeColorResult => {
  const styleColor: string[] = ["white", "black", "white", "black", "black", "white"];
  const styleBColor: string[] = ["#008544", "white", "black", "#C2E5F9", "#FFDC00", "#EA5404"];
  const [colorIndex, setColorIndex] = useState<number>(0);

  const changeColor = useCallback(() => {
    const result: boolean = window.confirm("いろをかえますか？");
    // 連打して、目に負担がかからないためにも、このメッセージを表示させる。
    if (!result) return;
    setColorIndex((prevColorIndex) => prevColorIndex + 1);
  }, []);

  useEffect(() => {
    document.body.style.color = styleColor[colorIndex % styleColor.length];
    document.body.style.backgroundColor = styleBColor[colorIndex % styleBColor.length];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorIndex]);

  return { colorIndex, changeColor };
};
