import React from 'react';
import ReactDOM from 'react-dom';

import {MAGIC_JSS_HEAD_ID} from '../components/MagicJSSHeadTag';

const hydrateStyledComponent = (
  Component,
  props,
  {
    postHydrationFn,

    // ... JSS flags
    serverStylesContainerId = MAGIC_JSS_HEAD_ID,
    containerId,
  },
) => {
  const container = document.getElementById(containerId);
  if (!container)
    throw new Error('Cannot find hydration container!');

  ReactDOM.hydrate(
    <Component {...props} />,
    container,
    () => {
      const styles = document.getElementById(serverStylesContainerId);

      if (styles)
        styles.parentNode.removeChild(styles);

      if (postHydrationFn)
        postHydrationFn();
    },
  );
};

export default hydrateStyledComponent;
