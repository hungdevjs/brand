const removeHtml = (htmlString) => {
  try {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.innerText;
  } catch (err) {
    console.error(err);
    return '';
  }
};

export default removeHtml;
