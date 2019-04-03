import React from 'react';

import {
  Container,
  Margin,
  Grid,
  Text,
} from '@utils/components';

const HomeRoute = () => (
  <Container>
    <Margin
      top={3}
      block
    >
      <Grid>
        <Grid.Column xs={6}>
          <Text weight={700}>
            Home route
          </Text>
        </Grid.Column>

        <Grid.Column xs={6}>
          <Text.Danger weight={600}>
            Home route
          </Text.Danger>
        </Grid.Column>
      </Grid>
    </Margin>
  </Container>
);

HomeRoute.displayName = 'HomeRoute';

export default HomeRoute;
