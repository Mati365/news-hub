import React from 'react';

import styled from '@jss';
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

      <Margin top={3}>
        {children}
      </Margin>
    </section>
  ),
  {
    margin: [45, 0],
  },
);

TitledSection.displayName = 'TitledSection';

export default TitledSection;
