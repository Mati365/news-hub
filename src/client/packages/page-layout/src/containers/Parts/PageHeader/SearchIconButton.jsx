import React from 'react';

import styled from '@jss';

import {useI18n} from '@i18n';
import {useUA} from '@ua';

import SearchIcon from '@icons/SearchIcon';
import {Margin} from '@utils/components';
import {
  Input,
  Autocomplete,
} from '@client/controls';

const SearchButtonHolder = styled(
  Margin,
  {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    cursor: 'pointer',
  },
);

const SearchIconButton = () => {
  const t = useI18n();
  const ua = useUA();

  return (
    <Autocomplete
      inputRenderFn={({onFocus, onBlur, l}) => (
        <SearchButtonHolder
          {...(
            ua.mobile
              ? {top: 2}
              : {left: 6}
          )}
          onClick={onFocus}
        >
          <Margin right={2}>
            <SearchIcon size='tiny' />
          </Margin>

          <Input
            small
            placeholder={
              t('website.titles.search')
            }
            type='text'
            onFocus={onFocus}
            onBlur={onBlur}
            {...l.input()}
          />
        </SearchButtonHolder>
      )}
    />
  );
};

SearchIconButton.displayName = 'SearchIconButton';

export default SearchIconButton;
