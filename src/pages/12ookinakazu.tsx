import Layout from "@/components/Layout";
import * as se from "src/components/se";
import { useEffect, useRef, useState } from "react";
import styles from "src/styles/Home.module.css";
import { create } from "domain";
// ボタンを押したら、数字が入力されるようにしたい。
// 相互のボタンを押したら相互に反映されるようにしたい。
export default function Home() {
  const el_kuraidori = useRef<HTMLDivElement>(null);

  // ステップ1: `input`要素の参照を保存するための配列を作成します
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const kurai_yomi = ["一", "十", "百", "千", "一万", "十万", "百万", "千万", "一億", "十億", "百億", "千億", "一兆"];
  const kurai_kazu = [
    "1",
    "10",
    "100",
    "1000",
    "10000",
    "10万",
    "100万",
    "1000万",
    "1億",
    "10億",
    "100億",
    "1000億",
    "1兆",
  ];
  const bgColor = ["#efd3d8", "#fff262", "lightblue", "white"];
  const [count, setCount] = useState<number>(0);
  const [column, setColumn] = useState<number>(5);
  const [inputValue_1, setInputValue_1] = useState<number>(0);
  var itemLengthes: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // 変更のたびに、配列が初期化されてしまうので、面倒だけど、１つずつの数値を直接とってくるほうがよさそうだ。useRefがよいか？
  const resetTable = () => {
    setCount((count) => count + 1);
    se.seikai1.play();
  };

  const changecolumnumns = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setColumn(value);
  };

  const handleInputChange_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setInputValue_1(value);
  };

  const putNumber_1 = () => {
    // 桁数を調べる
    console.log(inputValue_1);

    const inputValueString = inputValue_1.toString();
    const numberLength = inputValueString.length;
    if (numberLength > 13) return;

    // digits配列を作成し、不足分は0で埋める
    const digits = Array.from({ length: 13 }, (_, index) =>
      index < numberLength ? parseInt(inputValueString[index], 10) : 0
    );
    for (let j = 0; j < 13; j++) {
      itemLengthes[column - 13 + j] = digits[j];
    }

    createItems();
  };

  const createItems = () => {
    const TBL: any = document.getElementById("TBL");
    for (let j = 0; j < column; j++) {
      TBL!.rows[3].cells[j].innerHTML = "";
      for (let k = 0; k < itemLengthes[j]; k++) {
        const div = document.createElement("div");
        div.innerHTML = kurai_kazu[column - j - 1];
        div.className = styles.valueItems;
        TBL!.rows[3].cells[j].appendChild(div);
      }
    }
  };

  useEffect(() => {
    const ele = el_kuraidori.current;
    while (ele?.firstChild) {
      ele.removeChild(ele.firstChild);
    }
    const TBL = document.createElement("table");
    TBL.id = "TBL";
    for (let i = 0; i < 4; i++) {
      const tr = document.createElement("tr");
      TBL.appendChild(tr);
      for (let j = 0; j < column; j++) {
        const td = document.createElement("td");
        if (i === 0) {
          td.innerHTML = kurai_yomi[column - j - 1] + "の位";
          td.style.height = "30px";
        }
        if (i === 1) {
          td.style.height = "50px";
          const input = document.createElement("input");
          input.type = "number";
          input.max = "9";
          input.min = "0";
          input.value = "";
          input.className = styles.digitInput; // styles.digitInputをclassNameプロパティに渡す

          // ステップ2: `input`要素の参照を配列に代入します
          inputRefs.current[j] = input;
          td.appendChild(input);
        }
        if (i === 2) {
          td.style.height = "30px";
          for (let k = 0; k < 2; k++) {
            const btn = document.createElement("button");
            btn.className = styles.btnPlusMinus;
            if (k === 0) {
              btn.innerText = "-";
              btn.addEventListener("click", () => {
                itemLengthes[j]--;
                if (itemLengthes[j] < 0) itemLengthes[j] = 0;
                createItems();
              });
            } else if (k === 1) {
              btn.innerText = "+";
              btn.addEventListener("click", () => {
                itemLengthes[j]++;
                createItems();
              });
            }
            td.appendChild(btn);
          }
        }

        td.style.backgroundColor = bgColor[(column - j - 1) % 4];
        tr.appendChild(td);
      }
    }
    el_kuraidori.current?.appendChild(TBL);
  }, [count]);

  return (
    <Layout title="大きな数">
      けた数
      <input
        value={column}
        onChange={changecolumnumns}
        type="number"
        max="13"
        min="2"
        style={{
          textAlign: "right",
          width: "60px",
          height: "40px",
          fontSize: "30px",
          color: "black",
          margin: "5px",
        }}
      />
      <button
        onClick={resetTable}
        style={{ border: "solid 1px yellow", width: "80px", height: "30px", margin: "5px 20px 5px 5px" }}
      >
        リセット
      </button>
      数字
      <input
        value={inputValue_1}
        onChange={handleInputChange_1}
        type="number"
        style={{
          textAlign: "right",
          width: "300px",
          height: "40px",
          fontSize: "30px",
          color: "black",
          marginRight: "5px",
        }}
      />
      <button
        onClick={putNumber_1}
        style={{ border: "solid 1px yellow", width: "80px", height: "30px", margin: "auto 10px 30px" }}
      >
        調べる１
      </button>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <div ref={el_kuraidori} className={styles.kuraidoriTable}></div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button style={{ border: "solid 1px yellow", width: "80px", height: "30px", margin: "50px 0 0 10px" }}>
            調べる２
          </button>
          <button style={{ border: "solid 1px yellow", width: "80px", height: "30px", margin: "100px 0 0 10px" }}>
            調べる３
          </button>
        </div>
      </section>
    </Layout>
  );
}
