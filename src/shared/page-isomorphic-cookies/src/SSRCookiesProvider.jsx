import React from 'react';
import UniversalCookiesAccessor from './helpers/UniversalCookiesAccessor';

export const SSRCookiesContext = React.createContext(null);

const SSRCookiesProvider = ({children, req, res}) => (
  <SSRCookiesContext.Provider
    value={
      new UniversalCookiesAccessor({
        ssr: {
          req,
          res,
        },
      })
    }
  >
    {children}
  </SSRCookiesContext.Provider>
);

SSRCookiesProvider.displayName = 'SSRCookiesProvider';

export default SSRCookiesProvider;
