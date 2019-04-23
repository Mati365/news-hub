import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import {useI18n} from '@i18n';
import styled from '@jss';

import APIQuery from '@api-client/components/APIQuery';
import {loaderComponents} from '@client/core/components/LoaderAsyncTitles';

import TagsList from '@client/core/components/Tags/TagsList';
import Button from '@client/core/components/Controls/Button';
import SearchIcon from '@icons/SearchIcon';

import {
  CreateArticleLink,
  HomeLink,
} from '@client/links';

import {
  Margin,
  Header,
  Divider,
  Flex,
  Text,
} from '@utils/components';

const HeaderTitle = styled(
  Header.H1,
  {
    fontWeight: 700,
    margin: 0,
  },
);

const CreateArticleButton = () => {
  const t = useI18n();

  return (
    <CreateArticleLink>
      <Button>
        {t('website.buttons.create_article')}
      </Button>
    </CreateArticleLink>
  );
};

const ReportCrimeButton = (props) => {
  const t = useI18n();

  return (
    <Button
      color='danger'
      {...props}
    >
      {t('website.buttons.report_hate_crime')}
    </Button>
  );
};

const SearchIconButton = () => {
  const t = useI18n();

  return (
    <Margin
      left={6}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <Margin right={2}>
        <SearchIcon size='tiny' />
      </Margin>

      <Text uppercase>
        {t('website.titles.search')}
      </Text>
    </Margin>
  );
};

const PageHeader = ({divider}) => {
  const t = useI18n();

  return (
    <header>
      <Margin
        top={4}
        block
      >
        <Flex
          direction='row'
          align='center'
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

          <Margin left='auto'>
            <CreateArticleButton />
            <ReportCrimeButton style={{margin: '0 10px'}} />
            <SearchIconButton />
          </Margin>
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
