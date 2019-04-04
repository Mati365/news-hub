import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import provideProps from '@page/utils/src/decorators/provideProps';

const SVG_ICON_SIZES = {
  tiny: [16, 16],
  small: [24, 24],
  'small-medium': [28, 28],
  medium: [32, 32],
  big: [48, 48],
};

export const Svg = ({
  children, size,
  svgData, outline,
  ...props
}) => {
  const [w, h] = SVG_ICON_SIZES[size];

  return (
    <svg
      {...props}
      width={w}
      height={h}
    >
      <g>
        {svgData[outline ? 'outline' : 'filled']}
      </g>
    </svg>
  );
};

Svg.displayName = 'SvgIcon';

Svg.propTypes = {
  svgData: PropTypes.shape(
    {
      outline: PropTypes.element,
      filled: PropTypes.element,
    },
  ),
  outline: PropTypes.bool,
  viewBox: PropTypes.string,
  fill: PropTypes.string,
  size: PropTypes.oneOf(
    R.keys(SVG_ICON_SIZES),
  ),
};

Svg.defaultProps = {
  svgData: {
    outline: null,
    filled: null,
  },
  outline: false,
  viewBox: '0 0 24 24',
  fill: 'currentcolor',
  size: 'small',
};

const createIcon = (
  {
    svgData,
    ...props
  },
) => provideProps(
  {
    svgData,
    ...props,
  },
)(Svg);

export default createIcon;
