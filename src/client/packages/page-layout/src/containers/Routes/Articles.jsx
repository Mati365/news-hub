import React from 'react';

import {IdleRender} from '@utils/components';

import * as Sections from './Sections';
import SeeAlsoSection from './Sections/SeeAlsoSection';
import {
  PageHeader,
  PageContainer,
} from '../Parts';

const ArticlesRoute = () => (
  <PageContainer>
    <PageHeader />

    <IdleRender>
      <Sections.Popular limit={60} />
      <SeeAlsoSection />
    </IdleRender>
  </PageContainer>
);

ArticlesRoute.displayName = 'ArticlesRoute';

export default ArticlesRoute;
