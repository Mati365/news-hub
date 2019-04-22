import React from 'react';

import {useI18n} from '@i18n';

import Article from '@client/core/components/Article';
import {IdleRender} from '@utils/components';

import * as Sections from './Home/Sections';
import {
  PageFooter,
  PageHeader,
  PageContainer,
} from '../Parts';

import FAKE_ARTICLE from '../../mocks/articles';
import TitledSection from '../Parts/TitledSection';

const ArticleRoute = () => {
  const t = useI18n();

  return (
    <PageContainer>
      <PageHeader />

      <Article article={FAKE_ARTICLE[0]} />

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
