import { StartPage } from "../StartPage/StartPage";
import styles from "./TriviaGame.module.css";

const TriviaGame = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>trivia game</h1>
      </header>
      <StartPage />
    </div>
  );
};

export default TriviaGame;
