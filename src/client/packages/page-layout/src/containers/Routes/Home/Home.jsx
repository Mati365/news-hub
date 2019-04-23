import React from 'react';

import {
  Margin,
  IdleRender,
} from '@utils/components';

import * as Sections from '../Sections';
import {ArticlesLink} from '../../Links';
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
      <Sections.Popular>
        <Margin
          style={{
            textAlign: 'center',
          }}
          top={3}
          block
        >
          <ArticlesLink
            textProps={{
              type: 'danger',
              weight: 700,
            }}
          />
        </Margin>
      </Sections.Popular>

      <Sections.Tags />
      <PageFooter />
    </IdleRender>
  </PageContainer>
);

HomeRoute.displayName = 'HomeRoute';

export default HomeRoute;
