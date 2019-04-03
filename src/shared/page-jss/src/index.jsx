import React from 'react';
import c from 'classnames';
import * as R from 'ramda';
import injectSheet from 'react-jss';

import {getHOCName} from '@page/utils/src/helpers/getComponentName';

const DEFAULT_JSS_INJECTOR_CONFIG = {
  inject: ['classes'],
};

const styled = (TagComponent, styles, {omitProps, classSelector, ...predefinedProps} = {}) => {
  const omitPropsFn = omitProps && R.omit(omitProps);

  const Component = ({classes, className, ...props}) => {
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
        className={c(
          classes.base,
          classSelector && c(
            classSelector(classes, props),
          ),
          className,
        )}
      />
    );
  };

  Component.displayName = getHOCName('styled', Component);

  return injectSheet(
    styles.base
      ? styles
      : {base: styles},
    DEFAULT_JSS_INJECTOR_CONFIG,
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
    'form',
  ],
);

export default styled;
