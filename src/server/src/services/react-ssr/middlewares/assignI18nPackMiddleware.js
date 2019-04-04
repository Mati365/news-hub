import * as R from 'ramda';

const assignI18nPackMiddleware = (pack) => {
  const defaultLang = R.keys(pack)[0];

  return (req, res, next) => {
    res.locals.i18n = {
      lang: req.acceptsLanguages('pl', 'en') || defaultLang,
      pack,
    };

    next();
  };
};

export default assignI18nPackMiddleware(
  __non_webpack_require__('../config/i18n'), // eslint-disable-line
);
