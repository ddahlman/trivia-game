import styles from "./Button.module.css";

const Button = ({ secondaryType = false, onClick, text }) => {
  const BUTTON_TYPE_STYLE = secondaryType
    ? `${styles.button} ${styles.secondary}`
    : `${styles.button} ${styles.primary}`;

  return (
    <button className={`${BUTTON_TYPE_STYLE}`} onClick={onClick}>
      {text}
    </button>
  );
};

export { Button };
