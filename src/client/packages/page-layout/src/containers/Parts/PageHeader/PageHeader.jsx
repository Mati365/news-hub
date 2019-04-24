import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import {useI18n} from '@i18n';
import {useUA} from '@ua';
import styled from '@jss';

import APIQuery from '@api-client/components/APIQuery';
import {loaderComponents} from '@client/core/components/LoaderAsyncTitles';

import TagsList from '@client/core/components/Tags/TagsList';
import {HomeLink} from '@client/links';
import {WrappedUnorderedList} from '@utils/components/UnorderedList';
import {
  Margin,
  Header,
  Divider,
  Flex,
} from '@utils/components';

import SearchIconButton from './SearchIconButton';
import NavButtonToolbar from './NavButtonToolbar';

const HeaderTitle = styled(
  Header.H1,
  {
    fontWeight: 700,
    margin: 0,
  },
);

const PageHeader = ({divider}) => {
  const t = useI18n();
  const ua = useUA();

  const toolbar = [
    ua.mobile
      ? (
        <Margin
          key='buttons'
          top={3}
        >
          <NavButtonToolbar />
        </Margin>
      )
      : (
        <NavButtonToolbar key='buttons' />
      ),

    <SearchIconButton key='search' />,
  ];

  return (
    <header>
      <Margin
        top={4}
        block
      >
        <Flex
          align='center'
          direction={
            ua.mobile
              ? 'column'
              : 'row'
          }
        >
          <span>
            <HomeLink>
              <HeaderTitle>
                {t('website.info.name')}
              </HeaderTitle>
            </HomeLink>

            <Margin top={2}>
              <APIQuery
                path='/tags/popular-tags'
                urlParams={{
                  limit: 7,
                }}
                {...loaderComponents}
              >
                {({data: tags}) => (
                  <TagsList
                    tags={
                      R.pluck('tag', tags)
                    }
                  />
                )}
              </APIQuery>
            </Margin>
          </span>

          {(
            ua.desktop
              ? (
                <WrappedUnorderedList
                  inline
                  flex
                  style={{
                    marginLeft: 'auto',
                  }}
                >
                  {toolbar}
                </WrappedUnorderedList>
              )
              : (
                <WrappedUnorderedList inline={false}>
                  {toolbar}
                </WrappedUnorderedList>
              )
          )}
        </Flex>
      </Margin>

      {divider && (
        <Divider spacing='big' />
      )}
    </header>
  );
};

PageHeader.displayName = 'PageHeader';

PageHeader.propTypes = {
  divider: PropTypes.bool,
};

PageHeader.defaultProps = {
  divider: true,
};

export default React.memo(PageHeader);
