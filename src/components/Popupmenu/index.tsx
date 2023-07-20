import { useEffect, useState, useRef, FC } from "react";
import Links from "src/components/Links/index";
import styles from "src/components/Popupmenu/Popupmenu.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

export const PopupMenu: FC = () => {
  const [isShown, setIsShown] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const documentClickHandler = useRef<(e: MouseEvent) => void>();

  useEffect(() => {
    documentClickHandler.current = (e) => {
      if (popupRef.current && popupRef.current.contains(e.target as Node)) return;
      setIsShown(false);
      removeDocumentClickHandler();
    };

    return () => removeDocumentClickHandler();
  }, []);

  const removeDocumentClickHandler = () => {
    document.removeEventListener("click", documentClickHandler.current!);
  };

  const handleToggleButtonClick = () => {
    if (isShown) return;
    setIsShown(true);
    document.addEventListener("click", documentClickHandler.current!);
  };

  const handleCloseButtonClick = () => {
    setIsShown(false);
    removeDocumentClickHandler();
  };

  return (
    <div className="text-yellow-300" onClick={isShown ? handleCloseButtonClick : handleToggleButtonClick}>
      <FontAwesomeIcon icon={faList} />
      <div className={isShown ? styles.popupMenuShown : styles.popupMenu} ref={popupRef}>
        <FontAwesomeIcon icon={faWindowClose} onClick={handleCloseButtonClick} />
        <Links />
      </div>
    </div>
  );
};
