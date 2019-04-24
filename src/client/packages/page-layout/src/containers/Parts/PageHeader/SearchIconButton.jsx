import React from 'react';

import styled from '@jss';

import {useI18n} from '@i18n';
import {useUA} from '@ua';

import SearchIcon from '@icons/SearchIcon';
import {
  Margin,
  Text,
} from '@utils/components';

const SearchButtonHolder = styled(
  Margin,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
);

const SearchIconButton = () => {
  const t = useI18n();
  const ua = useUA();

  return (
    <SearchButtonHolder
      {...(
        ua.mobile
          ? {top: 2}
          : {left: 6}
      )}
    >
      <Margin right={2}>
        <SearchIcon size='tiny' />
      </Margin>

      <Text uppercase>
        {t('website.titles.search')}
      </Text>
    </SearchButtonHolder>
  );
};

SearchIconButton.displayName = 'SearchIconButton';

export default SearchIconButton;
