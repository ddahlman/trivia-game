const InputRange = ({ value, onChange }) => {
  return (
    <label htmlFor="range">
      How many questions do you wish for?
      <input
        value={value}
        onChange={onChange}
        min="1"
        max="30"
        name="range"
        type="range"
      />
      <span>{value}</span>
    </label>
  );
};

export { InputRange };
