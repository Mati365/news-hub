import styled from '@jss';

import textEllipsisStyle from '@utils/styles/textEllipsis';

import BookmarkIcon from '@icons/BookmarkIcon';
import {
  Flex,
  Text,
} from '@utils/components';


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

    // ugly but works
    horizontal: {
      '& > *:nth-child(1):not(:only-child)': {
        flex: '40%',
      },

      '& > *:nth-child(2)': {
        flex: '60%',
        paddingLeft: 15,
      },
    },
  },
  {
    omitProps: ['vertical'],
    classSelector: (classes, {vertical}) => (
      classes[vertical ? 'vertical' : 'horizontal']
    ),
  },
);

export const ArticleContent = styled(
  Text,
  {
    extend: textEllipsisStyle,
    flex: 1,
  },
  {
    align: 'justify',
  },
);

export const ArticleToolbar = styled(
  Flex,
  {
    marginTop: 5,
  },
  {
    direction: 'row',
  },
);

export const ArticleBookmark = styled(
  BookmarkIcon,
  {
    base: {
      position: 'absolute',
      right: 5,
      top: 5,
    },

    left: {
      left: 5,
      right: 'initial',
    },
  },
  {
    omitProps: ['left'],
    classSelector: (classes, {left}) => left && classes.left,
  },
);

ArticleHolder.displayName = 'ArticleHolder';

export default ArticleHolder;
