import { useState } from "react";
import { LabeledSelect } from "./LabeledSelect/LabeledSelect";
import { deduplicateOptions, getOptions } from "../utils/utils";
import { InputRange } from "./InputRange/InputRange";

const FormPage = ({ data }) => {
  const [doStartQuiz, setDoStartQuiz] = useState(false);
  const [rangeValue, setRangeValue] = useState(1);
  const [value, setValue] = useState({
    category: "",
    difficulty: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("i submit");
  };

  const handleRange = (e) => {
    setRangeValue(e.target.value);
  };

  const handleSelect = (e) => {
    setValue((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputRange value={rangeValue} onChange={handleRange} />
      <LabeledSelect
        name={"category"}
        label={"Category"}
        value={value.category}
        onChange={handleSelect}
        options={deduplicateOptions(getOptions(data?.results, "category"))}
      />
      <LabeledSelect
        name={"difficulty"}
        label={"Difficulty"}
        value={value.difficulty}
        onChange={handleSelect}
        options={deduplicateOptions(getOptions(data?.results, "difficulty"))}
      />
      <button>Create Quiz</button>
    </form>
  );
};

export { FormPage };
