import { Header } from "src/components/Header/header";
import { Footer } from "src/components/Footer/footer";
import styles from "src/components/Layout/layout.module.css";

export function Layout({ children, title }) {
  return (
    <div className="body">
      <Header />
      <main className={styles.main}>
        <div className={styles.mainTitle}>{title}</div>
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
