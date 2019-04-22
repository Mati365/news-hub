import {useContext} from 'react';
import {__RouterContext} from 'react-router';

const useReactRouter = () => useContext(__RouterContext);

export default useReactRouter;
