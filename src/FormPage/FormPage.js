import { useEffect, useState } from "react";
import { LabeledSelect } from "./LabeledSelect/LabeledSelect";

const deduplicateOptions = (arr) =>
  arr.reduce((filteredOptions, option) => {
    if (!filteredOptions.some((obj) => obj.label === option.label)) {
      filteredOptions = [...filteredOptions, option];
    }
    return filteredOptions;
  }, []);

const getOptions = (data, prop) => {
  return data.results.map((option) => ({
    label: option[prop],
    value: option[prop],
  }));
};

const FormPage = ({ data }) => {
  const [categoryOptions, setCategoryOptions] = useState(null);
  const [difficultyOptions, setDifficultyOptions] = useState(null);
  const [value, setValue] = useState({
    category: "",
    difficulty: "",
  });

  useEffect(() => {
    const categoryOptions = deduplicateOptions(getOptions(data, "category"));
    const difficultyOptions = deduplicateOptions(
      getOptions(data, "difficulty")
    );
    setCategoryOptions(categoryOptions);
    setDifficultyOptions(difficultyOptions);
  }, [data]);

  useEffect(() => {
    console.log("useEffect for category");
  }, [value.category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("i submit");
  };

  const handleChange = (e) => {
    setValue((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {categoryOptions && (
        <LabeledSelect
          name={"category"}
          label={"Category"}
          value={value.category}
          onChange={handleChange}
          options={categoryOptions}
        />
      )}
      {difficultyOptions && (
        <LabeledSelect
          name={"difficulty"}
          label={"Difficulty"}
          value={value.difficulty}
          onChange={handleChange}
          options={difficultyOptions}
        />
      )}
      <button>Create Quiz</button>
    </form>
  );
};

export { FormPage };
