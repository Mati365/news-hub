import React from 'react';

import {useI18n} from '@i18n';

import APIQuery from '@api-client/components/APIQuery';
import {loaderComponents} from '@client/core/components/LoaderAsyncTitles';

import {
  PageHeader,
  PageContainer,
} from '../Parts';

import * as Sections from './Sections';
import TitledSection from '../Parts/TitledSection';
import {
  ThreeArticlesCardsRow,
  ChunkedGrid,
} from './Sections/Shared';

const TagArticlesGrid = ({tagId}) => (
  <APIQuery
    path='/articles'
    urlParams={{
      'tags[]': [tagId],
      limit: 60,
    }}
    {...loaderComponents}
  >
    {({data: list}) => (
      <ChunkedGrid
        list={list}
        rowComponent={ThreeArticlesCardsRow}
        every={3}
      />
    )}
  </APIQuery>
);

const TagArticlesRoute = ({match}) => {
  const t = useI18n();

  return (
    <PageContainer>
      <PageHeader />

      <APIQuery
        path={`/tag/${match.params.id}`}
        {...loaderComponents}
      >
        {({data: tag}) => (
          <>
            <TitledSection
              title={
                t('website.sections.tag_articles.title', [`#${tag.name}`])
              }
            >
              <TagArticlesGrid tagId={tag.id} />
            </TitledSection>

            <Sections.SeeAlso />
          </>
        )}
      </APIQuery>
    </PageContainer>
  );
};

TagArticlesRoute.displayName = 'TagArticlesRoute';

export default TagArticlesRoute;
