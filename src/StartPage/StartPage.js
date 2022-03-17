import { useState } from "react";
import { FormPage } from "../FormPage/FormPage";
import { QuizPage } from "../QuizPage/QuizPage";
import styles from "./StartPage.module.css";

const StartPage = ({ data }) => {
  const [quickGame, setQuickGame] = useState(false);
  const [customizeGame, setCustomizeGame] = useState(false);

  const handleQuickGame = () => {
    setQuickGame(true);
    setCustomizeGame(false);
  };

  const handleCustomizeGame = () => {
    setCustomizeGame(true);
    setQuickGame(false);
  };

  return (
    <section className={styles.container}>
      {!quickGame && !customizeGame && (
        <>
          <button className={styles.button} onClick={handleQuickGame}>
            Quick Game
          </button>
          <button className={styles.button} onClick={handleCustomizeGame}>
            Customize Game
          </button>
        </>
      )}

      {quickGame && !customizeGame && <QuizPage data={data.results} />}
      {customizeGame && !quickGame && <FormPage data={data.results} />}
    </section>
  );
};

export { StartPage };
