import * as se from "src/components/se";
import { Block } from "src/components/Block";
import { useState, useRef } from "react";
import { PutSelect } from "src/components/PutSelect";
import { BtnNum } from "src/components/PutButton/btnNum";
import { BtnQuestion } from "src/components/PutButton/btnQuestion";
import { useCheckAnswer } from "src/hooks/useCheckAnswer";
import { PutText } from "src/components/PutText";
import Layout from "@/components/Layout";

const NUM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ITEM = [5, 6, 7, 8, 9, 10];
var flag: boolean = false;
var answer: number;
var left_value: string | number;
var right_value: string | number;

export default function Ikutu() {
  const { sendRight, sendWrong } = useCheckAnswer();
  const el_text = useRef<HTMLDivElement>(null);
  const [selectValue, setSelectValue] = useState<number>(5);

  const changeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectValue = parseInt(e.target.value, 10); // セレクト要素のvalueをnumberに変換
    setSelectValue(selectValue);
    se.reset.play();
    el_text.current!.innerHTML = "";
    flag = false;
  };

  const giveQuestion = () => {
    se.pi.play();
    flag = true;
    const n = selectValue;
    const dir = Math.floor(Math.random() * 2 + 1);

    answer = Math.floor(Math.random() * n);
    if (dir === 1) {
      left_value = "□";
      right_value = n - answer;
    } else {
      left_value = n - answer;
      right_value = "□";
    }
    el_text.current!.innerHTML = `${n} は　${left_value} と ${right_value}`;
  };

  const checkAnswer = (myAnswer:number) => {
    if (!flag) return;
    flag = false;
    answer == myAnswer ? sendRight(el_text) : sendWrong(el_text);
    //間違えたら、1秒後に再入力可能に。
    if (answer != myAnswer)
      setTimeout(() => {
        flag = true;
      }, 1000);
  };

  return (
    <Layout title="いくつといくつ">
      <div className="place">
        <PutSelect ITEM={ITEM} handleEvent={changeSelect}></PutSelect>
        <PutText el_text={el_text}></PutText>
      </div>

      <Block a={selectValue} b={0} />

      <BtnNum ITEM={NUM} handleEvent={checkAnswer}></BtnNum>

      <BtnQuestion handleEvent={giveQuestion}></BtnQuestion>
    </Layout>
  );
}
