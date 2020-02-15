import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import history from 'utils/history';

import LanguageProvider from 'containers/LanguageProvider';
import AuthProvider from './auth-context';

import configureStore from '../configureStore';

const initialState = {};
const store = configureStore(initialState, history);

function AppProviders({ children, messages }) {
  return (
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <AuthProvider>{children}</AuthProvider>
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

export default AppProviders;
