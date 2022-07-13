import { useState } from "react";
import { useFetch } from "../customHooks/useFetch";
import { FormPage } from "../FormPage/FormPage";
import { Loading } from "../Loading/Loading";
import { Button } from "../Button/Button";
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

  const STAGE = {
    INITIAL: !!(
      !quickGameData.data &&
      !quickGameData.isLoading &&
      !customizeGame
    ),
    IS_LOADING: !!(quickGameData.isLoading && !customizeGame),
    QUICK_GAME: !!(quickGameData.data && !customizeGame),
    CUSTOMIZE_GAME: !!(customizeGame && !quickGameData.data),
  };

  return (
    <>
      {STAGE.INITIAL && (
        <section className={styles.container}>
          <Button onClick={handleQuickGame} text="Quick Game" />
          <Button onClick={handleCustomizeGame} text="Customize Game" />
        </section>
      )}

      {STAGE.IS_LOADING && <Loading />}
      {STAGE.QUICK_GAME && (
        <QuizPage
          quizData={quickGameData.data.results}
          onReset={handleQuickGameReset}
        />
      )}
      {STAGE.CUSTOMIZE_GAME && <FormPage onReset={handleCustomGameReset} />}
    </>
  );
};

export { StartPage };
