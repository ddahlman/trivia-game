import { useState } from "react";
import { useFetch } from "../customHooks/useFetch";
import { FormPage } from "../FormPage/FormPage";
import { QuizPage } from "../QuizPage/QuizPage";
import styles from "./StartPage.module.css";

const StartPage = () => {
  const [customizeGame, setCustomizeGame] = useState(false);
  const [quickGameData, setQuickGameData] = useFetch(
    "https://opentdb.com/api.php?amount=10"
  );
  // const [customGameData, setCustomGameData] = useFetch("https://opentdb.com/api.php?amount=10");

  const handleQuickGame = () => {
    setQuickGameData();
  };

  const handleCustomizeGame = () => {
    setCustomizeGame(true);
  };

  // console.log("quickGameData: ", quickGameData);

  return (
    <>
      {!quickGameData && !customizeGame && (
        <section className={styles.container}>
          <button className={styles.button} onClick={handleQuickGame}>
            Quick Game
          </button>
          <button className={styles.button} onClick={handleCustomizeGame}>
            Customize Game
          </button>
        </section>
      )}

      {quickGameData && !customizeGame && (
        <QuizPage data={quickGameData.results} />
      )}
      {customizeGame && !!quickGameData && <FormPage />}
    </>
  );
};

export { StartPage };
