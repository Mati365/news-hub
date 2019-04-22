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
  const initial = forwardedValue || initialData;
  const [value, setValue] = useState(initial);

  if (forwardedValue !== undefined && value !== forwardedValue)
    setValue(forwardedValue);

  return {
    initialData: initial,
    value,
    input(name, {defaultValue = '', relatedInputsFn} = {}) {
      const inputValue = name ? value[name] : value;

      return {
        value: R.defaultTo(defaultValue, inputValue),
        onChange(e) {
          const newValue = pickEventValue(e);
          const newStateValue = (
            name
              ? {
                ...value,
                [name]: newValue,
                ...relatedInputsFn && relatedInputsFn(newValue, name, value),
              }
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

const linkInputs = ({
  initialData: defaultInitialData = null,
}) => (Component) => {
  const Wrapped = ({
    initialData, value, onChange,
    ...props
  }) => {
    const l = useInputLink(
      {
        initialData: R.defaultTo(defaultInitialData, initialData),
        value,
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
