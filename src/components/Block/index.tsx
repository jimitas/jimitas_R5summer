import React, { useEffect, useState, useRef } from "react";
import * as se from "src/components/se";
import styles from "src/components/Block/Block.module.css";

import { useDragDrop } from "src/hooks/useDragDrop";
import { BtnSpace } from "src/components/PutButton/btnSpace";
import { BtnUndo } from "src/components/PutButton/btnUndo";

const divColor = ["#ff8082", "#005aff", "#ff8082", "#005aff"];

interface BlockProps {
  a: number;
  b: number;
}

export function Block(props: BlockProps) {
  const el_table = useRef<HTMLDivElement>(null);
  const left_up = props.a > 10 ? 10 : 0 || 0;
  const right_up = props.b > 10 ? 10 : 0 || 0;
  const left_down = props.a > 10 ? props.a - 10 : props.a === 0 ? 0 : props.a || 10;
  const right_down = props.b > 10 ? props.b - 10 : props.b === 0 ? 0 : props.b || 10;
  const [count, setCount] = useState(0);

  const resetTable = () => {
    setCount((count) => count + 1);
    se.seikai1.play();
  };

  const { dragStart, dragOver, dropEnd, touchStart, touchMove, touchEnd } = useDragDrop();

  useEffect(() => {
    const ele = el_table.current;
    while (ele?.firstChild) {
      ele.removeChild(ele.firstChild);
    }
    for (let i = 0; i < 4; i++) {
      const TBL = document.createElement("table");
      ele?.appendChild(TBL);
      for (let j = 0; j < 2; j++) {
        const tr = document.createElement("tr");
        TBL.appendChild(tr);
        for (let k = 0; k < 5; k++) {
          const td = document.createElement("td");
          td.className = "droppable-elem";
          tr.appendChild(td);

          if (
            (i === 0 && j * 5 + k < left_up) ||
            (i === 1 && j * 5 + k < right_up) ||
            (i === 2 && j * 5 + k < left_down) ||
            (i === 3 && j * 5 + k < right_down)
          ) {
            let colorIndex = i;
            let touchStartFlag = false;
            const div = document.createElement("div");
            div.className = "draggable-elem";
            div.setAttribute("draggable", "true");
            div.style.backgroundColor = divColor[colorIndex];

            const colorChange = () => {
              se.pi.play();
              colorIndex++;
              div.style.backgroundColor = divColor[colorIndex % 2];
            };

            //150ミリ秒以内にタッチして指を離すとき，クリックイベントと同じ挙動とみなす。
            const touchStartEvent = () => {
              touchStartFlag === false ? (touchStartFlag = true) : (touchStartFlag = false);
              setTimeout(() => {
                touchStartFlag = false;
              }, 150);
            };

            const touchEndEvent = () => {
              touchStartFlag === true ? colorChange() : null;
            };

            div.addEventListener("click", colorChange, false);
            div.addEventListener("touchstart", touchStartEvent, false);
            div.addEventListener("touchend", touchEndEvent, false);
            td.appendChild(div);
          }
        }
      }
    }
  }, [count, left_down, left_up, right_down, right_up]);

  return (
    <div className="flex justify-center flex-wrap items-end">
      <BtnSpace ></BtnSpace>
      <div
        ref={el_table}
        className={styles.table}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDrop={dropEnd}
      ></div>
      <BtnUndo handleEvent={resetTable}></BtnUndo>
    </div>
  );
}
