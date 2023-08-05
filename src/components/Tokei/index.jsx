/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as se from "src/components/se";
import { faEye, faQuestion, faUserEdit, faCheck, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { tokeiDraw } from "src/components/tokeDrawi";

export function Tokei(props) {
  const ITEM_TYPE = ["なんじなんふん？", "はりを　うごかそう", "じぶんで　しらべよう"];
  const ITEM_MODE = ["15ふん きざみ(やさしい)", "５ふん きざみ(ふつう)", "１ぷん きざみ(むずしい)"];

  const el_select_type = useRef();
  const el_select_mode = useRef();

  const el_hari_range = useRef();
  const el_input_range = useRef();
  const el_edit_place = useRef();
  const el_set_place = useRef();

  const el_input_hour = useRef();
  const el_input_minutes = useRef();
  const el_text1 = useRef();

  const [flag, setFlag] = useState(false);
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hariStep, setHariStep] = useState(15);
  const [hariValue, setHariValue] = useState(360);
  const [typeIndex, setIndex] = useState(0);
  const [modeIndex, setModeIndex] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [isShowHint, setIsShowHint] = useState("");
  const [count, setCount] = useState(0);

  //問題の種類のセレクトに応じて、コンテンツを表示・非表示
  // returnを変更してもよいが、このままでも十分。
  useEffect(() => {
    el_input_range.current.hidden = typeIndex === 0 ? true : typeIndex === 1 ? false : false;
    el_set_place.current.hidden = typeIndex === 0 ? false : typeIndex === 1 ? false : true;
    el_edit_place.current.hidden = typeIndex === 0 ? true : typeIndex === 1 ? true : false;
  }, [typeIndex]);

  //何分刻みにするかによって、針のステップ値を変える
  const ITEM_STEP = [15, 5, 1];
  useEffect(() => {
    setHariStep((hariStep) => ITEM_STEP[modeIndex]);
  }, [modeIndex]);

  //ヒントボタンを押すたびに、時計の目盛りをon offを変える。
  const HINT_ARRAY = ["", "hint1", "hint2"];
  const hintChange = useCallback(() => {
    setCount((count) => count + 1);
    setIsShowHint((isShowHint) => HINT_ARRAY[count % 3]);
    se.set.play();
  }, [count]);

  //答えを見る。
  const showAnswer = () => {
    if (typeIndex === 0) {
      if (hour == 0) setHour((hour) => 12);
      el_text1.current.style.color = "red";
      el_text1.current.innerHTML = `こたえは　${hour}じ　${minutes}ふん　です。`;
      se.seikai1.play();
    } else if (typeIndex === 1) {
      setHour((hour) => Math.floor(answer / 100));
      setMinutes((hour) => answer % 100);
      se.seikai2.play();
    }
  };

  //○時○分に合わせる。
  const setRange = () => {
    //pは、p（仮の）という意味で使用。
    //短縮形を用いて、コードを見やすくする。
    const p_hour = Math.floor(Number(el_input_hour.current.value));
    const p_minutes = Math.floor(Number(el_input_minutes.current.value));

    if (p_hour > 12 || p_hour < 0 || p_minutes > 59 || p_minutes < 0) {
      se.alert.play();
      alert("「○じ」は1～12、「○ふん」は0～59までのかずにしてね。");
      return;
    }

    setHour((hour) => p_hour);
    setMinutes((minutes) => p_minutes);
    el_text1.current.innerHTML = `${p_hour}じ　${p_minutes}ふんに　はりを　あわせました。`;
    se.seikai1.play();
  };

  // はりの指す時刻を答える。
  const informTime = () => {
    if (hour == 0) setHour((hour) => 12);
    el_text1.current.style.color = "red";
    el_text1.current.innerHTML = `あわせた　はりのじこくは　${hour}じ　${minutes}ふん　です。`;
    se.seikai1.play();
  };

  //問題のタイプを変えたとき
  const typeChange = useCallback(() => {
    setIndex((typeIndex) => el_select_type.current.selectedIndex);
    se.reset.play();
  }, [typeIndex]);

  //時計の針の間隔（モード）を変えたとき
  const modeChange = useCallback(() => {
    setModeIndex((modeIndex) => el_select_mode.current.selectedIndex);
  }, [modeIndex]);

  //スライダーで時計の針を動かす。
  const hariChange = useCallback(() => {
    setHariValue((hariValue) => el_hari_range.current.value);
    se.kako.play();
  }, [hariValue]);
  //プラスボタンを押したとき
  const hatiPlus = useCallback(() => {
    setHariValue((hariValue) => Math.floor(el_hari_range.current.value) + Math.floor(hariStep));
    se.kako.play();
  }, [hariValue]);
  //マイナスボタンを押したとき
  const hatiMinus = useCallback(() => {
    setHariValue((hariValue) => Math.floor(el_hari_range.current.value) - Math.floor(hariStep));
    se.kako.play();
  }, [hariValue]);

  //針を動かしたとき、時・分・myAnswerが変化する。
  useEffect(() => {
    setHour((hour) => Math.floor(Math.floor(hariValue) / 60));
    setMinutes((minutes) => Math.floor(Math.floor(hariValue) % 60));
  }, [hariValue]);

  //時計の針の描画
  useEffect(() => {
    tokeiDraw(minutes, hour, isShowHint);
  }, [hour, minutes, isShowHint]);

  // 問題を出す
  const question = () => {
    setFlag((flag) => true);
    //pは、p（仮の）という意味で使用。
    //短縮形を用いて、コードを見やすくする。
    const p_hour = Math.floor(Math.random() * 12 + 1);
    const p_minutes =
      modeIndex == 0
        ? Math.floor(Math.random() * 4) * 15
        : modeIndex == 1
        ? Math.floor(Math.random() * 12) * 5
        : Math.floor(Math.random() * 60) * 1;

    switch (typeIndex) {
      case 0:
        setHour((hour) => p_hour);
        setMinutes((minutes) => p_minutes);
        break;
      case 1:
        setHour((hour) => 6);
        setMinutes((minutes) => 0);
        setHariValue((hariValue) => 360);
        break;
      case 2:
        return;
    }

    el_text1.current.innerHTML =
      typeIndex == 0 ? "なんじ　なんふん？" : `${p_hour}じ　${p_minutes}ふんに　はりを　うごかそう`;

    el_input_hour.current.value = null;
    el_input_minutes.current.value = null;
    el_text1.current.style.color = "black";
    
    setAnswer((answer) => p_hour * 100 + p_minutes); //例：3時15分なら315
    se.set.play();
  };
  
  const checkAnswer = () => {
    if (flag === false) {
      se.piron.play();
      return;
    }
    setFlag((flag) => false);
    if (typeIndex == 0) {
      const myAnswer = Math.floor(Number(el_input_hour.current.value)) * 100 + Math.floor(Number(el_input_minutes.current.value));
      myAnswer == answer ? sendRight() : sendWrong();
    } else if (typeIndex == 1) {
      if (hour == 0) setHour((hour) => 12);
      const myAnswer = hour * 100 + minutes;
      myAnswer == answer ? sendRight() : sendWrong();
    }
  };

  const sendRight = async () => {
    el_text1.current.innerHTML = `<span style="color:red;background-color:white;">せいかい</span>`;
    se.right.play();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const sendWrong = async () => {
    const pre_text = el_text1.current.innerHTML; //前のメッセージを保存
    el_text1.current.innerHTML = `<span style="color:gray;background-color:white;">ちがうよ</span>`;
    se.alert.play();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    el_text1.current.innerHTML = pre_text; //保存したメッセージを再び表示
    setFlag((flag) => true);
  };

  return (
    <div>
      <section ref={el_text1} className="place m-2 h-6 md:h-8">
      </section>

      <section className="flex justify-center">
        <article className="w-1/3 ">
          <canvas width="400px" height="400px" style={{ backgroundColor: "antiquewhite" }}></canvas>
        </article>

        <aside className="ml-6 w-2/5 text-left">
          <div className="flex">
            <div>
              <button onClick={hintChange} className="m-2 ml-6 btn">
                <FontAwesomeIcon icon={faLightbulb} />
                ヒントをみる
              </button>
            </div>
            <div ref={el_set_place} hidden={false}>
              <button onClick={showAnswer} className="m-2 btn">
                <FontAwesomeIcon icon={faEye} />
                こたえをみる
              </button>
            </div>
          </div>

          <select onChange={typeChange} ref={el_select_type} className="select m-2 ml-6">
            {ITEM_TYPE.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <br />
          <select onChange={modeChange} ref={el_select_mode} className="text-2xl h-10 select m-2 ml-6">
            {ITEM_MODE.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>

          <div className="flex ml-6">
            <input ref={el_input_hour} className="input" />
            <span className="md:text-3xl m-2 md:leading-loose">じ</span>
            <input ref={el_input_minutes} className="input" />
            <span className="md:text-3xl m-2 md:leading-loose">ふん</span>
          </div>

          <div ref={el_set_place} hidden={false} className="m-4">
            <button onClick={question} className="btn m-2">
              <FontAwesomeIcon icon={faQuestion} />
              もんだい
            </button>
            <button onClick={checkAnswer} className="btn m-2">
              <FontAwesomeIcon icon={faCheck} />
              こたえあわせ
            </button>
          </div>

          <div ref={el_edit_place} hidden={true} className="m-4">
            <button onClick={setRange} className="btn m-2">
              <FontAwesomeIcon icon={faUserEdit} />
              ○じ○ふんに　あわせる
            </button>
            <br />
            <button onClick={informTime} className="btn m-2">
              <FontAwesomeIcon icon={faEye} />
              はりのさす　じこくは？
            </button>
          </div>
        </aside>
      </section>

      <section ref={el_input_range} hidden={true}>
        <h6>とけいのはりを　うごかせるよ。</h6>
        <div className="flex justify-center">
          <button onClick={hatiMinus} className="btn">
            -
          </button>
          <input
            style={{ width: "400px" }}
            onChange={hariChange}
            ref={el_hari_range}
            type="range"
            value={hariValue}
            max="720"
            min="0"
            step={hariStep}
          />

          <button onClick={hatiPlus} className="btn">
            +
          </button>
        </div>
      </section>
    </div>
  );
}
