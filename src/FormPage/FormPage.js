import { useEffect, useState } from "react";
import { LabeledSelect } from "./LabeledSelect/LabeledSelect";
import { QuizPage } from "../QuizPage/QuizPage";
import { useFetch } from "../customHooks/useFetch";
import styles from "./FormPage.module.css";

const FormPage = ({ onReset }) => {
  const [categoryList, setCategoryList] = useState(null);
  const [value, setValue] = useState({
    category: "",
    difficulty: "",
    amountOfQuestions: "",
  });
  const [validationText, setValidationText] = useState("");
  const [categories, fetchCategories] = useFetch(
    "https://opentdb.com/api_category.php"
  );
  const [quiz, fetchQuiz] = useFetch(
    `https://opentdb.com/api.php?amount=${value.amountOfQuestions}&category=${value.category}&difficulty=${value.difficulty}`
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
    fetchQuiz();
    //setDoStartQuiz(true);
  };

  // useEffect(() => {
  //   if (value.category && value.difficulty) {
  //     const matchedOptions = data.filter((obj) => {
  //       return (
  //         obj.category === value.category && obj.difficulty === value.difficulty
  //       );
  //     });
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

  console.log("quiz.data: ", quiz.data);

  if (quiz.data?.results) {
    return <QuizPage quizData={quiz.data.results} onReset={onReset} />;
  } else {
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
            <LabeledSelect
              name={"amountOfQuestions"}
              label={"Amount Of Questions"}
              value={value.amountOfQuestions}
              onChange={handleSelect}
              options={[
                { label: "10", value: "10" },
                { label: "20", value: "20" },
                { label: "30", value: "30" },
              ]}
            />
            <section>{validationText && <h2>{validationText}</h2>}</section>
            <button>Create Quiz</button>
          </form>
        )}
      </>
    );
  }
};

export { FormPage };
