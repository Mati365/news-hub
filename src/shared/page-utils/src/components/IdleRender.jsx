import {
  useEffect,
  useState,
} from 'react';

import ssr from '../helpers/ssr';

export const idleCallback = {
  create(fn) {
    const {requestIdleCallback} = window;

    if (requestIdleCallback)
      return requestIdleCallback(fn);

    return setTimeout(fn, 60);
  },

  cancel(handle) {
    const {cancelIdleCallback} = window;

    if (cancelIdleCallback)
      return cancelIdleCallback(handle);

    return clearTimeout(handle);
  },
};

const IdleRender = ({children}) => {
  const [visible, setVisible] = useState(
    ssr
      ? true
      : (!window.__hydrated),
  );

  useEffect(
    () => {
      if (visible)
        return undefined;

      const timer = idleCallback.create(() => setVisible(true));

      return () => {
        idleCallback.cancel(timer);
      };
    },
    [],
  );

  return (
    visible
      ? children
      : null
  );
};

IdleRender.displayName = 'IdleRender';

export default IdleRender;
