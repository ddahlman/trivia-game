import { decodeHTMLEntities } from "../../utils/utils";
import styles from "./AnswerRadioButton.module.css";

const AnswerRadioButton = ({ answer, disabled }) => {
  return (
    <label className={styles.radioLabel}>
      <input
        className={styles.radio}
        type="radio"
        value={decodeHTMLEntities(answer)}
        name="answer"
        disabled={disabled}
      />
      {decodeHTMLEntities(answer)}
    </label>
  );
};

export { AnswerRadioButton };
