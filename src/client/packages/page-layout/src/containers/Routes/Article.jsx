import React from 'react';

import {useI18n} from '@i18n';

import APIQuery from '@api-client/components/APIQuery';
import Article from '@client/core/components/Article';
import {IdleRender} from '@utils/components';

import {loaderComponents} from '@client/core/components/LoaderAsyncTitles';

import * as Sections from './Home/Sections';
import {
  PageFooter,
  PageHeader,
  PageContainer,
} from '../Parts';

import TitledSection from '../Parts/TitledSection';

const ArticleRoute = ({match}) => {
  const t = useI18n();

  return (
    <PageContainer>
      <PageHeader />

      <APIQuery
        path={`article/${match.params.id}`}
        {...loaderComponents}
      >
        {({data: article}) => (
          <Article article={article} />
        )}
      </APIQuery>

      <TitledSection title={t('website.titles.see_also')}>
        <IdleRender>
          <Sections.Primary />
        </IdleRender>

        <IdleRender>
          <Sections.Popular />
          <Sections.Tags />
          <PageFooter />
        </IdleRender>
      </TitledSection>
    </PageContainer>
  );
};

ArticleRoute.displayName = 'ArticleRoute';

export default ArticleRoute;
