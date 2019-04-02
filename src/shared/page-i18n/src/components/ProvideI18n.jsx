import React, {useMemoize} from 'react';
import PropTypes from 'prop-types';

import createLangPack from '../utils/createLangPack';

export const I18nContext = React.createContext(null);

const ProvideI18n = ({children, translations, lang}) => {
  const translator = useMemoize(
    () => createLangPack(translations).createTranslator(lang),
    [translations],
  );

  return (
    <I18nContext.Provide value={translator}>
      {children}
    </I18nContext.Provide>
  );
};

ProvideI18n.displayName = 'ProvideI18n';

ProvideI18n.propTypes = {
  translations: PropTypes.objectOf(PropTypes.any),
  lang: PropTypes.string,
};

ProvideI18n.defaultProps = {
  translations: {},
  lang: 'en',
};

export default ProvideI18n;
