import React from 'react';

import styled from '@jss';
import Container from '@utils/components/Container';

const TestTitle = styled.div(
  {
    fontWeight: 'bold',
  },
);

const HomeRoute = () => (
  <Container>
    <TestTitle>
      Home route
    </TestTitle>
  </Container>
);

HomeRoute.displayName = 'HomeRoute';

export default HomeRoute;
