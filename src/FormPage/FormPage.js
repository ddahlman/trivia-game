import { useEffect, useState } from "react";
import { LabeledSelect } from "./LabeledSelect/LabeledSelect";
import { deduplicateOptions, getOptions } from "../utils/utils";
import { QuizPage } from "../QuizPage/QuizPage";
import { useFetch } from "../customHooks/useFetch";
import styles from "./FormPage.module.css";

const FormPage = () => {
  // const [questionList, setQuestionList] = useState(null);
  const [doStartQuiz, setDoStartQuiz] = useState(false);
  const [categoryList, setCategoryList] = useState(null);
  const [value, setValue] = useState({
    category: "",
    difficulty: "",
  });
  const [validationText, setValidationText] = useState("");
  const [categories, fetchCategories] = useFetch(
    "https://opentdb.com/api_category.php"
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.data?.trivia_categories) {
      /** make categories work for LabeledSelect.
       destructuring name key from object and renaming it to label, destructuring ...rest.
       @return object with label, value and the rest.*/

      const categoriesForSelection = categories.data.trivia_categories.map(
        ({ name: label, ...rest }) => {
          return { ...{}, label, value: label, ...rest };
        }
      );
      setCategoryList(categoriesForSelection);
    }
  }, [categories.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("i submit");
    setDoStartQuiz(true);
  };

  // useEffect(() => {
  //   if (value.category && value.difficulty) {
  //     const matchedOptions = data.filter((obj) => {
  //       return (
  //         obj.category === value.category && obj.difficulty === value.difficulty
  //       );
  //     });
  //     console.log("matchedOptions: ", matchedOptions);
  //     const nr = matchedOptions.length;
  //     const text = `There ${nr === 1 ? "is" : "are"} ${nr} question${
  //       nr === 1 ? "" : "s"
  //     } that matches your criteria`;
  //     setValidationText(text);
  //     setQuestionList(matchedOptions);
  //   }
  // }, [value.category, value.difficulty]);

  const handleSelect = (e) => {
    setValue((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTryAgain = () => {
    setDoStartQuiz(false);
    //setQuestionList(null);
    setValidationText("");
  };

  // if (doStartQuiz) {
  //   return questionList.length > 0 ? (
  //     <QuizPage data={questionList} />
  //   ) : (
  //     <>
  //       <h1>Sorry there are no questions that matches your criteria...</h1>
  //       <button onClick={handleTryAgain}>Try Again</button>
  //     </>
  //   );
  // } else {
  //https://opentdb.com/api_category.php
  // console.log("categories: ", categories);
  return (
    <>
      {categories.isLoading && (
        <span className={styles.loading}>Loading...</span>
      )}
      {categoryList && (
        <form onSubmit={handleSubmit}>
          <h1>Custumize Page</h1>
          <LabeledSelect
            name={"category"}
            label={"Category"}
            value={value.category}
            onChange={handleSelect}
            options={categoryList}
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
      )}
    </>
  );
  // }
};

export { FormPage };
