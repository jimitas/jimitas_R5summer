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
    const handleDragStart = (e: DragEvent) => {
      dragStart(e as unknown as React.DragEvent<HTMLDivElement>);
    };
    const handleDragOver = (e: DragEvent) => {
      dragOver(e as unknown as React.DragEvent<HTMLDivElement>);
    };
    const handleDropEnd = (e: DragEvent) => {
      dropEnd(e as unknown as React.DragEvent<HTMLDivElement>);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart(e as unknown as React.TouchEvent<HTMLDivElement>);
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchMove(e as unknown as React.TouchEvent<HTMLDivElement>);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEnd(e as unknown as React.TouchEvent<HTMLDivElement>);
    };

    const flippedBlock = (e: any) => {
      se.pi.play();
      e.target.style.transform = e.target.style.transform == "rotateY(180deg)" ? "rotateY(0deg)" : "rotateY(180deg)";
      if (e.target.src.includes("pink")) {
        e.target.src = "/images/block-blue.png";
      } else {
        e.target.src = "/images/block-pink.png";
      }
    };

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
            const img = document.createElement("img");
            if (i === 0 || i === 2) {
              img.src = "/images/block-pink.png";
            } else {
              img.src = "/images/block-blue.png";
            }
            img.className = "draggable-elem";
            img.setAttribute("draggable", "true");
            td.appendChild(img);

            // 150ミリ秒以内にタッチして指を離すとき，クリックイベントと同じ挙動とみなす。
            let touchStartFlag = false;
            const touchStartEvent = () => {
              touchStartFlag === false ? (touchStartFlag = true) : (touchStartFlag = false);
              setTimeout(() => {
                touchStartFlag = false;
              }, 150);
            };

            const touchEndEvent = () => {
              touchStartFlag === true ? flippedBlock : null;
            };

            img.addEventListener("click", flippedBlock, false);
            img.addEventListener("touchstart", touchStartEvent, false);
            img.addEventListener("touchend", touchEndEvent, false);
            img.addEventListener("dragstart", handleDragStart, false);
            img.addEventListener("dragover", handleDragOver, false);
            img.addEventListener("drop", handleDropEnd, false);
            img.addEventListener("touchstart", handleTouchStart, false);
            img.addEventListener("touchmove", handleTouchMove, false);
            img.addEventListener("touchend", handleTouchEnd, false);
          }
        }
      }
    }
  }, [count, left_down, left_up, right_down, right_up]);

  return (
    <div className="flex justify-center flex-wrap items-end">
      <BtnSpace></BtnSpace>
      <div
        ref={el_table}
        className={styles.table}
        // onTouchStart={touchStart}
        // onTouchMove={touchMove}
        // onTouchEnd={touchEnd}
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDrop={dropEnd}
      ></div>
      <BtnUndo handleEvent={resetTable}></BtnUndo>
    </div>
  );
}
