import React from 'react';

import parameterize from '@utils/helpers/parameterize';
import {UndecoratedLink} from '@utils/components';

export const parameterizeKeyPair = ({id, name, title}) => `${parameterize(name || title)},${id}`;

const createSchemaLink = (
  {
    generatorFn,
    displayName = 'ItemLink',
    itemPropName = 'item',
    linkComponent: Link = UndecoratedLink,
  },
) => {
  const Component = ({[itemPropName]: item, ...props}) => {
    const url = generatorFn(item, props);

    return (
      <Link
        {...props}
        to={url}
      />
    );
  };

  Component.displayName = displayName;

  return Component;
};

export default createSchemaLink;
