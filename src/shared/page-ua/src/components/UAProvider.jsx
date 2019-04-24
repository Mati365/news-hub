import React, {useState, useEffect} from 'react';
import * as R from 'ramda';

import {BREAKPOINTS} from '@shared/utils/src/styles/createBreakpoints';

export const UAContext = React.createContext(
  {
    mobile: false,
    tablet: false,
    desktop: true,
  },
);

const UAProvider = ({value, ...props}) => {
  const [ua, setUA] = useState(value);

  useEffect(
    () => {
      const onResize = () => {
        const {innerWidth: width} = window;
        const newFlags = {
          mobile: width >= BREAKPOINTS.xs && width < BREAKPOINTS.md,
          tablet: width >= BREAKPOINTS.md && width <= BREAKPOINTS.lg,
          desktop: width > BREAKPOINTS.lg,
        };

        if (!R.equals(newFlags, ua))
          setUA(newFlags);
      };

      // postmount
      onResize();

      // listener
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    },
    [ua],
  );

  return (
    <UAContext.Provider
      {...props}
      value={ua}
    />
  );
};

UAProvider.displayName = 'UAProvider';

export default UAProvider;
