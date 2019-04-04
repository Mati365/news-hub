import React from 'react';

import {Container} from '@utils/components';

import PageHeader from '../../Parts/PageHeader';
import * as Sections from './Sections';

const HomeRoute = () => (
  <Container>
    <PageHeader />

    <Sections.Primary />
    <Sections.Popular />
  </Container>
);

HomeRoute.displayName = 'HomeRoute';

export default HomeRoute;
