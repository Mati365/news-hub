import React from 'react';

import {IdleRender} from '@utils/components';

import * as Sections from './Sections';
import {
  PageFooter,
  PageHeader,
  PageContainer,
} from '../../Parts';

const HomeRoute = () => (
  <PageContainer>
    <PageHeader />
    <Sections.Primary />

    <IdleRender>
      <Sections.Popular />
      <Sections.Tags />
      <PageFooter />
    </IdleRender>
  </PageContainer>
);

HomeRoute.displayName = 'HomeRoute';

export default HomeRoute;
