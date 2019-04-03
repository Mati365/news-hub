import * as R from 'ramda';

import format from '../../helpers/format';

const generateNthStyles = (classNameFormat, count, fn) => {
  const styles = {};

  for (let i = count - 1; i >= 0; --i)
    styles[format(classNameFormat, [i + 1])] = fn(i);

  return styles;
};

export default R.curry(generateNthStyles);
