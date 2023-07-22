import * as se from "src/components/se";
import styles from "../styles/Home.module.css";
import { Layout } from "src/components/Layout/Layout";
import { useEffect, useState, useRef } from "react";
import { BtnQuestion } from "src/components/PutButton/btnQuestion";
import { useCheckAnswer } from "src/hooks/useCheckAnswer";
import { useClearImage } from "src/hooks/useClearImage";
import { PutSelect } from "src/components/PutSelect";
import { PutImage } from "src/components/PutImage";
import { PutText } from "src/components/PutText";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faQuestion, faRandom } from "@fortawesome/free-solid-svg-icons";
import { BtnShuffle } from "src/components/PutButton/btnShuffle";
import { BtnCheck } from "src/components/PutButton/btnCheck";

// hideを使わずにisshowでできないか
const ANIMALS = ["dog", "cat", "monkey", "frog", "usagi", "niwatori", "ika", "tako", "iruka", "butterfly"];
const NUM = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const DIR = ["ひだり", "みぎ"];
var answer;
var flag = true;
var order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Nanbanme() {
  const { sendRight, sendWrong } = useCheckAnswer();
  const { clearImage } = useClearImage();

  const el_text = useRef(null);
  const el_img = useRef(null);
  const el_input = useRef(null);

  const [count, setCount] = useState(0);
  const [count_1, setCount_1] = useState(0);
  const [count_2, setCount_2] = useState(0);
  const [selectIndex_1, setSelectIndex_1] = useState("ひだり");
  const [selectIndex_2, setSelectIndex_2] = useState(0);

  useEffect(() => {
    shuffleOrder();
  }, []);

  useEffect(() => {
    flag = true;
    const num = Math.floor(Math.random() * 9 + 1);
    el_input.current.hidden = false;
    const img = document.createElement("img");
    answer = ANIMALS[order[num]];
    img.setAttribute("src", `images/${answer}.png`);
    el_text.current.innerHTML = "";
    el_text.current.appendChild(img);
    el_text.current.innerHTML = el_text.current.innerHTML + "　は　なんばんめ?";
    se.set.play();
  }, [count_2]);

  useEffect(() => {
    flag = true;
    const dir = Math.floor(Math.random() * 2 + 1);
    const num = Math.floor(Math.random() * 9 + 1);
    answer = ANIMALS[order[num - 1]];
    el_input.current.hidden = true;
    el_text.current.innerHTML = "";
    el_text.current.innerHTML = `${dir === 1 ? "ひだり" : "みぎ"}から　${
      dir == 1 ? num : 11 - num
    } ばんめのどうぶつは?`;
    se.set.play();
  }, [count_1]);

  const giveQuestion_1 = () => {
    setCount_1((count_1) => count_1 + 1);
  };

  const giveQuestion_2 = () => {
    setCount_2((count_2) => count_2 + 1);
  };

  const checkAnswer_1 = () => {
    if (!flag) return;
    flag = false;
    const myAnswer = selectIndex_1 == "ひだり" ? ANIMALS[order[selectIndex_2 - 1]] : selectIndex_1 == "みぎ";
    answer == myAnswer ? sendRight(el_text) : sendWrong(el_text);
    if (answer != myAnswer)
      setTimeout(() => {
        flag = true;
      }, 1000);
  };

  const checkAnswer_2 = (e) => {
    if (!flag) return;
    flag = false;
    const myAnswer = e.target.id;
    answer == myAnswer ? sendRight(el_text) : sendWrong(el_text);
    console.log(myAnswer, answer);
    if (answer != myAnswer)
      setTimeout(() => {
        flag = true;
      }, 1000);
  };

  const shuffle = () => {
    se.seikai1.play();
    shuffleOrder();
    flag = false;
    el_text.current.innerHTML = "もんだいを　おしてね。";
  };

  const shuffleOrder = () => {
    order = [];
    let num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 10; i++) {
      order.push(...num.splice(Math.floor(Math.random() * num.length - 1), 1));
    }
    clearImage(el_img); // 画像のクリア
    putImage();
  };

  const putImage = () => {
    for (let i = 0; i < 10; i++) {
      const img = document.createElement("img");
      img.setAttribute("src", `images/${ANIMALS[order[i]]}.png`);
      img.style.cursor = "pointer";
      img.setAttribute("id", ANIMALS[order[i]]);
      img.addEventListener("click", checkAnswer_2, false);
      el_img.current.appendChild(img);
    }
  };

  const changeSelect_1 = (e) => {
    setSelectIndex_1(e.target.value);
    se.set.play();
  };

  const changeSelect_2 = (e) => {
    setSelectIndex_2(e.target.value);
    se.set.play();
  };

  return (
    <Layout title="なんばんめ">
      <div className={styles.place}>
        <BtnQuestion btnText={"もんだい１"} handleEvent={giveQuestion_1}></BtnQuestion>
        <BtnQuestion btnText={"もんだい２"} handleEvent={giveQuestion_2}></BtnQuestion>
        <BtnShuffle handleEvent={shuffle}></BtnShuffle>
      </div>

      <PutText el_text={el_text}></PutText>

      <PutImage el_img={el_img}></PutImage>

      <div ref={el_input} hidden={true}>
        <div className={styles.place} style={{ alignItems: "baseline" }}>
          <PutSelect ITEM={DIR} handleEvent={changeSelect_1}></PutSelect>
          から
          <PutSelect ITEM={NUM} handleEvent={changeSelect_2}></PutSelect>
          ばんめ
          <BtnCheck handleEvent={checkAnswer_1}></BtnCheck>
        </div>
      </div>
    </Layout>
  );
}
