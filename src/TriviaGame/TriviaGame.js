import { useEffect, useState } from "react";
import { StartPage } from "../StartPage/StartPage";
import styles from "./TriviaGame.module.css";

const TriviaGame = () => {
  const [triviaResponse, setTriviaResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchTriviaGame = async () => {
        const triviaResponse = await fetch(
          "https://opentdb.com/api.php?amount=30"
        );
        const triviaJSON = await triviaResponse.json();
        console.log(triviaJSON);
        setLoading(false);
        setTriviaResponse(triviaJSON);
      };
      fetchTriviaGame();
    } catch (error) {
      console.error(
        `An error occurred in first useEffect call in fetch: ${error}`
      );
    }
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>trivia game</h1>
      </header>
      {loading ? (
        <h1>Loading...</h1>
      ) : triviaResponse ? (
        <StartPage data={triviaResponse} />
      ) : (
        <h1>Sorry, couldn't load game due to technical difficulties...</h1>
      )}
    </div>
  );
};

export default TriviaGame;
