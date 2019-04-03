const fastCompareArrays = (a, b) => {
  if (!a || !b || a.length !== b.length)
    return false;

  for (let i = a.length - 1; i >= 0; --i)
    if (a[i] !== b[i])
      return false;

  return true;
};

export default fastCompareArrays;
