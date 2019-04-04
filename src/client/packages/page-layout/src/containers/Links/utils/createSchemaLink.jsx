import React from 'react';
import * as R from 'ramda';

import {useI18n} from '@i18n';

import parameterize from '@utils/helpers/parameterize';
import {UndecoratedLink} from '@utils/components';

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
    ...props
  }) => {
    const Link = linkComponent || defaultLinkComponent;

    const t = useNopI18n();
    const url = (
      generatorFn
        ? generatorFn(item, props)
        : to
    );

    return (
      <Link
        {...props}
        to={url}
      >
        {translationPath && t(translationPath)}
        {children}
      </Link>
    );
  };

  Component.displayName = displayName;

  return Component;
};

export default createSchemaLink;
