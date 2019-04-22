import React from 'react';

import {useI18n} from '@i18n';
import {Flex} from '@utils/components';

export const CrawlerLoading = () => {
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

export const CrawlerError = () => {
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
