import React from 'react';
import PropTypes from 'prop-types';

import styled from '@jss';
import {
  Margin,
  Label,
  Flex,
} from '@utils/components';

export const GroupLabel = styled(
  Label,
  {
    base: {},

    inline: {
      marginRight: 20,
    },

    thin: {
      fontWeight: 500,
    },
  },
  {
    omitProps: ['inline', 'thin'],
    classSelector: (classes, {thin, inline}) => [
      inline && classes.inline,
      thin && classes.thin,
    ],
  },
);

const ControlWrapper = styled.div(
  {
    '& > *': {
      width: '100%',
    },
  },
);

const FormGroup = ({
  label, control,
  thinLabel, inline,
}) => {
  let content = (
    <>
      <GroupLabel
        thin={thinLabel}
        inline={inline}
      >
        {label}
      </GroupLabel>

      {(
        inline
          ? control
          : <ControlWrapper>{control}</ControlWrapper>
      )}
    </>
  );

  if (inline) {
    content = (
      <Flex
        direction='row'
        align='center'
      >
        {content}
      </Flex>
    );
  }

  return (
    <Margin
      bottom={2}
      block
    >
      {content}
    </Margin>
  );
};

FormGroup.displayName = 'FormGroup';

FormGroup.propTypes = {
  inline: PropTypes.bool,
  thinLabel: PropTypes.bool,
};

FormGroup.defaultProps = {
  inline: false,
  thinLabel: true,
};

export default FormGroup;
