import {ROOT_HYDRATION_CONTAINER} from '@constants/globalAccessors';

import hydrateStyledComponent from '@jss/client/hydrateStyledComponent';
import AppRoot from '@client/layout';

hydrateStyledComponent(
  AppRoot,
  {
    withSkeleton: false,
  },
  {
    containerId: ROOT_HYDRATION_CONTAINER,
  },
);
