import {DIVIDER_COLOR} from '@constants/colorSchema';

import styled from '@jss';
import createBreakpoints from '@utils/styles/createBreakpoints';

const createResponsiveCardsGrid = grid => styled.div(
  {
    display: 'grid',
    ...createBreakpoints(
      {
        'xs-md': {
          ...grid.xs,

          '& > article': {
            gridArea: 'initial !important',
            marginBottom: 20,

            '&::after': {
              content: '""',
              position: 'relative',
              top: 20,
              left: 0,
              width: '100%',
              height: 1,
              backgroundColor: DIVIDER_COLOR,
            },
          },

          '& > hr': {
            display: 'none',
          },
        },

        md: {
          ...grid.md,
        },
      },
    ),
  },
);

export default createResponsiveCardsGrid;
