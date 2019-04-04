import * as R from 'ramda';

import format from '@page/utils/src/helpers/format';

const stringLens = R.compose(
  R.lensPath,
  R.split('.'),
);

export const createLangCache = () => ({
  lenses: {},
  resolvedKeys: {},
});

/**
 * Creates pack that returns translator factory
 *
 * @param {Object} pack
 *
 * @returns {Translator}
 */
const createLangPack = (pack) => {
  const {
    resolvedKeys,
    lenses,
  } = createLangCache();

  return {
    pack,

    // translator behaves as same as format()
    createTranslator: (lang) => {
      // try to load fallback if current language is not present
      let {[lang]: langPack} = pack;
      if (!langPack)
        langPack = pack.eng;

      if (!langPack)
        throw new Error('Cannot find lang!');

      return (path, params) => {
        let templateStr = resolvedKeys[path];

        // if no params - we can cache it!
        if (!params && templateStr)
          return templateStr;

        // lookup for lens in cache
        let lens = lenses[path];
        if (!lens) {
          lens = stringLens(path);
          lenses[path] = lens;
        }

        // cache template
        templateStr = R.view(lens, langPack);
        if (templateStr !== undefined)
          resolvedKeys[templateStr] = templateStr;
        else
          templateStr = '';

        if (!params)
          return templateStr;

        return format(templateStr, params);
      };
    },
  };
};

export default createLangPack;
