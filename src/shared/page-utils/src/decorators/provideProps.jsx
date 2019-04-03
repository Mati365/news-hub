import React from 'react';

const provideProps = (providedProps, override) => (Component) => {
  const Wrapped = props => (
    <Component
      {...!override && providedProps}
      {...props}
      {...override && provideProps}
    />
  );

  Wrapped.displayName = 'provideProps()';

  return Wrapped;
};

export default provideProps;
