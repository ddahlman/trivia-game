import { useEffect, useState } from "react";
import { FormPage } from "../FormPage/FormPage";
import styles from "./TriviaGame.module.css";

const TriviaGame = () => {
	const [triviaResponse, setTriviaResponse] = useState(null);

	useEffect(() => {
		try {
			const fetchTriviaGame = async () => {
				const triviaResponse = await fetch(
					"https://opentdb.com/api.php?amount=30"
				);
				const triviaJSON = await triviaResponse.json();
				console.log(triviaJSON);
				setTriviaResponse(triviaJSON);
			};
			fetchTriviaGame();
		} catch (error) {
			console.error(
				`An error occurred in first useEffect call in fetch: ${error}`
			);
		}
	}, []);

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1>trivia game</h1>
			</header>
			{triviaResponse && <FormPage data={triviaResponse} />}
		</div>
	);
};

export default TriviaGame;
