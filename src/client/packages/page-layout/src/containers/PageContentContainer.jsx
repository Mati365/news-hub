import styled from '@jss';

const PageContentContainer = styled.div(
  {
    base: {},

    '@global': {
      body: {
        fontFamily: 'Arial',
        fontSize: '13px',

        '&, & *': {
          boxSizing: 'border-box',
        },
      },
    },
  },
);

PageContentContainer.displayName = 'PageContentContainer';

export default PageContentContainer;
