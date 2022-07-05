import { useState } from "react";
import { useFetch } from "../customHooks/useFetch";
import { FormPage } from "../FormPage/FormPage";
import { QuizPage } from "../QuizPage/QuizPage";
import styles from "./StartPage.module.css";

const StartPage = () => {
  const [customizeGame, setCustomizeGame] = useState(false);
  const [quickGameData, fetchQuickGameData] = useFetch(
    "https://opentdb.com/api.php?amount=10"
  );
  // const [customGameData, setCustomGameData] = useFetch("https://opentdb.com/api.php?amount=10");

  const handleQuickGame = () => {
    console.log("StartPage: handleQuickGameData");
    fetchQuickGameData();
  };

  const handleCustomizeGame = () => {
    setCustomizeGame(true);
  };

  // console.log("quickGameData: ", quickGameData);

  return (
    <>
      {!quickGameData.data && !customizeGame && (
        <section className={styles.container}>
          <button className={styles.button} onClick={handleQuickGame}>
            Quick Game
          </button>
          <button className={styles.button} onClick={handleCustomizeGame}>
            Customize Game
          </button>
        </section>
      )}

      {quickGameData.isLoading && !customizeGame && (
        <span className={styles.loading}>Loading...</span>
      )}
      {quickGameData.data && !customizeGame && (
        <QuizPage data={quickGameData.data.results} />
      )}
      {customizeGame && !!quickGameData && <FormPage />}
    </>
  );
};

export { StartPage };
