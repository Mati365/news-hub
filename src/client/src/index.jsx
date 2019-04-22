import 'react-mde/lib/styles/css/react-mde-all.css';

import {ROOT_HYDRATION_CONTAINER} from '@constants/globalAccessors';

import HYDRATION_DATA from '@constants/global/hydrationData';

import hydrateStyledComponent from '@jss/client/hydrateStyledComponent';
import {wrapHydratedAsyncTree} from '@async-resolver';

import AppRoot from '@client/layout';

hydrateStyledComponent(
  wrapHydratedAsyncTree(AppRoot),
  {
    withSkeleton: false,
    hydrationData: {
      data: HYDRATION_DATA,
    },
  },
  {
    containerId: ROOT_HYDRATION_CONTAINER,
    postHydrationFn: () => {
      window.__hydrated = true;
    },
  },
);
