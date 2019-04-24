import {useContext} from 'react';
import {UAContext} from '../components/UAProvider';

const useUA = () => useContext(UAContext);

export default useUA;
