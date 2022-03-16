const AnswerButton = ({ answer, onClick, disabled }) => {
  return (
    <button disabled={disabled} data-answer={answer} onClick={onClick}>
      {answer}
    </button>
  );
};

export { AnswerButton };
