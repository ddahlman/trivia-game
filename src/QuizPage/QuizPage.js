import { useState } from "react";
import TriviaGame from "../TriviaGame/TriviaGame";
import { AnswerButton } from "./AnswerButton/AnswerButton";

const QuizPage = ({ data }) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [points, setPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [reset, setReset] = useState(false);

  const shuffleAnswers = (arr) =>
    arr
      .map((answer) => ({ answer, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ answer }) => answer);

  const quiz = data.map((obj) => ({
    question: obj.question,
    answers: shuffleAnswers([...obj.incorrect_answers, obj.correct_answer]),
    correctAnswer: obj.correct_answer,
  }));

  const handleUserChoice = (e) => {
    console.log("e.target.dataset.answer: ", e.target.dataset.answer);
    if (quiz[questionNumber].correctAnswer === e.target.dataset.answer) {
      setPoints((points) => points + 1);
    }
  };

  const handleNextQuestion = () => {
    if (questionNumber + 1 === data.length) {
      setShowResults(true);
    } else {
      setQuestionNumber((questionNumber) => questionNumber + 1);
    }
  };

  const handleReset = () => {
    setReset(true);
  };
  if (reset) {
    return <TriviaGame />;
  }
  if (showResults) {
    return (
      <>
        <h1>{`You got ${points} out of ${data.length}`}</h1>;
        <button onClick={handleReset}>Try Again</button>
      </>
    );
  } else {
    return (
      <section>
        <h1>Quiz Page</h1>
        {data ? (
          <>
            <h1
              dangerouslySetInnerHTML={{
                __html: quiz[questionNumber].question,
              }}
            ></h1>
            {quiz[questionNumber].answers.map((answer) => (
              <AnswerButton
                key={answer}
                answer={answer}
                onClick={handleUserChoice}
              />
            ))}
            <p>Points: {`${points} / ${data.length}`}</p>
            <p>Progress: {`${questionNumber + 1} / ${data.length}`}</p>
            <button onClick={handleNextQuestion}>Next Question</button>
          </>
        ) : (
          <h1>Technical Error, try reloading the page</h1>
        )}
      </section>
    );
  }
};

export { QuizPage };
