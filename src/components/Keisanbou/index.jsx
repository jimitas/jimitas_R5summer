import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faCalculator } from "@fortawesome/free-solid-svg-icons";
import styles from "src/components/Keisanbou/keisanbou.module.css";
import * as se from "src/components/se";

export function Keisanbou(props) {
  //はじめに並べる数を取得する。
  const hyaku = props.hyaku || 0;
  const ju = props.ju || 0;
  const ichi = props.ichi || 0;
  const item_length = [hyaku, ju, ichi];

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const el_hyaku_place = useRef(null);
  const el_ju_place = useRef(null);
  const el_ichi_place = useRef(null);

  const el_put_place = useRef(null);
  const el_set_place = useRef(null);
  const el_calc_result = useRef(null);

  const resetEvent = () => {
    se.alert.play();
    const result = window.confirm("リセットしますか？");
    if (result === false) return;

    setCount1((count1) => count1 + 1);
    se.reset.play();
  };

  //計算棒にイベントを追加
  const ITEMS = ["k-hyaku", "k-ju", "k-ichi"];
  const ITEMS_IMG_WIDTH = ["7vw", "3vw", "1.5vw"];
  const imgAddEvent = (img, i) => {
    img.setAttribute("draggable", "true");
    img.setAttribute("src", `images/${ITEMS[i]}.png`);
    img.className = `draggable-elem ${ITEMS[i]}`;
    img.style.width = ITEMS_IMG_WIDTH[i];
    img.style.height = "7vw";
    img.addEventListener("touchstart", touchStart, false);
    img.addEventListener("touchmove", touchMove, false);
    img.addEventListener("touchend", touchEnd, false);
  };

  //指定された数だけ、計算棒をputTableに並べる。
  const el_putTable = [el_hyaku_place, el_ju_place, el_ichi_place];
  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      const ele = el_putTable[i].current;
      while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
      }
      for (let j = 0; j < item_length[i]; j++) {
        const img = document.createElement("img");
        imgAddEvent(img, i); //計算棒にイベントを追加
        el_putTable[j].current.appendChild(img);
      }
    }
    el_calc_result.current.innerText = "";
  }, [count1]);

  // ドラッグエンドを検出して、計算棒のストックを補充する。
  useEffect(() => {
    const ele2 = el_set_place.current;
    if (ele2 != null) {
      while (ele2.firstChild) {
        ele2.removeChild(ele2.firstChild);
      }
    }
    for (let i = 0; i < ITEMS.length; i++) {
      const img = document.createElement("img");
      imgAddEvent(img, i); //計算棒にイベントを追加
      el_set_place.current.appendChild(img);
    }

    document.addEventListener("dragstart", dragStart, false);
    document.addEventListener("dragover", dragOver, false);
    document.addEventListener("drop", dropEnd, false);

    //アンマウント時にイベントを解除しておかないと、重複してしまい大変！
    return () => {
      document.removeEventListener("dragstart", dragStart, false);
      document.removeEventListener("dragover", dragOver, false);
      document.removeEventListener("drop", dropEnd, false);
    };
  }, [count2]);

  //並べた数を表示する。
  const calcValue = () => {
    const ele = el_put_place.current;
    const hyaku_count = ele.getElementsByClassName("draggable-elem k-hyaku").length;
    const ju_count = ele.getElementsByClassName("draggable-elem k-ju").length;
    const ichi_count = ele.getElementsByClassName("draggable-elem k-ichi").length;
    const Value = Math.floor(hyaku_count * 100 + ju_count * 10 + ichi_count);
    el_calc_result.current.innerText = Value;
    se.seikai1.play();
    setTimeout(() => {
      el_calc_result.current.innerText = "";
    }, 1500);
  };

  // -----ここから　ドラッグイベントについての記述(将来的にはコンポーネント化したい！)
  var dragged;
  //ドラッグ開始の操作
  function dragStart(e) {
    if (e.target.draggable === true) {
      dragged = e.target;
    }
  }
  //ドラッグ中の操作
  function dragOver(e) {
    // prevent default to allow drop
    e.preventDefault();
  }
  //ドラッグ終了後の操作
  function dropEnd(e) {
    // prevent default action (open as link for some elements)
    e.preventDefault();
    // move dragged elem to the selected drop target
    if (e.target.className.match(/droppable-elem/)) {
      dragged.parentNode.removeChild(dragged);
      e.target.appendChild(dragged);
      se.kako.play();
      setCount2((count2) => count2 + 1);
    }
  }

  //タッチ開始の操作
  function touchStart(e) {
    //タッチによる画面スクロールを止める
    e.preventDefault();
  }

  //ドラッグ中の操作
  function touchMove(e) {
    e.preventDefault();
    //ドラッグ中のアイテムをカーソルの位置に追従
    var draggedElem = e.target;
    var touch = e.changedTouches[0];
    e.target.style.position = "fixed";
    e.target.style.top = touch.pageY - window.pageYOffset - draggedElem.offsetHeight / 2 + "px";
    e.target.style.left = touch.pageX - window.pageXOffset - draggedElem.offsetWidth / 2 + "px";
  }

  //ドラッグ終了後の操作
  function touchEnd(e) {
    e.preventDefault();
    //ドラッグ中の操作のために変更していたスタイルを元に戻す
    var droppedElem = e.target;
    droppedElem.style.position = "";
    e.target.style.top = "";
    e.target.style.left = "";
    //ドロップした位置にあるドロップ可能なエレメントに親子付けする
    var touch = e.changedTouches[0];
    //スクロール分を加味した座標に存在するエレメントを新しい親とする
    var newParentElem = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset);

    if (newParentElem.className.match(/droppable-elem/)) {
      newParentElem.appendChild(droppedElem);
      se.kako.play();
      setCount2((count2) => count2 + 1);
    }
  }
  // -----ここまで　ドラッグイベントについての記述(将来的にはコンポーネント化したい！)

  return (
    <div>
      <section className="flex justify-center">
        <table className={styles.table}>
          <tr ref={el_put_place}>
            <td
              ref={el_hyaku_place}
              style={{ width: "40vw", backgroundColor: "pink" }}
              className="p-2 droppable-elem"
            ></td>
            <td
              ref={el_ju_place}
              style={{ width: "20vw", backgroundColor: "lightYellow" }}
              className="p-2 droppable-elem"
            ></td>
            <td
              ref={el_ichi_place}
              style={{ width: "10vw", backgroundColor: "lightBlue" }}
              className="p-2 droppable-elem"
            ></td>
          </tr>
        </table>
        <img src="images/gomibako.png" style={{ width: "6vw", height: "6vw" }} className="mt-auto droppable-elem" />
      </section>

      <section className="flex justify-center mt-4">
        <div className="flex justify-center">
          <div ref={el_set_place} className={styles.setPlace}></div>
        </div>

        <button onClick={calcValue} className={styles.btnCalc}>
          <FontAwesomeIcon icon={faCalculator} />
        </button>

        <button onClick={resetEvent} className={styles.btnUndo}>
          <FontAwesomeIcon icon={faUndo} />
        </button>

        <div ref={el_calc_result} className="place w-20"></div>
      </section>
    </div>
  );
}
