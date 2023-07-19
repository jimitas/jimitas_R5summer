import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <div>
        {/* <Layout title=""> */}
        <div className="text-red-500">
          Jimitas
          <span className="text-l">{"(ジミタス)"}</span>
        </div>

        <img className={styles.img} src="images/jimi.png" alt="" />

        <div className={styles.subTitle}>
          {/* <FontAwesomeIcon icon={faCat} />　 */}
          <ruby>
            地味
            <rt>じみ</rt>
          </ruby>
          に
          <ruby>
            助<rt>たす</rt>
          </ruby>
          かる
          <ruby>
            学習
            <rt>がくしゅう</rt>
          </ruby>
          コンテンツ　
          {/* <FontAwesomeIcon icon={faCat} /> */}
        </div>

        <br />
        {/* <Links /> */}
        {/* </Layout> */}
      </div>
      <main className={styles.main}></main>
    </>
  );
}
