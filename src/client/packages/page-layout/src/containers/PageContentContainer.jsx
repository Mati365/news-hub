import styled from '@jss';

const PageContentContainer = styled.div(
  {
    base: {},

    '@global': {
      body: {
        fontFamily: 'Arial',
      },
    },
  },
);

PageContentContainer.displayName = 'PageContentContainer';

export default PageContentContainer;
