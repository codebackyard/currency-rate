import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Routes from '../routes';
import { useAuth } from '../context/auth-context';

export default function PrivateRoute({ component: Component, ...rest }) {
  const auth = useAuth();

  const render = () => {
    console.log('private auth: ', auth);
    if (auth.isAuth) return <Component />;

    return <Redirect to={Routes.login.path} />;
  };
  console.log('rest: ', rest);
  return <Route {...rest} render={render} />;
}

PrivateRoute.propTypes = {
  component: PropTypes.element,
};

PrivateRoute.defaultProps = {
  component: 'div',
};
