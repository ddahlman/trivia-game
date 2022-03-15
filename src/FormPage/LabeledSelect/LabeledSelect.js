const LabeledSelect = ({ name, label, value, onChange, options }) => {
  return (
    <label>
      {label}
      <select name={name} value={value} onChange={onChange}>
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export { LabeledSelect };
