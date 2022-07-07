import { decodeHTMLEntities } from "../../utils/utils";
import styles from "./AnswerButton.module.css";

const AnswerButton = ({ answer, onClick, disabled }) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      data-answer={answer}
      onClick={onClick}
    >
      {decodeHTMLEntities(answer)}
    </button>
  );
};

export { AnswerButton };
