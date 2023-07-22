import * as se from "src/components/se";
import styles from "../styles/Home.module.css";
import { Layout } from "src/components/Layout/Layout";
import { Block } from "src/components/Block";
import { useState, useRef } from "react";
import { BtnNum } from "src/components/PutButton/btnNum";
import { useCheckAnswer } from "src/hooks/useCheckAnswer";
import { PutSelect } from "src/components/PutSelect";
import { PutShiki } from "src/components/PutShiki";
import { PutText } from "src/components/PutText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faQuestion, faUserEdit, faCheck } from "@fortawesome/free-solid-svg-icons";


const NUM_1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const NUM_2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const ITEM = ["10までの　かず", "10+□,□+10", "1□+□,□+1□", "20までの　かず"];
var flag = false;
var answer = null;
var left_value;
var right_value;

export default function Tashizan1() {
  const { sendRight, sendWrong } = useCheckAnswer();
  const el_text = useRef(null);
  const el_left_input = useRef(null);
  const el_right_input = useRef(null);
  const el_answer = useRef(null);

  const [count, setCount] = useState(0);
  const [selectIndex, setSelectIndex] = useState(0);

  const changeSelect = (e) => {
    flag = false;
    setSelectIndex(e.target.selectedIndex);
    el_text.current.innerHTML = "";
    se.reset.play();
  };

  // 問題を出す１
  const giveQuestion = () => {
    se.pi.play();
    flag = true;
    el_text.current.innerHTML = "";
    el_answer.current.value = null;

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

    el_left_input.current.value = left_value;
    el_right_input.current.value = right_value;
    setCount((count) => count + 1);
  };

  // 問題を入力する
  const setQuest = () => {
    left_value = Number(el_left_input.current.value);
    right_value = Number(el_right_input.current.value);
    if (left_value > 20 || right_value > 20 || left_value < 0 || right_value < 0) {
      se.alert.play();
      alert("すうじは　0～20");
      el_left_input.current.value = null;
      el_right_input.current.value = null;
      return;
    } else {
      flag = true;
      se.pi.play();
      el_text.current.innerHTML = "";
      el_answer.current.value = null;
      answer = Math.floor(left_value + right_value);
    }
    setCount((count) => count + 1);
  };

  const showAnswer = () => {
    if (!flag) return;
    se.seikai1.play();
    el_answer.current.value = el_answer.current.value == answer ? null : answer;
  };

  const checkAnswer = (e) => {
    // 回答チェック
    if (!flag) return;
    flag = false;
    const myAnswer = e.target.value;
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

        <button className={styles.btn} onClick={giveQuestion}>
          <FontAwesomeIcon icon={faQuestion} />
          もんだい
        </button>
        <button className={styles.btn} onClick={setQuest}>
          <FontAwesomeIcon icon={faUserEdit} />
          にゅうりょく
        </button>
        <button className={styles.btn} onClick={showAnswer}>
          <FontAwesomeIcon icon={faEye} />
          こたえ
        </button>
      </div>

      <PutText el_text={el_text}></PutText>

      <PutShiki
        kigo={"+"}
        el_right_input={el_right_input}
        el_left_input={el_left_input}
        el_answer={el_answer}
      ></PutShiki>

      <div className={styles.place}>
        <Block a={left_value} b={right_value} />
      </div>

      <BtnNum ITEM={NUM_1} handleEvent={checkAnswer}></BtnNum>

      <BtnNum ITEM={NUM_2} handleEvent={checkAnswer}></BtnNum>
    </Layout>
  );
}
