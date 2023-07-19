import { useCallback, useEffect, useState } from "react";

interface ChangeColorResult {
  colorIndex: number;
  changeColor: () => void;
}

export const useChangeColor = (): ChangeColorResult => {
  const styleColor: string[] = ["white", "black", "white", "black", "black", "white"];
  const styleBColor: string[] = ["#008544", "white", "black", "#C2E5F9", "#FFDC00", "#EA5404"];
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const changeColor = useCallback(() => {
    if (isButtonDisabled) return;
    
    setColorIndex((prevColorIndex) => prevColorIndex + 1);
    setIsButtonDisabled(true);
  }, [isButtonDisabled]);

  // 目に負担がかからないために、連打できない設定にする。
  useEffect(() => {
    if (!isButtonDisabled) return;

    const timer = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1000); // ボタンの無効化時間（ミリ秒）

    return () => clearTimeout(timer);
  }, [isButtonDisabled]);

  useEffect(() => {
    document.body.style.color = styleColor[colorIndex % styleColor.length];
    document.body.style.backgroundColor = styleBColor[colorIndex % styleBColor.length];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorIndex]);

  return { colorIndex, changeColor };
};
