import React from 'react';

import styled from '@jss';
import {Label} from '@utils/components';

export const GroupLabel = styled(
  Label,
  {
    marginRight: 20,
  },
);

const FormGroup = ({label, control}) => (
  <div>
    <GroupLabel>
      {label}
    </GroupLabel>

    {control}
  </div>
);

FormGroup.displayName = 'FormGroup';

export default FormGroup;
