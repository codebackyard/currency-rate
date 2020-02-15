import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Routes from '../routes';
import { useAuth } from '../context/auth-context';

export default function PrivateRoute({ Component, ...rest }) {
  const auth = useAuth();

  return (
    <>
      {auth.isAuth ? (
        <Route {...rest} component={Component} />
      ) : (
        <Redirect to={Routes.login.path} />
      )}
    </>
  );
}

PrivateRoute.propTypes = {
  Component: PropTypes.element,
};

PrivateRoute.defaultProps = {
  Component: <></>,
};
