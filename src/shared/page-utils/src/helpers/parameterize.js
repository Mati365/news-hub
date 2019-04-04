import * as R from 'ramda';
import isBlankValue from './isBlankValue';

const removeSpecialCharacters = R.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '');

const removeDiacritics = (() => {
  const LETTERS = [
    [/ą/g, 'a'], [/Ą/g, 'A'],
    [/ć/g, 'c'], [/Ć/g, 'C'],
    [/ę/g, 'e'], [/Ę/g, 'E'],
    [/ł/g, 'l'], [/Ł/g, 'L'],
    [/ń/g, 'n'], [/Ń/g, 'N'],
    [/ó/g, 'o'], [/Ó/g, 'O'],
    [/ś/g, 's'], [/Ś/g, 'S'],
    [/ż/g, 'z'], [/Ź/g, 'Z'],
    [/ź/g, 'z'], [/Ż/g, 'Z'],
  ];

  return (str) => {
    let unescaped = str;

    for (let i = LETTERS.length - 1; i >= 0; --i) {
      const template = LETTERS[i];
      unescaped = unescaped.replace(template[0], template[1]);
    }

    return unescaped;
  };
})();

const parameterize = separator => R.ifElse(
  isBlankValue,
  R.always(''),
  R.compose(
    R.replace(/\s/g, separator),
    R.toLower,
    removeDiacritics,
    removeSpecialCharacters,
    R.trim,
  ),
);

export default parameterize('-');
