import {useContext} from 'react';

import {I18nContext} from '../components/ProvideI18n';

const useI18n = () => useContext(I18nContext);

export default useI18n;
