import PropTypes from 'prop-types';
import * as R from 'ramda';

import styled from '@jss';

import {
  TEXT_PRIMARY,
  TEXT_WARN,
  TEXT_DANGER,
} from '@constants/colorSchema';

import capitalize from '../helpers/capitalize';
import provideProps from '../decorators/provideProps';

const TEXT_TYPES = {
  primary: {color: TEXT_PRIMARY},
  warn: {color: TEXT_WARN},
  danger: {color: TEXT_DANGER},
};

const Text = styled.div(
  {
    base: {
      display: 'inline-block',
    },
    block: {
      display: 'block',
    },
    inline: {
      display: 'inline',
    },

    underline: {textDecoration: 'underline'},
    italic: {fontStyle: 'italic'},

    initial: {fontWeight: 'initial'},
    500: {fontWeight: 500},
    600: {fontWeight: 600},
    700: {fontWeight: 700},
    800: {fontWeight: 800},

    ...TEXT_TYPES,
  },
  {
    omitProps: [
      'underline', 'italic', 'weight',
      'type', 'block', 'inline',
    ],
    classSelector: (
      classes,
      {
        underline, italic,
        weight, type,
        inline, block,
      },
    ) => [
      block && classes.block,
      inline && classes.inline,
      underline && classes.underline,
      italic && classes.italic,
      weight && classes[weight],
      type && classes[type],
    ],
  },
);

Text.displayName = 'Text';

Text.propTypes = {
  underline: PropTypes.bool,
  inline: PropTypes.bool,
  block: PropTypes.bool,
  italic: PropTypes.bool,
  weight: PropTypes.number,
  type: PropTypes.oneOf(R.keys(TEXT_TYPES)),
};

R.forEachObjIndexed(
  (style, key) => {
    Text[capitalize(key)] = provideProps({type: key})(Text);
  },
  TEXT_TYPES,
);

export default Text;
