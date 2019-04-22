const suppressEvent = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

export default suppressEvent;
