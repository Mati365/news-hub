import React, {useContext} from 'react';

const APIContext = React.createContext(null);

export const useAPIContext = () => useContext(APIContext);

export default APIContext;
