import React from 'react';

export const MAGIC_JSS_HEAD_TAG = 'MAGIC_JSS_HEAD_TAG';

const MagicJSSHeadTag = () => (
  <style type='text/css'>
    {MAGIC_JSS_HEAD_TAG}
  </style>
);

MagicJSSHeadTag.displayName = 'MagicJSSHeadTag';

export default MagicJSSHeadTag;
