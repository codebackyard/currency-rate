import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';

import history from 'utils/history';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuth } from 'containers/LoginPage/selectors';

import LanguageProvider from 'containers/LanguageProvider';
import AuthProvider from './auth-context';

import configureStore from '../configureStore';

const initialState = {};
const store = configureStore(initialState, history);

function AppProviders({ children, messages, auth }) {
  return (
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <AuthProvider auth={auth}>{children}</AuthProvider>
      </LanguageProvider>
    </Provider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  messages: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps);

// export default compose(withConnect)(AppProviders);
export default AppProviders;
