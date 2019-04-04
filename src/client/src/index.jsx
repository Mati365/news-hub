import {ROOT_HYDRATION_CONTAINER} from '@constants/globalAccessors';

import HYDRATION_DATA from '@constants/window/hydrationData';

import hydrateStyledComponent from '@jss/client/hydrateStyledComponent';
import AppRoot from '@client/layout';

hydrateStyledComponent(
  AppRoot,
  {
    withSkeleton: false,
    hydrationData: {
      data: HYDRATION_DATA,
    },
  },
  {
    containerId: ROOT_HYDRATION_CONTAINER,
  },
);
