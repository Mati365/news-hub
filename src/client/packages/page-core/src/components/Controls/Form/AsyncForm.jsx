import React from 'react';
import {Form} from '@utils/components';

const AsyncForm = ({children, ...props}) => (
  <Form {...props}>
    {children}
  </Form>
);

AsyncForm.displayName = 'AsyncForm';

export default AsyncForm;
