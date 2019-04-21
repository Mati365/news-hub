import React from 'react';

import {APIQuery} from '@api-client/components';
import {
  Container,
  IdleRender,
} from '@utils/components';

import * as Sections from './Sections';
import {
  PageFooter,
  PageHeader,
} from '../../Parts';

const HomeRoute = () => (
  <Container>
    <PageHeader />
    <Sections.Primary />

    <APIQuery path='articles'>
      {() => (
        <div>AA</div>
      )}
    </APIQuery>

    <IdleRender>
      <Sections.Popular />
      <Sections.Tags />
      <PageFooter />
    </IdleRender>
  </Container>
);

HomeRoute.displayName = 'HomeRoute';

export default HomeRoute;
