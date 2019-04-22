import {
  useState,
  useEffect,
} from 'react';

import ssr from '../helpers/ssr';

const DisableSSRRender = ({children}) => {
  const [visible, setVisibility] = useState(!ssr && window.__hydrated);

  useEffect(
    () => {
      if (visible)
        return;

      setVisibility(true);
    },
    [],
  );

  return (
    visible
      ? children
      : null
  );
};

DisableSSRRender.displayName = 'DisableSSRRender';

export default DisableSSRRender;
