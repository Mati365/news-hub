import React, {useState} from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import linkInputs, {pickEventValue} from '@utils/decorators/linkInputs';
import APIQuery from '@api-client/components/APIQuery';

export const safeBlankValue = R.compose(
  R.when(
    R.is(String),
    name => ({
      id: null,
      name,
    }),
  ),
  pickEventValue,
);

const DefaultQueryResolver = ({
  value, queryPath, queryParams,
  ...props
}) => (
  <APIQuery
    skipIf={!value?.name}
    path={queryPath}
    urlParams={{
      phrase: value?.name || '',
      ...queryParams,
    }}
    {...props}
  />
);

const Autocomplete = ({
  inputRenderFn,
  valueResolverComponent: ValueResolver,
  l,
  resolverParams,
}) => {
  const [active, setActive] = useState(false);

  const onFocus = () => setActive(true);
  const onBlur = () => {
    setTimeout(() => setActive(false), 200);
  };

  const onChange = (value) => {
    l.setValue(
      safeBlankValue(value),
    );
  };

  const renderInput = data => inputRenderFn(
    {
      ...(data || null),
      value: l.value,
      active,
      listeners: {
        onChange,
        onFocus,
        onBlur,
      },
    },
  );

  if (ValueResolver) {
    return (
      <ValueResolver
        {...resolverParams}
        value={l.value}
      >
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

Autocomplete.defaultProps = {
  valueResolverComponent: DefaultQueryResolver,
};

export default linkInputs(
  {
    initialData: '',
  },
)(Autocomplete);
