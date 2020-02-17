/**
 *
 * ProfilePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import ProfileHeader from 'components/ProfileHeader';

import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { useAuth } from '../../context/auth-context';

export function ProfilePage() {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });
  const auth = useAuth();
  console.log('auth: ', auth);

  return (
    <div>
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <ProfileHeader />
      <div>Profile page</div>
      <div>{auth.user.firstName}</div>
    </div>
  );
}

ProfilePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ProfilePage);
