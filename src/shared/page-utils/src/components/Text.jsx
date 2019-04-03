import PropTypes from 'prop-types';
import * as R from 'ramda';

import styled from '@jss';

import {
  TEXT_PRIMARY,
  TEXT_WARN,
  TEXT_DANGER,
  TEXT_MUTED,
} from '@constants/colorSchema';

import capitalize from '../helpers/capitalize';
import provideProps from '../decorators/provideProps';

const TEXT_TYPES = {
  primary: {color: TEXT_PRIMARY},
  warn: {color: TEXT_WARN},
  danger: {color: TEXT_DANGER},
  muted: {color: TEXT_MUTED},
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
    uppercase: {textTransform: 'uppercase'},

    initial: {fontWeight: 'initial'},
    500: {fontWeight: 500},
    600: {fontWeight: 600},
    700: {fontWeight: 700},
    800: {fontWeight: 800},

    'align-justify': {textAlign: 'justify'},
    'align-left': {textAlign: 'left'},
    'align-right': {textAlign: 'right'},

    'size-tiny': {fontSize: '0.75rem'},
    'size-small': {fontSize: '0.85rem'},
    'size-normal': {fontSize: '1.0em'},

    ...TEXT_TYPES,
  },
  {
    omitProps: [
      'underline', 'italic', 'weight',
      'type', 'block', 'inline', 'align',
      'size', 'uppercase',
    ],
    classSelector: (
      classes,
      {
        underline, italic,
        weight, type,
        inline, block,
        align, size,
        uppercase,
      },
    ) => [
      block && classes.block,
      inline && classes.inline,
      uppercase && classes.uppercase,
      underline && classes.underline,
      italic && classes.italic,
      weight && classes[weight],
      type && classes[type],
      align && classes[`align-${align}`],
      size && classes[`size-${size}`],
    ],
  },
);

Text.displayName = 'Text';

Text.propTypes = {
  uppercase: PropTypes.bool,
  underline: PropTypes.bool,
  inline: PropTypes.bool,
  block: PropTypes.bool,
  italic: PropTypes.bool,
  weight: PropTypes.number,
  size: PropTypes.oneOf([
    'tiny',
    'small',
    'normal',
    'big',
  ]),
  align: PropTypes.oneOf([
    'justify',
    'left',
    'right',
  ]),
  type: PropTypes.oneOf(R.keys(TEXT_TYPES)),
};

Text.defaultProps = {
  size: 'normal',
};

R.forEachObjIndexed(
  (style, key) => {
    Text[capitalize(key)] = provideProps({type: key})(Text);
  },
  TEXT_TYPES,
);

export default Text;
