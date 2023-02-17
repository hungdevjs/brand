const removeHtml = (htmlString) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.innerText;
};

export default removeHtml;
