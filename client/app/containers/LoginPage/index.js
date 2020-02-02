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
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { Wrapper, Card, TextField, FormRow, CardHeader } from './styled';

export function LoginPage() {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to currency rate profile" />
      </Helmet>
      <Wrapper>
        <Card>
          <CardHeader>
            <Typography variant="h4" component="h1" gutterBottom>
              Currency Rate
            </Typography>
          </CardHeader>
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
                  <Button variant="contained" color="primary">
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
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
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
)(LoginPage);
