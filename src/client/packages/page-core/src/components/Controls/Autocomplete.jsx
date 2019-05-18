import React, {useState} from 'react';
import PropTypes from 'prop-types';

import linkInputs from '@utils/decorators/linkInputs';

const Autocomplete = ({
  inputRenderFn,
  valueResolverComponent: ValueResolver,
  l,
  resolverParams,
}) => {
  const [active, setActive] = useState(false);

  const onFocus = () => setActive(true);
  const onBlur = () => setActive(false);

  const renderInput = data => inputRenderFn(
    {
      data: data || null,
      l,
      active,
      onFocus,
      onBlur,
    },
  );

  if (ValueResolver) {
    return (
      <ValueResolver {...resolverParams}>
        {renderInput}
      </ValueResolver>
    );
  }

  return renderInput();
};

Autocomplete.displayName = 'Autocomplete';

Autocomplete.propTypes = {
  inputRenderFn: PropTypes.func.isRequired,
  valueResolverComponent: PropTypes.any,
  resolverParams: PropTypes.any,
};

export default linkInputs(
  {
    initialData: '',
  },
)(Autocomplete);
