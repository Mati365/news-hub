import React, {useContext} from 'react';
import * as R from 'ramda';

const createBlankCounter = () => ({
  counter: 0,
  generateUUID: function generateUUID() {
    return this.counter++;
  },
});

export const AsyncPromisesContext = React.createContext({
  promises: {},
  cache: {},
  attachPromise: R.T,
  counter: 0,
});

export const useAsyncPromisesContext = () => useContext(AsyncPromisesContext);

const AsyncContextProvider = ({value, children}) => (
  <AsyncPromisesContext.Provider
    value={{
      ...value,
      ...createBlankCounter(),
    }}
  >
    {children}
  </AsyncPromisesContext.Provider>
);

export default AsyncContextProvider;
