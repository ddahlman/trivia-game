import styles from "./Button.module.css";

const Button = ({
  secondaryType = false,
  onClick,
  text,
  pageGridLayout = null,
}) => {
  const BUTTON_TYPE_STYLE = secondaryType
    ? `${styles.button} ${styles.secondary}`
    : `${styles.button} ${styles.primary}`;
  return (
    <button
      className={`${BUTTON_TYPE_STYLE}${
        pageGridLayout ? ` ${styles[pageGridLayout]}` : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { Button };
