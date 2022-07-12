import styles from "./PrimaryButton.module.css";

const PrimaryButton = ({ onClick, text, pageLayout = null }) => {
  return (
    <button
      className={`${styles.primaryButton}${
        pageLayout ? ` ${styles[pageLayout]}` : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { PrimaryButton };
