import React, { useEffect, useState, useRef } from "react";
import * as se from "src/components/se";
import styles from "src/components/Block/Block.module.css";
import { useDragDrop } from "src/hooks/useDragDrop";
import { BtnSpace } from "src/components/PutButton/btnSpace";
import { BtnUndo } from "src/components/PutButton/btnUndo";

interface BlockProps {
  a: number;
  b: number;
}

export function Block(props: BlockProps) {
  const el_table_place = useRef<HTMLDivElement>(null);
  const leftUpCount: number = props.a > 10 ? 10 : 0 || 0;
  const rightUpCount: number = props.b > 10 ? 10 : 0 || 0;
  const leftLoCount: number = props.a > 10 ? props.a - 10 : props.a === 0 ? 0 : props.a || 10;
  const rightLoCount: number = props.b > 10 ? props.b - 10 : props.b === 0 ? 0 : props.b || 10;

  const [count, setCount] = useState(0);

  const resetTable = () => {
    setCount((count) => count + 1);
    se.seikai1.play();
  };

  const { dragStart, dragOver, dropEnd, touchStart, touchMove, touchEnd } = useDragDrop();

  const flippedBlock = (e: any) => {
    se.pi.play();
    e.target.style.transform = e.target.style.transform == "rotateY(180deg)" ? "rotateY(0deg)" : "rotateY(180deg)";
    if (e.target.src.includes("pink")) {
      e.target.src = "/images/block-blue.png";
    } else {
      e.target.src = "/images/block-pink.png";
    }
  };

  let touchStartFlag = false;
  const touchStartEvent = () => {
    touchStart;
    //150ミリ秒以内にタッチして指を離すとき，クリックイベントと同じ挙動とみなす。
    touchStartFlag === false ? (touchStartFlag = true) : (touchStartFlag = false);
    setTimeout(() => {
      touchStartFlag = false;
    }, 150);
  };
  
  useEffect(() => {
    const touchMoveEvent = () => {
      touchMove;
    };
    const touchEndEvent = () => {
      touchEnd;
      touchStartFlag === true ? flippedBlock : null;
    };

    const ele = el_table_place.current;
    while (ele!.firstChild) {
      ele!.removeChild(ele!.firstChild);
    }

    for (let tableIndex = 0; tableIndex < 4; tableIndex++) {
      const TBL = document.createElement("table");
      ele!.appendChild(TBL);
      for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
        const tr = document.createElement("tr");
        TBL.appendChild(tr);
        for (let colIndex = 0; colIndex < 5; colIndex++) {
          const td = document.createElement("td");
          td.className = "droppable-elem";
          tr.appendChild(td);

          if (
            (tableIndex === 0 && rowIndex * 5 + colIndex < leftUpCount) ||
            (tableIndex === 1 && rowIndex * 5 + colIndex < rightUpCount) ||
            (tableIndex === 2 && rowIndex * 5 + colIndex < leftLoCount) ||
            (tableIndex === 3 && rowIndex * 5 + colIndex < rightLoCount)
          ) {
            const img = document.createElement("img");
            img.src = "/images/block-blue.png";
            img.className = "draggable-elem";
            img.setAttribute("draggable", "true");
            // img.addEventListener("touchstart", touchStartEvent, false);
            // img.addEventListener("touchmove", touchMoveEvent, false);
            // img.addEventListener("touchend", touchEndEvent, false);
            // img.addEventListener("dragstart", dragStartEvent, false);
            // img.addEventListener("dragover", dragOverEvent, false);
            // img.addEventListener("drop", dropEndEvent, false);
            img.addEventListener("click", flippedBlock, false);
            td.appendChild(img);
          }
        }
      }
    }
  }, [count, leftLoCount, leftUpCount, rightLoCount, rightUpCount]);

  return (
    <div className="flex justify-center flex-wrap items-end">
      <BtnSpace></BtnSpace>
      <div
        ref={el_table_place}
        className={styles.table}
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDrop={dropEnd}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
      ></div>
      <BtnUndo handleEvent={resetTable}></BtnUndo>
    </div>
  );
}
