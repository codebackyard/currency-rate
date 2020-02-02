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
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { Wrapper, Card, FormRow, TextField } from './styled';

export function RegisterPage() {
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'registerPage', saga });

  return (
    <div>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register to Currency Rate" />
      </Helmet>
      <Wrapper>
        <Card>
          <form noValidate>
            <Grid container>
              <Grid item xs={12}>
                <FormRow>
                  <TextField label="Email" />
                </FormRow>
              </Grid>
              <Grid item xs={12}>
                <FormRow>
                  <TextField label="Password" />
                </FormRow>
              </Grid>
              <Grid item xs={12}>
                <FormRow>
                  <TextField label="Password Confirmation" />
                </FormRow>
              </Grid>
              <Grid item xs={12}>
                <FormRow>
                  <Button variant="contained" color="primary">
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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
