import { useState, useMemo } from "react";
import { decodeHTMLEntities } from "../utils/utils";
import { AnswerRadioButton } from "./AnswerButton/AnswerRadioButton";
import styles from "./QuizPage.module.css";

const QuizPage = ({ quizData, onReset }) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [points, setPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userChoiceDisabled, setUserChoiceDisabled] = useState(false);

  const shuffleAnswers = (arr) =>
    arr
      .map((answer) => ({ answer, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ answer }) => answer);

  const quiz = useMemo(
    () =>
      quizData.map((obj) => ({
        question: obj.question,
        answers: shuffleAnswers([...obj.incorrect_answers, obj.correct_answer]),
        correctAnswer: obj.correct_answer,
      })),
    [quizData]
  );

  const handleUserChoice = (e) => {
    if (quiz[questionNumber].correctAnswer === e.target.value) {
      setPoints((points) => points + 1);
    }
    setUserChoiceDisabled(true);
  };

  const handleNextQuestion = () => {
    if (questionNumber + 1 === quizData.length) {
      setShowResults(true);
    } else {
      setQuestionNumber((questionNumber) => questionNumber + 1);
    }
    setUserChoiceDisabled(false);
  };

  const handleTriviaGameReset = () => {
    onReset();
  };

  if (showResults) {
    return (
      <>
        <h1>{`You got ${points} out of ${quizData.length}`}</h1>
        <button onClick={handleTriviaGameReset}>Try Again</button>
      </>
    );
  }
  return (
    <section className={styles.container}>
      <h1>Quiz Page</h1>
      {quizData ? (
        <>
          <h1>{decodeHTMLEntities(quiz[questionNumber].question)}</h1>
          <section onChange={handleUserChoice}>
            {quiz[questionNumber].answers.map((answer) => (
              <AnswerRadioButton
                key={answer}
                answer={answer}
                disabled={userChoiceDisabled}
              />
            ))}
          </section>
          <p>Points: {`${points} / ${quizData.length}`}</p>
          <p>Progress: {`${questionNumber + 1} / ${quizData.length}`}</p>
          <button className={styles.button} onClick={handleNextQuestion}>
            Next Question
          </button>
        </>
      ) : (
        <h1>Technical Error, try reloading the page</h1>
      )}
    </section>
  );
};

export { QuizPage };
