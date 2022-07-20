import { Arrow } from "./Arrow/Arrow";
import styles from "./LabeledSelect.module.css";

const LabeledSelect = ({ name, label, value, onChange, options }) => {
  const getPlaceHolder = () => {
    if (name === "category") {
      const category = options.find((option) => option.id === Number(value));
      return category?.value || label;
    }
    return value || label;
  };

  return (
    <div className={styles.selectContainer}>
      {getPlaceHolder()}
      <select
        className={styles.select}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option
            key={option.id || option.label}
            value={option.id || option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <Arrow />
    </div>
  );
};

export { LabeledSelect };
