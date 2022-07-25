import { useState } from "react";
import { Arrow } from "./Arrow/Arrow";
import styles from "./LabeledSelect.module.css";

const LabeledSelect = ({ name, label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const getPlaceHolder = () => {
    if (name === "category") {
      const category = options.find((option) => option.id === Number(value));
      return category?.value || label;
    }
    return value || label;
  };

  return (
    <label className={styles.container} onClick={toggleSelect}>
      {getPlaceHolder()}
      <ul className={`${styles.optionContainer} ${isOpen ? styles.open : ""}`}>
        <li className={styles.option}>{label}</li>
        {options.map((option) => (
          <li className={styles.option} key={option.id || option.label}>
            {option.label}
          </li>
        ))}
      </ul>
    </label>
    // <label className={styles.container}>
    //   {getPlaceHolder()}
    //   <select
    //     className={styles.select}
    //     name={name}
    //     value={value}
    //     onChange={onChange}
    //   >
    //     <option value="" disabled>
    //       {label}
    //     </option>
    //     {options.map((option) => (
    //       <option
    //         key={option.id || option.label}
    //         value={option.id || option.value}
    //       >
    //         {option.label}
    //       </option>
    //     ))}
    //   </select>
    //   <Arrow />
    // </label>
  );
};

export { LabeledSelect };
