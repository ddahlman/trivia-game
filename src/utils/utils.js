const deduplicateOptions = (arr) => {
  try {
    return arr.reduce((filteredOptions, option) => {
      if (!filteredOptions.some((obj) => obj.label === option.label)) {
        filteredOptions = [...filteredOptions, option];
      }
      return filteredOptions;
    }, []);
  } catch (error) {
    console.error(
      `An Error occurred in deduplicateOptions() in utils: ${error}`
    );
  }
};

const getOptions = (arr, prop) => {
  try {
    return arr.map((option) => ({
      label: option[prop],
      value: option[prop],
    }));
  } catch (error) {
    console.error(`An Error occurred in getOptions() in utils: ${error}`);
  }
};

const decodeHTMLEntities = (text) => {
  var textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

export { deduplicateOptions, getOptions, decodeHTMLEntities };
