import React from 'react';

import {useI18n} from '@i18n';

import Article from '@client/core/components/Article';
import {
  IdleRender,
  Container,
} from '@utils/components';

import * as Sections from './Home/Sections';
import {
  PageFooter,
  PageHeader,
} from '../Parts';

import FAKE_ARTICLE from '../../mocks/articles';
import TitledSection from '../Parts/TitledSection';

const ArticleRoute = () => {
  const t = useI18n();

  return (
    <Container>
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
    </Container>
  );
};

ArticleRoute.displayName = 'ArticleRoute';

export default ArticleRoute;
