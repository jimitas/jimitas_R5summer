import Image from "next/image"; // Imageコンポーネントをインポート
import React, { useEffect, useState, useRef } from "react";
import * as se from "src/components/se";
import styles from "src/components/Block/Block.module.css";
import blockPink from "public/images/block-pink.png";
import blockBlue from "public/images/block-blue.png";
import { useDragDrop } from "src/hooks/useDragDrop";
import { BtnSpace } from "src/components/PutButton/btnSpace";
import { BtnUndo } from "src/components/PutButton/btnUndo";


interface BlockProps {
  a: number;
  b: number;
}

export function Block(props: BlockProps) {
  const TABLES = ["tableLeftUp", "tableRightUp", "tableLeftLo", "tableRightLo"];
  const TABLE_COLUMNS = [0, 1, 2, 3, 4];
  const TABLE_ROWS = [0, 1];

  const el_table_place = useRef<HTMLDivElement>(null);
  const leftUpCount: number = props.a > 10 ? 10 : 0 || 0;
  const rightUpCount: number = props.b > 10 ? 10 : 0 || 0;
  const leftLoCount: number = props.a > 10 ? props.a - 10 : props.a === 0 ? 0 : props.a || 10;
  const rightLoCount: number = props.b > 10 ? props.b - 10 : props.b === 0 ? 0 : props.b || 10;
  //各テーブルのブロックの個数を管理
  const putBlockCount: number[] = [
    leftUpCount > 5 ? 5 : leftUpCount,
    leftUpCount < 5 ? 0 : leftUpCount - 5,
    rightUpCount > 5 ? 5 : rightUpCount,
    rightUpCount < 5 ? 0 : rightUpCount - 5,
    leftLoCount > 5 ? 5 : leftLoCount,
    leftLoCount < 5 ? 0 : leftLoCount - 5,
    rightLoCount > 5 ? 5 : rightLoCount,
    rightLoCount < 5 ? 0 : rightLoCount - 5,
  ];

  const [count, setCount] = useState(0);
  const { dragStart, dragOver, dropEnd, touchStart, touchMove, touchEnd } = useDragDrop();

  const resetTable = () => {
    setCount((count) => count + 1);
    se.seikai1.play();
  };

  const colorChange = (e:any) => {
  console.log(e.target.src)
  };

  //後で色を変えるイベントを追加

  useEffect(() => {}, []);

  return (
    <div className="flex justify-center flex-wrap items-end">
      <BtnSpace></BtnSpace>
      <div ref={el_table_place} className={styles.table}>
        {TABLES.map((table, tableIndex) => (
          <table key={tableIndex} id={TABLES[tableIndex]}>
            {TABLE_ROWS.map((row, trIndex) => (
              <tr key={trIndex}>
                {TABLE_COLUMNS.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="droppable-elem"
                    onDragStart={dragStart}
                    onDragOver={dragOver}
                    onDrop={dropEnd}
                  >
                    {colIndex < putBlockCount[tableIndex * 2 + trIndex] && (tableIndex === 0 || tableIndex === 2) ? (
                      <Image
                        className={`draggable-elem ${styles.suuzuBlock}`}
                        src={blockPink}
                        alt="blockPink"
                        draggable="true"
                        onClick={colorChange}
                        onTouchStart={touchStart}
                        onTouchMove={touchMove}
                        onTouchEnd={touchEnd}
                        onDragStart={dragStart}
                        onDragOver={dragOver}
                        onDrop={dropEnd}
                      />
                    ) : colIndex < putBlockCount[tableIndex * 2 + trIndex] && (tableIndex === 1 || tableIndex === 3) ? (
                      <Image
                        draggable="true"
                        src={blockBlue}
                        alt="blockBlue"
                        className={`draggable-elem ${styles.suuzuBlock}`}
                        onClick={colorChange}
                        onTouchStart={touchStart}
                        onTouchMove={touchMove}
                        onTouchEnd={touchEnd}
                        onDragStart={dragStart}
                        onDragOver={dragOver}
                        onDrop={dropEnd}
                      />
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </table>
        ))}
      </div>
      <BtnUndo handleEvent={resetTable}></BtnUndo>
    </div>
  );
}
