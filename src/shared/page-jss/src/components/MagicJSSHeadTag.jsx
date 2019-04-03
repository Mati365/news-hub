import React from 'react';

export const MAGIC_JSS_HEAD_TAG = 'MAGIC_JSS_HEAD_TAG';

export const MAGIC_JSS_HEAD_ID = 'MAGIC_JSS_SSR';

const MagicJSSHeadTag = () => (
  <style
    type='text/css'
    id={MAGIC_JSS_HEAD_ID}
  >
    {MAGIC_JSS_HEAD_TAG}
  </style>
);

MagicJSSHeadTag.displayName = 'MagicJSSHeadTag';

export default MagicJSSHeadTag;
