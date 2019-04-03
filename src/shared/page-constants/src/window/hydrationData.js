import ssr from '@page/utils/src/helpers/ssr';

import {GLOBAL_HYDRATION_VARIABLE} from '../globalAccessors';

export default ssr ? {} : window[GLOBAL_HYDRATION_VARIABLE];
