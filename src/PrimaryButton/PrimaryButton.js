import styles from "./PrimaryButton.module.css";

const PrimaryButton = ({ onClick, text, pageGridLayout = null }) => {
  return (
    <button
      className={`${styles.primaryButton}${
        pageGridLayout ? ` ${styles[pageGridLayout]}` : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { PrimaryButton };
