import styled from '@jss';

const ArticleHolder = styled.article(
  {
    base: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      padding: [10, 0],
    },

    vertical: {
      flexDirection: 'column',
    },
  },
  {
    omitProps: ['vertical'],
    classSelector: (classes, {vertical}) => vertical && classes.vertical,
  },
);

ArticleHolder.displayName = 'ArticleHolder';

export default ArticleHolder;
