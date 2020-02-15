/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { get } from 'lodash';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import PrivateRoute from 'utils/privateRoute';
import Routes from '../../routes';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        {Object.values(Routes).map(route => {
          const Wrapper = route.private ? PrivateRoute : Route;

          return (
            <Wrapper
              key={route.path}
              exact={get(route, 'exact', true)}
              path={route.path}
              component={route.component}
            />
          );
        })}
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
