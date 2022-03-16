const AnswerButton = ({ answer, onClick }) => {
  return (
    <button data-answer={answer} onClick={onClick}>
      {answer}
    </button>
  );
};

export { AnswerButton };
