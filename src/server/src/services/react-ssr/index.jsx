import React from 'react';
import express from 'express';

import ssrRenderStyledComponent from '@jss/server/ssrRenderStyles';
import AppRoot from '@client/layout';

const rootRoute = (req, res) => {
  const prerendered = ssrRenderStyledComponent(
    <AppRoot />,
  );

  res.send(prerendered);
};

export default (
  express
    .Router({
      strict: true,
    })
    .get('*', rootRoute)
);
