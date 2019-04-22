import styled from '@jss';

import {
  TEXT_DANGER,
  LIGHT_CARD_BORDER,
} from '@constants/colorSchema';

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

      '& > *:only-child': {
        width: '100% !important',
      },
    },

    bordered: {
      padding: 20,
      borderRadius: 8,
      border: `1px solid ${LIGHT_CARD_BORDER}`,
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
    omitProps: ['vertical', 'bordered'],
    classSelector: (classes, {bordered, vertical}) => [
      classes[vertical ? 'vertical' : 'horizontal'],
      bordered && classes.bordered,
    ],
  },
);

export const ArticleContent = styled(
  Text,
  {
    extend: textEllipsisStyle,
    flex: 1,
    lineHeight: '1.37em',

    '& > p:first-child': {
      marginTop: 0,
    },

    '& > p:last-child': {
      marginBottom: 0,
    },

    '& a': {
      color: TEXT_DANGER,
    },
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
