import React from 'react';
import * as R from 'ramda';
import {
  Route,
  Switch,
} from 'react-router-dom';

const mapRoutes = R.map(
  routeProps => (
    <Route
      key={routeProps.path}
      {...routeProps}
    />
  ),
);

const RouteMapper = ({routes}) => (
  <Switch>
    {mapRoutes(routes)}
  </Switch>
);

export default React.memo(RouteMapper);
