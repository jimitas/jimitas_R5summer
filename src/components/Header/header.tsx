// import * as se from "src/components/se";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faHome, faPalette, faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";
import { useChangeColor } from "src/hooks/useChangeColor";
// import { useChangeUser } from "src/hooks/useChangeUser";
// import { useRouter } from "next/router";
// import { PopupMenu } from "src/components/Popupmenu";

import styles from "src/components/Header/header.module.css";

export function Header() {

  const { colorIndex, changeColor } = useChangeColor();

  // const { GAKUNEN, KUMI, BANGO, gakunen, kumi, bango, changeGakunen, changeKumi, changeBango } = useChangeUser();
  // const router = useRouter();

  // const reload = () => {
  //   se.set.play();
  //   const result = window.confirm("もういちど　ページを　よみこみますか？");
  //   if (result === false) return;
  //   location.reload();
  // };

  // const back = () => {
  //   se.alert.play();
  //   se.set.play();
  //   const result = window.confirm("まえの　ページに　もどりますか？");
  //   if (result === false) return;
  //   router.back();
  // };

  return (
    <header className={styles.nav}>
      <img className="rounded" src="../../images/jimitas_logo.png" alt="" />
      {/* <button onClick={toggleDarkMode}>{isDarkMode ? "Light Mode" : "Dark Mode"}</button> */}
      <div onClick={changeColor} className="w-8 cursor-pointer" style={{ color: "orange" }}>
        <FontAwesomeIcon icon={faPalette} />
      </div>


      {/* <div className={styles.navButton}>
        <Link href="./">
          <FontAwesomeIcon icon={faHome} style={{ color: "pink" }} />
        </Link>
      </div>

      <div className={styles.navButton} style={{ color: "yellow" }}>
        <PopupMenu />
      </div>

      <div onClick={back} className={styles.navButton}>
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
      </div>

      <div onClick={reload} className={styles.navButton}>
        <FontAwesomeIcon icon={faUndo} />
      </div>

     */}
    </header>
  );
}
