// import * as se from "src/components/se";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChangeColor } from "src/hooks/useChangeColor";
import { faUndo, faHome, faPalette, faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import router from "next/router";
import Link from "next/link";
import { PopupMenu } from "src/components/Popupmenu";

import styles from "src/components/Header/header.module.css";

export function Header() {
  const { colorIndex, changeColor } = useChangeColor();


  const reload = () => {
    // se.set.play();
    const result = window.confirm("もういちど　ページを　よみこみますか？");
    if (result === false) return;
    location.reload();
  };

  const back = () => {
    // se.alert.play();
    // se.set.play();
    const result = window.confirm("まえの　ページに　もどりますか？");
    if (result === false) return;
    router.back();
  };

  return (
    <header className={styles.nav}>
      <div className="w-8 text-3xl font-bold mx-2 cursor-pointer">
        <Link href="./">
          <FontAwesomeIcon icon={faHome} style={{ color: "pink" }} />
        </Link>
      </div>

      <div onClick={changeColor} className="w-8 mx-2 cursor-pointer" style={{ color: "orange" }}>
        <FontAwesomeIcon icon={faPalette} />
      </div>

      <div onClick={back} className="w-8 text-3xl font-bold mx-2 cursor-pointer">
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
      </div>

      <div onClick={reload} className="w-8 text-3xl font-bold mx-2 cursor-pointer">
        <FontAwesomeIcon icon={faUndo} />
      </div>

      <div className="w-8 text-3xl font-bold mx-2 cursor-pointer" style={{ color: "yellow" }}>
        <PopupMenu />
      </div>

    </header>
  );
}
