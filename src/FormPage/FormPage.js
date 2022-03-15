import { useEffect, useState } from "react";
import { LabeledSelect } from "./LabeledSelect/LabeledSelect";
import { deduplicateOptions, getFilteredOptions, getOptions } from "../utils/utils";


const FormPage = ({ data }) => {
	const [categoryOptions, setCategoryOptions] = useState(null);
	const [difficultyOptions, setDifficultyOptions] = useState(null);
	const [value, setValue] = useState({
		category: "",
		difficulty: "",
	});

	useEffect(() => {
		const categoryOptions = deduplicateOptions(getOptions(data.results, "category"));
		const difficultyOptions = deduplicateOptions(
			getOptions(data.results, "difficulty")
		);
		setCategoryOptions(categoryOptions);
		setDifficultyOptions(difficultyOptions);
	}, [data]);

	// useEffect(() => {
	// 	if (value.difficulty) {
	// 		console.log("useEffect for DIFFICULTY");
	// 		const filteredDifficulty = data.results.filter(obj => obj.difficulty === value.difficulty);
	// 		const filteredCategoryOptions = deduplicateOptions(getOptions(filteredDifficulty, "category"));
	// 		/* const filteredCategoryOptions = getFilteredOptions(data.results, "difficulty", value.difficulty, "category");
	// 		console.log("useEffect for category: ", filteredCategoryOptions); */
	// 		setCategoryOptions(filteredCategoryOptions);
	// 	}
	// }, [value.difficulty, data.results]);
	// console.log("categoryOptions in state: ", categoryOptions);

	// useEffect(() => {
	// 	if (value.category) {
	// 		console.log("useEffect for CATEGORY");
	// 		const filteredCategory = data.results.filter(obj => obj.category === value.category);
	// 		const filteredDifficultyOptions = deduplicateOptions(getOptions(filteredCategory, "difficulty"));
	// 		setDifficultyOptions(filteredDifficultyOptions);
	// 	}
	// }, [value.category, data.results]);
	// console.log("difficultyOptions in state: ", difficultyOptions);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("i submit");
	};

	const handleSelect = (e) => {
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
					onChange={handleSelect}
					options={categoryOptions}
				/>
			)}
			{difficultyOptions && (
				<LabeledSelect
					name={"difficulty"}
					label={"Difficulty"}
					value={value.difficulty}
					onChange={handleSelect}
					options={difficultyOptions}
				/>
			)}
			<button>Create Quiz</button>
		</form>
	);
};

export { FormPage };

