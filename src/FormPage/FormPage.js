import { useEffect, useState } from "react";
import { LabeledSelect } from "./LabeledSelect/LabeledSelect";
import { QuizPage } from "../QuizPage/QuizPage";
import { useFetch } from "../customHooks/useFetch";
import styles from "./FormPage.module.css";
import { Loading } from "../Loading/Loading";
import { Button } from "../Button/Button";

const FormPage = ({ onReset }) => {
  const [categoryList, setCategoryList] = useState(null);
  const [value, setValue] = useState({
    category: "",
    difficulty: "",
    amountOfQuestions: "",
  });
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
    fetchQuiz();
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    setValue((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    onReset();
  };

  if (quiz.data?.results) {
    return <QuizPage quizData={quiz.data.results} onReset={onReset} />;
  } else {
    return (
      <>
        {categories.isLoading && (
          <div className={styles.loadingContainer}>
            <Loading />
          </div>
        )}
        {categoryList && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Customize Game</h2>
            <LabeledSelect
              name={"category"}
              label={"Category"}
              value={value.category}
              onChange={handleSelect}
              options={categoryList}
            />
            {/* <LabeledSelect
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
            /> */}
            <div className={styles.buttonContainer}>
              <Button
                onClick={handleReset}
                text="Back To Start"
                secondaryType={true}
              />
              <Button onClick={() => null} text="Create Quiz" />
            </div>
          </form>
        )}
      </>
    );
  }
};

export { FormPage };
