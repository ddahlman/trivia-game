const decodeHTMLEntities = (text) => {
  var textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

export { decodeHTMLEntities };
