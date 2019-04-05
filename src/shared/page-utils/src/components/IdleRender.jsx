import {
  useEffect,
  useState,
} from 'react';

import ssr from '../helpers/ssr';

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

      const timer = window.requestIdleCallback(() => setVisible(true));

      return () => {
        window.cancelIdleCallback(timer);
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
