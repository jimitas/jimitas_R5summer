/* eslint-disable @next/next/no-img-element */
import Image from "next/image"; // Imageコンポーネントをインポート
import React, { useEffect, useState, useRef } from "react";
import * as se from "src/components/se";
import styles from "src/components/Block/Block.module.css";
import blockPink from "public/images/block-pink.png";
import blockBlue from "public/images/block-blue.png";
import { useDragDrop } from "src/hooks/useDragDrop";
import { BtnSpace } from "src/components/PutButton/btnSpace";
import { BtnUndo } from "src/components/PutButton/btnUndo";

const divColor = ["#ff8082", "#005aff", "#ff8082", "#005aff"];

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

  const colorChange = () => {
    se.pi.play();
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
                        className={`draggable-elem ${styles.suuzuBlock}`}
                        onClick={colorChange}
                        onTouchStart={touchStart}
                        onTouchMove={touchMove}
                        onTouchEnd={touchEnd}
                        onDragStart={dragStart}
                        onDragOver={dragOver}
                        onDrop={dropEnd}
                        src={blockBlue}
                        alt="blockBlue"
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

// 現在el_tableにイベントを設置し、その子要素に伝搬する形で実現をしているが、本来の形ではない。
// 本来は、divの子要素に直接イベントを設置するべきだが、それでもまだうまく配置できていない。
// ブロック自体はマップ関数で配置すれば良いものだが、そこもうまく言っていない。
// もしマップ関数を利用するならば、それぞれのどろっぱぶるに配列を用意し、そこに格納したり、
// 配列の要素削除、追加を設定することで、ドラッグアンドドロップを実現すると考えられる。
// ただ、数図ブロックのように、それぞれのTDに直接ドロップする形をとるならば、配列の形は
// あまり効率的ともいえない。

// まずは、カラーチェンジの要素を取り除き、ドラッグドロップができるかどうかを試したい。

// ブロックを画像で表示し、回転のアニメーションをつけたい
// タッチイベントについては直接divに配置できるようになった。
// ドラッグイベントについては、子要素に直接イベントを付与できないが、とりあえず放置
// 現在のスタイリングでは、例えばテーブルごとドラッグされるということはないが、ドラッグできる余白があると、勝手に動いてしまう恐れがある。
// よく考えたら、react-draggableしか勝たん？

// react-draggableだとやはり、パフォーマンスが落ちるのと、カラーチェンジやCSSの当て方がうまくいかないため、やはり却下します。
// const handleDragStart = (e: DragEvent) => {
//   dragStart(e as unknown as React.DragEvent<HTMLDivElement>);
// };
// const handleDragOver = (e: DragEvent) => {
//   dragOver(e as unknown as React.DragEvent<HTMLDivElement>);
// };
// const handleDropEnd = (e: DragEvent) => {
//   dropEnd(e as unknown as React.DragEvent<HTMLDivElement>);
// };

// const handleTouchStart = (e: TouchEvent) => {
//   touchStart(e as unknown as React.TouchEvent<HTMLDivElement>);
// };

// const handleTouchMove = (e: TouchEvent) => {
//   touchMove(e as unknown as React.TouchEvent<HTMLDivElement>);
// };

// const handleTouchEnd = (e: TouchEvent) => {
//   touchEnd(e as unknown as React.TouchEvent<HTMLDivElement>);
// };
// div.addEventListener("click", colorChange, false);
// div.addEventListener("touchstart", touchStartEvent, false);
// div.addEventListener("touchend", touchEndEvent, false);
// div.addEventListener("dragstart", handleDragStart, false);
// div.addEventListener("dragover", handleDragOver, false);
// div.addEventListener("drop", handleDropEnd, false);
// div.addEventListener("touchstart", handleTouchStart, false);
// div.addEventListener("touchmove", handleTouchMove, false);
// div.addEventListener("touchend", handleTouchEnd, false);
// 各ブロックに異なる数だけブロックを配置したい。
// テーブル４つ、２行５列のブロックに、flagを挿入して、その判定によって、
// テーブルを配置するようにしたらどうか？
// うまく配置出来たら、imgに直接イベントを挿入できそうだ。
