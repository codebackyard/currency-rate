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

function FullPageSpinner() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

FullPageSpinner.propTypes = {};

export default memo(FullPageSpinner);
