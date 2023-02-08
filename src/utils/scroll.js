const scroll = (selector) => {
  const a = document.createElement('a');
  a.href = selector;
  a.click();
};

export default scroll;
