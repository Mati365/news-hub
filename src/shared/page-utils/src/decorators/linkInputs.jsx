import React, {useState} from 'react';
import * as R from 'ramda';

const pickEventValue = R.unless(
  R.either(R.isNil, R.is(String)),
  R.ifElse(
    R.has('target'),
    R.compose(
      R.ifElse(
        R.propEq('type', 'checkbox'),
        R.prop('checked'),
        R.prop('value'),
      ),
      R.prop('target'),
    ),
    R.identity,
  ),
);

const useInputLink = (
  {
    initialData,
    value: forwardedValue,
    onChange,
  },
) => {
  const [value, setValue] = useState(forwardedValue || initialData);
  if (forwardedValue !== undefined)
    setValue(forwardedValue);

  return {
    value,
    input(name, defaultValue = '') {
      const inputValue = name ? value[name] : value;

      return {
        value: R.defaultTo(defaultValue, inputValue),
        onChange(e) {
          const newValue = pickEventValue(e);
          const newStateValue = (
            name
              ? {...value, [name]: newValue}
              : newValue
          );

          if (onChange)
            onChange(newStateValue);

          if (!forwardedValue || !onChange)
            setValue(newStateValue);
        },
      };
    },
  };
};

const linkInputs = ({initialData = null}) => (Component) => {
  const Wrapped = ({value, onChange, ...props}) => {
    const l = useInputLink(
      {
        value,
        initialData,
        onChange,
      },
    );

    return (
      <Component
        {...props}
        l={l}
        value={l.value}
      />
    );
  };

  Wrapped.displayName = 'Wrapped';

  return Wrapped;
};

export default linkInputs;
