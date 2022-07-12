import { useState } from "react";
import { useFetch } from "../customHooks/useFetch";
import { FormPage } from "../FormPage/FormPage";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { QuizPage } from "../QuizPage/QuizPage";
import styles from "./StartPage.module.css";

const StartPage = () => {
  const [customizeGame, setCustomizeGame] = useState(false);
  const [quickGameData, fetchQuickGameData] = useFetch(
    "https://opentdb.com/api.php?amount=10"
  );

  const handleQuickGame = () => {
    fetchQuickGameData();
  };

  const handleCustomizeGame = () => {
    setCustomizeGame(true);
  };

  const handleQuickGameReset = () => {
    fetchQuickGameData(false);
  };

  const handleCustomGameReset = () => {
    setCustomizeGame(false);
  };

  return (
    <>
      {!quickGameData.data && !customizeGame && (
        <section className={styles.container}>
          <PrimaryButton onClick={handleQuickGame} text="Quick Game" />
          <PrimaryButton onClick={handleCustomizeGame} text="Customize Game" />
        </section>
      )}

      {quickGameData.isLoading && !customizeGame && (
        <span className={styles.loading}>Loading...</span>
      )}
      {quickGameData.data && !customizeGame && (
        <QuizPage
          quizData={quickGameData.data.results}
          onReset={handleQuickGameReset}
        />
      )}
      {customizeGame && !quickGameData.data && (
        <FormPage onReset={handleCustomGameReset} />
      )}
    </>
  );
};

export { StartPage };
