/**
 *
 * FullPageSpinner
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import CircularProgress from '@material-ui/core/CircularProgress';

function FullPageSpinner() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    ></div>
  );
}

FullPageSpinner.propTypes = {};

export default memo(FullPageSpinner);
