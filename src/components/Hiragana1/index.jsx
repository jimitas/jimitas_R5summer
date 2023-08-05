import { Howl } from "howler";
import * as se from "src/components/se";
import styles from "src/components/Hiragana1/hiragana1.module.css";
import { useState, useRef, useEffect, useCallback } from "react";
import { BtnCheck } from "src/components/PutButton/btnCheck";
import { BtnQuestion } from "src/components/PutButton/btnQuestion";
import { PutText } from "src/components/PutText";
import { useCheckAnswer } from "src/hooks/useCheckAnswer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEraser, faLongArrowAltLeft, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const ROW = [0, 1, 2, 3, 4];
const COL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const DATA = [
  "あさ",
  "いす",
  "うしろ",
  "えき",
  "おと",
  "かさ",
  "きる",
  "くつ",
  "けす",
  "こめ",
  "さかな",
  "しろ",
  "すな",
  "せんせい",
  "そら",
  "たて",
  "ちくわ",
  "つくえ",
  "てつ",
  "とけい",
  "なまえ",
  "にわとり",
  "ぬりえ",
  "ねこ",
  "のり",
  "はさみ",
  "ひこうき",
  "ふく",
  "へや",
  "ほん",
  "まくら",
  "みみ",
  "むし",
  "めいろ",
  "もり",
  "やま",
  "ゆき",
  "よこ",
  "らいと",
  "りす",
  "るす",
  "れつ",
  "ろうか",
  "わに",
];
const NAME = [
  "asa",
  "isu",
  "ushiro",
  "eki",
  "oto",
  "kasa",
  "kiru",
  "kutu",
  "kesu",
  "kome",
  "sakana",
  "shiro",
  "suna",
  "sensei",
  "sora",
  "tate",
  "tikuwa",
  "tukue",
  "tetu",
  "tokei",
  "namae",
  "niwatori",
  "nurie",
  "neko",
  "nori",
  "hasami",
  "hikouki",
  "fuku",
  "heya",
  "hon",
  "makura",
  "mimi",
  "mushi",
  "meiro",
  "mori",
  "yama",
  "yuki",
  "yoko",
  "raito",
  "risu",
  "rusu",
  "retu",
  "rouka",
  "wani",
];
const HIRAGANA = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもや　ゆ　よらりるれろわ　を　ん";
const HIRAGANA_VOICE = [
  "a",
  "i",
  "u",
  "e",
  "o",
  "ka",
  "ki",
  "ku",
  "ke",
  "ko",
  "sa",
  "shi",
  "su",
  "se",
  "so",
  "ta",
  "chi",
  "tu",
  "te",
  "to",
  "na",
  "ni",
  "nu",
  "ne",
  "no",
  "ha",
  "hi",
  "fu",
  "he",
  "ho",
  "ma",
  "mi",
  "mu",
  "me",
  "mo",
  "ya",
  "muon", //無音を再生する。
  "yu",
  "muon", //無音を再生する。
  "yo",
  "ra",
  "ri",
  "ru",
  "re",
  "ro",
  "wa",
  "muon", //無音を再生する。
  "wo",
  "muon", //無音を再生する。
  "n",
];
const hiragana = [...HIRAGANA];
var answer;
var order = [];
var index = 0;
var vo = [""];
var vo_name = [""];
var toggle = false;

export function Hiragana1(props) {
  const { sendRight, sendWrong } = useCheckAnswer();
  const el_text = useRef(null);
  const el_input_text = useRef(null);
  const el_img = useRef(null);

  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(true);

  // インスタンスを生成
  for (let i = 0; i < HIRAGANA_VOICE.length; i++) {
    vo[i] = new Howl({
      src: [`voice_hiragana/${HIRAGANA_VOICE[i]}.mp3`],
    });
  }
  for (let i = 0; i < NAME.length; i++) {
    vo_name[i] = new Howl({
      src: [`voice_hiragana/${NAME[i]}.mp3`],
    });
  }

  useEffect(() => {
    const num = [];
    for (let i = 0; i < DATA.length; i++) {
      num.push(i);
    }
    order = [];
    for (let i = 0; i < DATA.length; i++) {
      order.push(...num.splice(Math.floor(Math.random() * num.length - 1), 1));
    }
    giveQuestion();
  }, [count]);

  const giveQuestion = () => {
    setFlag(true);
    // se.set.play();
    answer = DATA[order[index]];
    setText("");
    el_text.current.innerText = "";
    el_img.current.src = `/images/hiragana/${NAME[order[index]]}.png`;
    vo_name[order[index]].play();
    index++;
  }

  const showAnswer = () => {
    if (!flag) return;
    se.seikai1.play();
    el_text.current.innerText = el_text.current.innerText == answer ? null : answer;
  };

  const checkAnswer = (e) => {
    // 回答チェック
    if (!flag) return;
    setFlag(false);
    const myAnswer = text;
    console.log(text);
    answer == myAnswer ? sendRight(el_text) : sendWrong(el_text);
    //間違えたら、1秒後に再入力可能に。
    if (answer != myAnswer)
      setTimeout(() => {
        setFlag(true);
      }, 1000);
  };

  // --テキスト入力に関わる部分。後で、外部コンポーネントに渡す。
  const inputText = (e) => {
    if (text.length >= 5) {
      se.piron.play();
      return;
    }
    setText(e.target.value);
  };

  const clickLetter = (letter) => {
    if (letter == "　" || text.length >= 5) {
      se.piron.play();
      return;
    }
    setText(el_input_text.current.value + letter);
  };

  const deleteText = () => {
    se.piron.play();
    if (text.length === 0) {
      return;
    }
    setText((text) => text.slice(0, -1));
  };

  const clearText = () => {
    if (text.length === 0) {
      se.piron.play();
      return;
    }
    setText((text) => "");
    se.reset.play();
  };
  // ここまで--テキスト入力に関わる部分。後で、外部コンポーネントに渡す。

  return (
    <div>
      <div className={styles.place}>
        <div className={styles.imgBox}>
          <img
            onClick={() => {
              vo_name[order[index - 1]].play();
            }}
            ref={el_img}
            className={styles.img}
            alt=""
          />
        </div>
        <div style={{ width: "25vw" }}>
          <PutText el_text={el_text}></PutText>
          <input ref={el_input_text} type="text" value={text} onChange={inputText} className={styles.inputText} />
        </div>
      </div>

      <div className="place">
        <BtnQuestion handleEvent={giveQuestion}></BtnQuestion>
        <BtnCheck handleEvent={checkAnswer}></BtnCheck>
        <FontAwesomeIcon icon={faVolumeUp} />
        <div class="switch">
          <input
            id="cmn-toggle-4"
            onClick={() => {
              toggle = toggle === true ? false : true;
            }}
            className={`${styles.cmnToggle} ${styles.cmnToggleRoundFlat}`}
            type="checkbox"
          />
          <label for="cmn-toggle-4"></label>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", flexDirection: "row-reverse" }}>
        {COL.map((col) => {
          return (
            <div key={col}>
              {ROW.map((row) => {
                return (
                  <div
                    key={row}
                    onClick={() => {
                      clickLetter(hiragana[col * 5 + row]);
                      toggle === true ? vo[col * 5 + row].play() : se.pi.play();
                    }}
                    className={styles.kanaMasu}
                  >
                    {hiragana[col * 5 + row]}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <button onClick={deleteText} type="button" className={styles.btn}>
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
        １つけす
      </button>
      <button onClick={clearText} type="button" className={styles.btn}>
        <FontAwesomeIcon icon={faEraser} />
        ぜんぶけす
      </button>
      <button className={styles.btn} onClick={showAnswer}>
        <FontAwesomeIcon icon={faEye} />
        こたえをみる
      </button>
    </div>
  );
}
