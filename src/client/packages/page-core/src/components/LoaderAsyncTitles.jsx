import React from 'react';

import {useI18n} from '@i18n';
import {Flex} from '@utils/components';

export const LoadingRow = () => {
  const t = useI18n();

  return (
    <Flex
      centered
      expanded
    >
      {t('website.titles.loading')}
    </Flex>
  );
};

export const ErrorRow = () => {
  const t = useI18n();

  return (
    <Flex
      centered
      expanded
    >
      {t('website.titles.error')}
    </Flex>
  );
};

export const loaderComponents = {
  errorComponent: ErrorRow,
  loadingComponent: LoadingRow,
};
