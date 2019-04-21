// import React from 'react';
import styled from '@jss';

import {
  WHITE,
  ACTIVE_INPUT,
  LIGHT_GRAY,
} from '@constants/colorSchema';

const InputHolder = styled.input(
  {
    margin: 0,
    padding: [9, 12],
    outline: 0,
    background: WHITE,
    border: `1px solid ${LIGHT_GRAY}`,
    borderRadius: 4,
    fontSize: '0.9rem',
    transition: 'border-color 250ms ease-in-out',

    '&:focus': {
      borderColor: ACTIVE_INPUT,
    },
  },
);

export default InputHolder;
