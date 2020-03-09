import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuth } from 'containers/LoginPage/selectors';

export const AuthContext = React.createContext();

function AuthProvider({ auth, ...props }) {
  return <AuthContext.Provider value={auth} {...props} />;
}

AuthProvider.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const auth = get(state, 'auth');

  return {
    auth,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AuthProvider);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
