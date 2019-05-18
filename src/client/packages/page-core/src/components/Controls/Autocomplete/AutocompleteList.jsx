import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import {useI18n} from '@i18n';

import {
  WHITE,
  LIGHT_GRAY,
} from '@constants/colorSchema';

import styled from '@jss';
import {UnorderedList} from '@utils/components';

const AutocompleteListHolder = styled(
  UnorderedList,
  {
    position: 'absolute',
    left: 0,
    width: '100%',
    padding: [4, 8],
    background: WHITE,
    border: `1px solid ${LIGHT_GRAY}`,
    borderTopColor: 'rgba(226, 226, 226, 0.25)',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 999,

    '& > li': {
      display: 'inline-block',
      margin: [5, 0, 0],
      paddingBottom: 5,

      '&:not(:last-child)': {
        borderBottom: '1px solid rgba(226, 226, 226, 0.25)',
      },
    },
  },
  {
    inline: false,
  },
);

const AutocompleteList = ({list, loading, itemRenderFn}) => {
  const t = useI18n();

  let content = null;

  if (loading) {
    content = (
      <li>
        {t('website.titles.loading_results')}
      </li>
    );
  } else if (R.isEmpty(list)) {
    content = (
      <li>
        {t('website.titles.empty_results')}
      </li>
    );
  } else {
    content = R.map(
      item => (
        <li key={item.id}>
          {itemRenderFn(item)}
        </li>
      ),
      list,
    );
  }

  return (
    <AutocompleteListHolder>
      {content}
    </AutocompleteListHolder>
  );
};

AutocompleteList.displayName = 'AutocompleteList';

AutocompleteList.propTypes = {
  itemRenderFn: PropTypes.func,
  loading: PropTypes.bool,
};

AutocompleteList.defaultProps = {
  itemRenderFn: R.prop('name'),
  loading: false,
};

export default AutocompleteList;
