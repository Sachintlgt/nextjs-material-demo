import Login from "@/components/Login";
import styles from "./page.module.css";


// main page, will display login
export default function Home() {
  return (
    <main className={styles.main}>
      <Login />
    </main>
  );
}
