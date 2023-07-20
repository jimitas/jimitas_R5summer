import { useEffect, useState, useRef, FC } from "react";
import Links from "src/components/Links/index";
import styles from "src/components/Popupmenu/Popupmenu.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

export const PopupMenu: FC = () => {
  const [isShown, setIsShown] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleToggleButtonClick = () => {
    if (isShown) return;
    setIsShown(true);
  };

  const handleCloseButtonClick = () => {
    setIsShown(false);
  };

  return (
    <div className="text-yellow-300" onClick={isShown ? handleCloseButtonClick : handleToggleButtonClick}>
      <FontAwesomeIcon className="w-8" icon={faList} />
      <div className={isShown ? styles.popupMenuShown : styles.popupMenu} ref={popupRef}>
        <FontAwesomeIcon className="w-8" icon={faWindowClose} onClick={handleCloseButtonClick} />
        <Links />
      </div>
    </div>
  );
};
