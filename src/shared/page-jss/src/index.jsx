import React from 'react';
import c from 'classnames';
import injectSheet from 'react-jss';
import * as R from 'ramda';

import {getHOCName} from '@shared/utils/src/helpers/getComponentName';

const DEFAULT_JSS_INJECTOR_CONFIG = {
  inject: ['classes'],
};

const styled = (
  TagComponent,
  styles,
  {
    omitProps, classSelector,
    index, ...predefinedProps
  } = {},
) => {
  const omitPropsFn = omitProps && R.omit(omitProps);

  const Component = React.forwardRef(({classes, className, ...props}, ref) => {
    const mergedProps = {
      ...predefinedProps,
      ...(
        omitPropsFn
          ? omitPropsFn(props)
          : props
      ),
    };

    return (
      <TagComponent
        {...mergedProps}
        ref={ref}
        className={c(
          classes.base,
          classSelector && c(
            classSelector(classes, props),
          ),
          className,
        )}
      />
    );
  });

  Component.displayName = getHOCName('styled', Component);

  return injectSheet(
    styles.base
      ? styles
      : {base: styles},
    {
      ...DEFAULT_JSS_INJECTOR_CONFIG,
      ...index && {
        index,
      },
    },
  )(Component);
};

R.forEach(
  (element) => {
    styled[element] = (...args) => styled(element, ...args);
  },
  [
    'div', 'span', 'li', 'ul', 'ol',
    'table', 'tr', 'td',
    'img', 'main', 'input', 'header',
    'form', 'article', 'figure',
    'section', 'button',
  ],
);

export default styled;
