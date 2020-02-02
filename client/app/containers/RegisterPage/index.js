/**
 *
 * RegisterPage
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

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRegisterPage, {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectPasswordConf,
} from './selectors';
import {
  register,
  inputEmailChanged,
  inputPasswordChanged,
  inputPasswordConfChanged,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { Wrapper, Card, CardHeader, FormRow, TextField } from './styled';

export function RegisterPage({ dispatch, register }) {
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'registerPage', saga });

  const formSubmit = e => {
    e.preventDefault();
    register();
  };

  return (
    <div>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register to Currency Rate" />
      </Helmet>
      <Wrapper>
        <Card>
          <CardHeader>
            <Typography variant="h4" component="h1" gutterBottom>
              Currency Rate
            </Typography>
          </CardHeader>
          <form noValidate onSubmit={formSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <FormRow>
                  <TextField
                    label="Email"
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
                    type="password"
                    onChange={e =>
                      dispatch(
                        inputPasswordChanged({ password: e.target.value }),
                      )
                    }
                  />
                </FormRow>
              </Grid>
              <Grid item xs={12}>
                <FormRow>
                  <TextField
                    label="Password Confirmation"
                    type="password"
                    onChange={e =>
                      dispatch(
                        inputPasswordConfChanged({
                          passwordConf: e.target.value,
                        }),
                      )
                    }
                  />
                </FormRow>
              </Grid>
              <Grid item xs={12}>
                <FormRow>
                  <Button variant="contained" color="primary" type="submit">
                    Register
                  </Button>
                  <Button
                    style={{ marginLeft: 10 }}
                    component={RouterLink}
                    to="/login"
                  >
                    Login
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

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  passwordConf: makeSelectPasswordConf(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    register: () => dispatch(register()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RegisterPage);
