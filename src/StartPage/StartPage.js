import { useState } from "react";
import { FormPage } from "../FormPage/FormPage";
import { QuizPage } from "../QuizPage/QuizPage";

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
    <section>
      {!quickGame && !customizeGame && (
        <>
          <button onClick={handleQuickGame}>Quick Game</button>
          <button onClick={handleCustomizeGame}>Customize Game</button>
        </>
      )}

      {quickGame && !customizeGame && <QuizPage data={data.results} />}
      {customizeGame && !quickGame && <FormPage data={data.results} />}
    </section>
  );
};

export { StartPage };
