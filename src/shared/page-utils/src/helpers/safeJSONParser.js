const safeJSONParser = (str) => {
  if (!str)
    return null;

  try {
    return JSON.parse(str);
  } catch (e) {
    console.error(e);
  }

  return null;
};

export default safeJSONParser;
