import React from 'react';
import APIContext from './APIContext';
import createAPIClient from '../helpers/createAPIClient';

const APIProvider = ({children, ...params}) => (
  <APIContext.Provider
    value={
      createAPIClient(params)
    }
  >
    {children}
  </APIContext.Provider>
);

export default APIProvider;
