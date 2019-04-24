import React from 'react';

import styled from '@jss';
import createBreakpoints from '@utils/styles/createBreakpoints';

import {
  Margin,
  Header,
} from '@utils/components';

const SectionHeader = styled(
  Header.H2,
  {
    fontWeight: 700,
  },
);

const TitledSection = styled(
  ({title, children, ...props}) => (
    <section {...props}>
      <SectionHeader>
        {title}
      </SectionHeader>

      <Margin top={1}>
        {children}
      </Margin>
    </section>
  ),
  {
    margin: [45, 0],

    '&:first-of-type': createBreakpoints(
      {
        xs: {
          marginTop: 20,
        },

        md: {
          marginTop: 30,
        },
      },
    ),
  },
);

TitledSection.displayName = 'TitledSection';

export default TitledSection;
