import React from 'react';

import styled from '@jss';
import {
  Container,
  Margin,
  Grid,
} from '@utils/components';

const TestTitle = styled.div(
  {
    fontWeight: 'bold',
  },
);

const HomeRoute = () => (
  <Container>
    <Margin
      top={3}
      block
    >
      <Grid>
        <Grid.Column xs={6}>
          <TestTitle>
            Home route
          </TestTitle>
        </Grid.Column>

        <Grid.Column xs={6}>
          <TestTitle>
            Home route
          </TestTitle>
        </Grid.Column>
      </Grid>
    </Margin>
  </Container>
);

HomeRoute.displayName = 'HomeRoute';

export default HomeRoute;
