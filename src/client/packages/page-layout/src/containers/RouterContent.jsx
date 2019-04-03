import React from 'react';
import PropTypes from 'prop-types';

import SSRRouter from '../components/SSRRouter';
import RouteMapper from '../components/RouteMapper';

import APP_ROUTES from './routes';

const RouterContent = ({routes}) => (
  <SSRRouter>
    <RouteMapper routes={routes} />
  </SSRRouter>
);

RouterContent.displayName = 'RouterContent';

RouterContent.props = {
  routes: PropTypes.arrayOf(PropTypes.object),
};

RouterContent.defaultProps = {
  routes: APP_ROUTES,
};

export default RouterContent;
