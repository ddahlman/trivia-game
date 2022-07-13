import styles from "./LabeledSelect.module.css";

const LabeledSelect = ({ name, label, value, onChange, options }) => {
  return (
    <label className={styles.label}>
      {label}
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
    </label>
  );
};

export { LabeledSelect };
