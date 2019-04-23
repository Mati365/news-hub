import React from 'react';
import * as R from 'ramda';

import {useI18n} from '@i18n';

import parameterize from '@utils/helpers/parameterize';
import {
  Text,
  UndecoratedLink,
} from '@utils/components';

export const parameterizeKeyPair = ({id, name, title}) => `${parameterize(name || title)},${id}`;

const createSchemaLink = (
  {
    generatorFn,
    translationPath,
    displayName = 'ItemLink',
    itemPropName = 'item',
    defaultLinkComponent = UndecoratedLink,
  },
) => {
  const useNopI18n = (
    translationPath
      ? useI18n
      : R.F
  );

  const Component = ({
    [itemPropName]: item,
    linkComponent,
    to, children,
    textProps,
    ...props
  }) => {
    const Link = linkComponent || defaultLinkComponent;

    const t = useNopI18n();
    const url = (
      generatorFn
        ? generatorFn(item, props)
        : to
    );

    let content = (
      <>
        {translationPath && t(translationPath)}
        {children}
      </>
    );

    if (textProps) {
      content = (
        <Text {...textProps}>
          {content}
        </Text>
      );
    }

    return (
      <Link
        {...props}
        to={url}
      >
        {content}
      </Link>
    );
  };

  Component.displayName = displayName;

  return Component;
};

export default createSchemaLink;
