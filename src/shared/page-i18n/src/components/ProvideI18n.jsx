import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import createLangPack from '../utils/createLangPack';

export const I18nContext = React.createContext(null);

const ProvideI18n = ({children, pack, lang}) => {
  const translator = useMemo(
    () => createLangPack(pack).createTranslator(lang),
    [pack],
  );

  return (
    <I18nContext.Provider value={translator}>
      {children}
    </I18nContext.Provider>
  );
};

ProvideI18n.displayName = 'ProvideI18n';

ProvideI18n.propTypes = {
  pack: PropTypes.objectOf(PropTypes.any),
  lang: PropTypes.string,
};

ProvideI18n.defaultProps = {
  pack: {},
  lang: 'en',
};

export default ProvideI18n;
