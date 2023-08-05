import * as se from "src/components/se";
import styles from "../styles/Home.module.css";
import { Block } from "src/components/Block";
import { useState, useRef } from "react";
import { BtnNum } from "src/components/PutButton/btnNum";
import { useCheckAnswer } from "src/hooks/useCheckAnswer";
import { PutSelect } from "src/components/PutSelect";
import { PutShiki } from "src/components/PutShiki";
import { PutText } from "src/components/PutText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faQuestion, faUserEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import Layout from "@/components/Layout";

const NUM_1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const NUM_2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const ITEM = ["10までの　かず", "10+□,□+10", "1□+□,□+1□", "20までの　かず"];
const kigo: string = "+";
var flag = false;
var left_value: number;
var right_value: number;
var answer: number;

export default function Tashizan1() {
  const { sendRight, sendWrong } = useCheckAnswer();
  const el_text = useRef<HTMLDivElement>(null);
  const el_left_input = useRef<HTMLInputElement>(null);
  const el_right_input = useRef<HTMLInputElement>(null);
  const el_answer = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState<number>(0);
  const [selectIndex, setSelectIndex] = useState<number>(0);


  const changeSelect = (e: any) => {
    // インデックスを取得
    const selectedIndex: number = e.target.selectedIndex;
    setSelectIndex(selectedIndex);
    flag = false;
    el_text.current!.innerHTML = "";
    se.reset.play();
  };

  // 問題を出す１
  const giveQuestion = () => {
    se.pi.play();
    flag = true;
    el_text.current!.innerHTML = "";
    el_answer.current!.value = "";

    const mode = Math.floor(Math.random() * 2 + 1);
    switch (selectIndex) {
      case 0:
        answer = Math.floor(Math.random() * 10 + 1);
        left_value = Math.floor(Math.random() * (answer + 1));
        right_value = answer - left_value;
        break;
      case 1:
        answer = Math.floor(Math.random() * 10 + 11);
        if (mode === 1) {
          left_value = 10;
          right_value = answer - left_value;
        } else if (mode === 2) {
          right_value = 10;
          left_value = answer - right_value;
        }
        break;
      case 2:
        answer = Math.floor(Math.random() * 9 + 12);
        if (mode === 1) {
          left_value = Math.floor(Math.random() * (answer - 11) + 1);
          right_value = answer - left_value;
        } else if (mode === 2) {
          right_value = Math.floor(Math.random() * (answer - 11) + 1);
          left_value = answer - right_value;
        }
        break;
      case 3:
        left_value = Math.floor(Math.random() * 9 + 2);
        right_value = Math.floor(Math.random() * left_value + (10 - left_value) + 1);
        answer = left_value + right_value;
        break;
    }

    el_left_input.current!.value = left_value.toString();
    el_right_input.current!.value = right_value.toString();
    setCount((count) => count + 1);
  };

  // 問題を入力する
  const setQuest = () => {
    left_value = Number(el_left_input.current!.value);
    right_value = Number(el_right_input.current!.value);
    if (left_value > 20 || right_value > 20 || left_value < 0 || right_value < 0) {
      se.alertSound.play();
      alert("すうじは　0～20");
      el_left_input.current!.value = "";
      el_right_input.current!.value = "";
      return;
    } else {
      flag = true;
      se.pi.play();
      el_text.current!.innerHTML = "";
      el_answer.current!.value = "";
      answer = Math.floor(left_value + right_value);
    }
    setCount((count) => count + 1);
  };

  const showAnswer = () => {
    if (!flag) return;
    se.seikai1.play();
    el_answer.current!.value = parseInt(el_answer.current!.value) == answer ? "" : answer.toString();
  };

  const checkAnswer = (myAnswer: number) => {
    // 回答チェック
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
    <Layout title="たしざん１">
      <div className={styles.place}>
        <PutSelect ITEM={ITEM} handleEvent={changeSelect}></PutSelect>

        <button className={styles.btn} style={{ display: "flex" }} onClick={giveQuestion}>
          <div style={{ display: "flex" }}>
            <FontAwesomeIcon icon={faQuestion} style={{ width: "20px" }} />
            {"もんだい"}
          </div>
        </button>
        <button className={styles.btn} onClick={setQuest}>
          <div style={{ display: "flex" }}>
            <FontAwesomeIcon icon={faUserEdit} style={{ width: "20px" }} />
            {"にゅうりょく"}
          </div>
        </button>
        <button className={styles.btn} onClick={showAnswer}>
          <div style={{ display: "flex" }}>
            <FontAwesomeIcon icon={faEye} style={{ width: "20px" }} />
            {"こたえ"}
          </div>
        </button>
      </div>

      <PutText el_text={el_text}></PutText>

      <PutShiki
        // handleEvent={changeNumber}
        kigo={"+"}
        el_right_input={el_right_input}
        el_left_input={el_left_input}
        el_answer={el_answer}
      ></PutShiki>
{/* 
      <div className={styles.place}>
        <input
          ref={el_left_input}
          className={styles.input}
          type="number"
          name="number"
          max="20"
          min="0"
          step="1"
        />

        <span className={styles.kigo}>{kigo}</span>

        <input
          ref={el_right_input}
          className={styles.input}
          type="number"
          name="number"
          max="20"
          min="0"
          step="1"
        />

        <span className={styles.kigo}>＝</span>

        <input ref={el_answer} className={styles.input} type="number" name="number" max="20" min="0" step="1" />
      </div> */}

      <div className={styles.place}>
        <Block a={left_value} b={right_value} />
      </div>

      <BtnNum ITEM={NUM_1} handleEvent={checkAnswer}></BtnNum>

      <BtnNum ITEM={NUM_2} handleEvent={checkAnswer}></BtnNum>
    </Layout>
  );
}
