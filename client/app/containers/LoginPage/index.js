/**
 *
 * LoginPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link as RouterLink } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginPage, {
  makeSelectLoginEmail,
  makeSelectLoginPassword,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  loginRequest,
  inputEmailChanged,
  inputPasswordChanged,
} from './actions';

import { Wrapper, Card, TextField, FormRow, CardHeader } from './styled';

export function LoginPage({ login, dispatch, email, password }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const formSubmit = e => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to Currency Rate profile" />
      </Helmet>
      <Wrapper>
        <Card>
          <CardHeader>
            <Typography variant="h4" component="h1" gutterBottom>
              Currency Rate
            </Typography>
          </CardHeader>
          <form onSubmit={formSubmit} noValidate>
            <Grid container>
              <Grid item xs={12}>
                <FormRow>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={e =>
                      dispatch(inputEmailChanged({ email: e.target.value }))
                    }
                  />
                </FormRow>
              </Grid>
              <Grid item xs={12}>
                <FormRow>
                  <TextField
                    label="Password"
                    value={password}
                    type="password"
                    onChange={e =>
                      dispatch(
                        inputPasswordChanged({
                          password: e.target.value,
                        }),
                      )
                    }
                  />
                </FormRow>
              </Grid>
              <Grid item xs={12}>
                <FormRow>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={formSubmit}
                  >
                    Login
                  </Button>
                  <Button
                    style={{ marginLeft: 10 }}
                    component={RouterLink}
                    to="/register"
                  >
                    Register
                  </Button>
                </FormRow>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Wrapper>
    </div>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  email: makeSelectLoginEmail(),
  password: makeSelectLoginPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: () => dispatch(loginRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
