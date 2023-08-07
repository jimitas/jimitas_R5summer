import { useCallback } from "react";
import * as se from "src/components/se";

export const useDragDrop = () => {
  let dragged: HTMLElement | null;

  const dragStart = useCallback((e: React.DragEvent<HTMLImageElement | HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.draggable === true) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dragged = e.target;
    }
  }, []);

  const dragOver = useCallback((e: React.DragEvent<HTMLImageElement | HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const dropEnd = (e: any) => {
    if (e.target.classList.contains("droppable-elem")) {
      if (dragged) {
        const parentElement: Node | null = dragged.parentNode;
        if (parentElement instanceof Node) {
          parentElement.removeChild(dragged);
          e.target.appendChild(dragged);
          se.kako.play();
        }
      }
    }
  };

  const touchStart = useCallback((e: React.TouchEvent<HTMLImageElement | HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const touchMove = useCallback((e: React.TouchEvent<HTMLImageElement | HTMLDivElement>) => {
    e.preventDefault();
    const draggedElem = e.target as HTMLElement;
    const touch = e.changedTouches[0];
    draggedElem.style.position = "fixed";
    draggedElem.style.top = touch.pageY - window.pageYOffset - draggedElem.offsetHeight / 2 + "px";
    draggedElem.style.left = touch.pageX - window.pageXOffset - draggedElem.offsetWidth / 2 + "px";
  }, []);

  const touchEnd = useCallback((e: React.TouchEvent<HTMLImageElement | HTMLDivElement>) => {
    e.preventDefault();
    const droppedElem = e.target as HTMLImageElement;
    droppedElem.style.position = "";
    droppedElem.style.top = "";
    droppedElem.style.left = "";
    const touch = e.changedTouches[0];
    const newParentElem = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset);
    if (newParentElem instanceof HTMLTableCellElement && newParentElem.classList.contains("droppable-elem")) {
      newParentElem.appendChild(droppedElem);
      se.kako.play();
    }
  }, []);

  return { dragStart, dragOver, dropEnd, touchStart, touchMove, touchEnd };
};
