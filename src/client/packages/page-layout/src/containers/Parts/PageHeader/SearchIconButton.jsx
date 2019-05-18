import React from 'react';

import styled from '@jss';
import createBreakpoints from '@utils/styles/createBreakpoints';

import {useI18n} from '@i18n';
import {useUA} from '@ua';

import SearchIcon from '@icons/SearchIcon';
import {ArticleLink} from '@client/links';
import {Margin} from '@utils/components';
import {AutocompleteList} from '@client/controls/Autocomplete';
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
  },
);

const SearchInput = styled(
  Input,
  {
    base: {
      display: 'block',
      width: 200,
      transition: 'width ease-in-out 250ms',
    },
    active: {
      ...createBreakpoints(
        {
          md: {
            width: 300,
          },
        },
      ),

      '&:not(:only-child)': {
        borderBottomColor: 'transparent !important',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
  },
  {
    index: 4,
    omitProps: ['active'],
    classSelector: (classes, {active}) => active && classes.active,
  },
);

const SearchIconButton = () => {
  const t = useI18n();
  const ua = useUA();

  const inputRenderFn = ({
    listeners, value,
    active, data, loading,
  }) => (
    <SearchButtonHolder
      {...(
        ua.mobile
          ? {top: 2}
          : {left: 6}
      )}
      onClick={listeners.onFocus}
    >
      <Margin right={2}>
        <SearchIcon size='tiny' />
      </Margin>

      <div style={{position: 'relative'}}>
        <SearchInput
          small
          placeholder={
            t('website.titles.search')
          }
          type='text'
          {...listeners}
          active={active}
          value={value?.name || ''}
        />

        {active && value?.name?.length >= 3 && (
          <AutocompleteList
            loading={loading}
            list={data?.articles || []}
            itemRenderFn={
              article => (
                <ArticleLink article={article}>
                  {article.title}
                </ArticleLink>
              )
            }
          />
        )}
      </div>
    </SearchButtonHolder>
  );

  return (
    <Autocomplete
      inputRenderFn={inputRenderFn}
      resolverParams={{
        queryPath: '/search',
      }}
    />
  );
};

SearchIconButton.displayName = 'SearchIconButton';

export default SearchIconButton;
