import { useEffect, useState } from "react";
import { LabeledSelect } from "./LabeledSelect/LabeledSelect";
import { deduplicateOptions, getOptions } from "../utils/utils";
import { InputRange } from "./InputRange/InputRange";

const FormPage = ({ data }) => {
  const [questionList, setQuestionList] = useState(null);
  const [nrOfQuestions, setNrOfQuestions] = useState(0);
  const [value, setValue] = useState({
    category: "",
    difficulty: "",
  });
  const [validationText, setValidationText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("i submit");
  };

  const handleRange = (e) => {
    setValidationText("");
    setNrOfQuestions(e.target.value);
  };

  useEffect(() => {
    if (value.category && value.difficulty) {
      const matchedOptions = data.results.filter((obj) => {
        return (
          obj.category === value.category && obj.difficulty === value.difficulty
        );
      });
      console.log("matchedOptions: ", matchedOptions);
      const nr = matchedOptions.length;
      const text = `There ${nr === 1 ? "is" : "are"} ${nr} question${
        nr === 1 ? "" : "s"
      } that matches your criteria`;
      setValidationText(text);
    }
  }, [value.category, value.difficulty]);

  const handleSelect = (e) => {
    setValue((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputRange value={nrOfQuestions} onChange={handleRange} />
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
        options={[
          { label: "easy", value: "easy" },
          { label: "medium", value: "medium" },
          { label: "hard", value: "hard" },
        ]}
      />
      <section>{validationText && <h2>{validationText}</h2>}</section>
      <button>Create Quiz</button>
    </form>
  );
};

export { FormPage };
