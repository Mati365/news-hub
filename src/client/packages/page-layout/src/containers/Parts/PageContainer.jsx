import React, {useEffect} from 'react';

import {Container} from '@utils/components';
import useReactRouter from '../../hooks/useReactRouter';

const PageContainer = ({children}) => {
  const {location} = useReactRouter();

  useEffect(
    () => {
      window.scrollTo(0, 0);
    },
    [
      location.pathname,
      location.search,
    ],
  );

  return (
    <Container>
      {children}
    </Container>
  );
};

PageContainer.displayName = 'PageContainer';

export default PageContainer;
