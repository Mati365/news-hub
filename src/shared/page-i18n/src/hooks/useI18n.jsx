import {useContext} from 'react';

import {I18nContext} from '../components/ProvideI18n';

const useI18n = (scope) => {
  const translator = useContext(I18nContext);
  if (!scope)
    return translator;

  return (path, params) => (
    translator(`${scope}.${path}`, params) || translator(path, params)
  );
};

export default useI18n;
