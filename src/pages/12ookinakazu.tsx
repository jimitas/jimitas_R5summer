import Layout from "@/components/Layout";
import * as se from "src/components/se";
import { useEffect, useRef, useState } from "react";
import styles from "src/styles/Home.module.css";

export default function Home() {
  const el_kuraidori = useRef<HTMLDivElement>(null);
  const num: number = 246;
  const kurai_yomi = ["一", "十", "百", "千", "一万", "十万", "百万", "千万", "一億", "十億", "百億", "千億", "一兆"];
  const bgColor = ["#efd3d8", "#fff262", "lightblue", "white"];
  const [count, setCount] = useState<number>(0);
  const [row, setRow] = useState<number>(5);
  const [inputValue_1, setInputValue_1] = useState("");
  let inputValues_2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const changeRows = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setRow(value);
  };

  const putNumber_1 = () => {
    console.log("Input Value:", inputValue_1);
  };

  const handleInputChange_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue_1(event.target.value);
  };

  const putNumber_2 = () => {
    let sum: number = 0;
    for (let i = 0; i < row;i++) {
      sum = sum + inputValues_2[row - i - 1] * 10 ** i;
    }
    console.log(sum);
  };

  const handleDynamicInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    inputValues_2[index] = newValue;
  };

  const resetTable = () => {
    setCount((count) => count + 1);
    se.seikai1.play();
  };

  useEffect(() => {
    const ele = el_kuraidori.current;
    while (ele?.firstChild) {
      ele.removeChild(ele.firstChild);
    }
    const TBL = document.createElement("table");
    for (let i = 0; i < 3; i++) {
      const tr = document.createElement("tr");
      TBL.appendChild(tr);
      for (let j = 0; j < row; j++) {
        const td = document.createElement("td");
        if (i === 1) {
          td.innerHTML = kurai_yomi[row - j - 1] + "の位";
          td.style.height = "50px";
        }
        if (i === 2) {
          td.style.height = "120px";
          const input = document.createElement("input");
          input.type = "number";
          input.max = "9";
          input.min = "0";
          input.value = inputValues_2[j].toString();
          input.className = styles.digitInput; // styles.digitInputをclassNameプロパティに渡す
          input.addEventListener("change", (event: any) => handleDynamicInputChange(j, event)); // イベントリスナーを追加
          td.appendChild(input);
        }
        td.style.backgroundColor = bgColor[(row - j - 1) % 4];
        tr.appendChild(td);
      }
    }
    el_kuraidori.current?.appendChild(TBL);
  }, [count]);

  return (
    <Layout title="大きな数">
      <button
        onClick={resetTable}
        style={{ border: "solid 1px yellow", width: "80px", height: "30px", margin: "auto 10px 30px" }}
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
      <button
        onClick={putNumber_2}
        style={{ border: "solid 1px yellow", width: "80px", height: "30px", margin: "auto 10px 30px" }}
      >
        調べる２
      </button>
      <input
        value={row}
        onChange={changeRows}
        type="number"
        style={{
          textAlign: "right",
          width: "50px",
          height: "40px",
          fontSize: "30px",
          color: "black",
          marginRight: "5px",
        }}
      />
      <section style={{ display: "flex", justifyContent: "center" }}>
        <div ref={el_kuraidori} className={styles.kuraidoriTable}></div>
        <button style={{ border: "solid 1px yellow", width: "50px", height: "30px", margin: "auto 10px 30px" }}>
          かくす
        </button>
      </section>
    </Layout>
  );
}
