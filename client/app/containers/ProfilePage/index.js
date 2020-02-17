/**
 *
 * ProfilePage
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// @framer-motion
import { motion } from 'framer-motion';

// @material
import { fade, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import CommentIcon from '@material-ui/icons/Comment';
import Checkbox from '@material-ui/core/Checkbox';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import ProfileHeader from 'components/ProfileHeader';

import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { useAuth } from '../../context/auth-context';

const useStyles = makeStyles({
  wrapper: {},
  card: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: 'fixed',
    bottom: 0,
    right: '20%',
    top: 100,
    width: '100%',
    maxWidth: 600,
  },
  cardContent: {},
});

const CURRENCIES = [
  { id: 1, title: 'US Dollar', rate: 1 },
  { id: 2, title: 'UK Pound', rate: 0.94 },
  { id: 3, title: 'IR Rial', rate: 0.01 },
  { id: 4, title: 'Euro', rate: 0.97 },
  { id: 5, title: 'TR Lira', rate: 0.4 },
  { id: 6, title: 'BTC', rate: 7670 },
];

export function ProfilePage() {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  const [currenciesChecked, setCurrenciesChecked] = useState([]);
  const [currencies, setCurrencies] = useState([CURRENCIES[0], CURRENCIES[1]]);

  // const auth = useAuth();
  const classes = useStyles();

  const handleToggle = id => {
    if (currenciesChecked.indexOf(id) !== -1) {
      return setCurrenciesChecked([
        ...currenciesChecked.filter(currency => currency !== id),
      ]);
    }
    setCurrenciesChecked([...currenciesChecked, id]);
  };

  const addCurrency = id => {
    if (currencies.some(currency => currency.id === id)) return;

    setCurrencies([
      ...currencies,
      CURRENCIES.find(currency => currency.id === id),
    ]);
  };

  const removeCurrency = id => {
    setCurrencies([...currencies.filter(currency => currency.id !== id)]);
  };

  return (
    <div className={classes.wrapper}>
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <ProfileHeader
        addCurrency={addCurrency}
        removeCurrency={removeCurrency}
        currencies={CURRENCIES}
      />
      <Card className={classes.card}>
        <CardHeader title="Your currencies" />
        <CardContent className={classes.cardContent}>
          <List>
            {currencies.map(({ id, title, rate }) => {
              const value = id;
              const labelId = `currency-list-title-${id}`;
              return (
                <motion.div
                  initial={{ x: 200 }}
                  animate={{ x: 0 }}
                  transition={{
                    ease: 'easeOut',
                    duration: 0.1,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <ListItem
                    key={value}
                    role={undefined}
                    dense
                    button
                    onClick={() => handleToggle(id)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={currenciesChecked.indexOf(id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${title}`} />
                    <ListItemText
                      primaryTypographyProps={{ variant: 'h4' }}
                      primary={`${rate}`}
                      style={{
                        marginRight: 0,
                        width: 'auto',
                        flex: '0 0 auto',
                      }}
                    />
                  </ListItem>
                </motion.div>
              );
            })}
          </List>
        </CardContent>
      </Card>
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
