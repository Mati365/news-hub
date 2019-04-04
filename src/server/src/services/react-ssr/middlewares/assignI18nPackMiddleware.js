const assignI18nPackMiddleware = pack => (req, res, next) => {
  res.locals.i18n = {
    lang: req.acceptsLanguages('pl', 'en') || 'eng',
    pack,
  };

  next();
};

export default assignI18nPackMiddleware(
  __non_webpack_require__('../config/i18n'), // eslint-disable-line
);
