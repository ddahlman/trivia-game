const deduplicateOptions = (arr) =>
	arr.reduce((filteredOptions, option) => {
		if (!filteredOptions.some((obj) => obj.label === option.label)) {
			filteredOptions = [...filteredOptions, option];
		}
		return filteredOptions;
	}, []);

const getOptions = (arr, prop) => {
	return arr.map((option) => ({
		label: option[prop],
		value: option[prop],
	}));
};

const getFilteredOptions = (arr, optionToCompare, compareValue, optionValueToSet) => {
	const filtered = arr.filter(obj => obj[optionToCompare] === compareValue);
	return deduplicateOptions(getOptions(filtered, optionValueToSet));
}

export { deduplicateOptions, getOptions, getFilteredOptions }