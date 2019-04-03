import React from 'react';

import styled from '@jss';
import {
  Container,
  Margin,
} from '@utils/components';

const TestTitle = styled.div(
  {
    fontWeight: 'bold',
  },
);

const HomeRoute = () => (
  <Container>
    <Margin top={2}>
      <TestTitle>
        Home route
      </TestTitle>
    </Margin>
  </Container>
);

HomeRoute.displayName = 'HomeRoute';

export default HomeRoute;
