import {useContext} from 'react';
import {SSRCookiesContext} from '../SSRCookiesProvider';

const useCookies = () => useContext(SSRCookiesContext);

export default useCookies;
