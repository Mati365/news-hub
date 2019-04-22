import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import suppressEvent from '@utils/helpers/suppressEvent';
import usePromiseCallback from '@utils/hooks/usePromiseCallback';
import linkInputs from '@utils/decorators/linkInputs';

import {Form} from '@utils/components';

const AsyncForm = ({
  l, value, children, submitPromiseFn, onSubmitDone,
  ...props
}) => {
  const [handleSubmit, promiseState] = usePromiseCallback(
    async (e) => {
      suppressEvent(e);

      const result = await submitPromiseFn(l, e);
      if (onSubmitDone)
        return onSubmitDone(result);

      return result;
    },
    {
      cacheKeys: [
        usePromiseCallback,
        l,
      ],
    },
  );

  return (
    <Form
      {...props}
      onSubmit={handleSubmit}
    >
      {children(
        {
          ...promiseState,
          l,
        },
      )}
    </Form>
  );
};

AsyncForm.displayName = 'AsyncForm';

AsyncForm.propTypes = {
  submitPromiseFn: PropTypes.func,
};

AsyncForm.defaultProps = {
  submitPromiseFn: R.T,
};

export default linkInputs(
  {
    initialData: {},
  },
)(AsyncForm);
