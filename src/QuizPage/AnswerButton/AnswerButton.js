import styles from "./AnswerButton.module.css";

const AnswerButton = ({ answer, onClick, disabled }) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      data-answer={answer}
      onClick={onClick}
      dangerouslySetInnerHTML={{
        __html: answer,
      }}
    ></button>
  );
};

export { AnswerButton };
