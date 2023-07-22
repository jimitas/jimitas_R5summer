import styles from "src/components/PutImage/putImage.module.css";

export function PutImage(props) {
  const el_img = props.el_img;
  return <div ref={el_img} className={styles.imgPlace}></div>;
}
