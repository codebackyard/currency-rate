/**
 *
 * ProfilePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// @framer-motion
import { motion, useCycle } from 'framer-motion';

// @material
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import Skeleton from '@material-ui/lab/Skeleton';

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import CommentIcon from '@material-ui/icons/Comment';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import ProfileHeader from 'components/ProfileHeader';
import ProfileCurrencyItem from 'components/ProfileCurrencyItem';

import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { useAuth } from '../../context/auth-context';

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: 26,
  },
  card: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    bottom: 0,
    right: 0,
    left: 0,
    top: 100,
    width: '100%',
    maxWidth: 600,
    overflowY: 'auto',

    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardContent: {},
  skeleton: {
    marginBottom: 10,
    height: 50,
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

const theme = createMuiTheme({
  typography: {
    bold: {
      fontSize: 10,
      fontWeight: 900,
    },
  },
});

const CURRENCIES = [
  { id: 1, title: 'US Dollar', rate: 1 },
  { id: 2, title: 'UK Pound', rate: 0.94 },
  { id: 3, title: 'IR Rial', rate: 0.01 },
  { id: 4, title: 'Euro', rate: 0.97 },
  { id: 5, title: 'TR Lira', rate: 0.4 },
  { id: 6, title: 'BTC', rate: 7670 },
];

function ListItemLoader(props) {
  return <Skeleton animation="wave" variant="rect" {...props} />;
}

const cardHeaderVariants = {
  hide: {
    y: -50,
    height: 0,
  },
  show: {
    y: 0,
    height: 72,
  },
};

const backBtnVariants = {
  hide: {
    y: -120,
    height: 0,
    opacity: 0,
  },
  show: {
    y: 0,
    height: 72,
    opacity: 1,
  },
};

export function ProfilePage() {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  const [currencySelected, setCurrencySelected] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [isCurrencyLoading, setCurrencyLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCurrencies([CURRENCIES[0], CURRENCIES[1]]);
    }, 500);
  }, []);

  // const auth = useAuth();
  const classes = useStyles(theme);

  const handleSelectCurrency = id => {
    if (id === currencySelected) return setCurrencySelected(null);

    setCurrencySelected(id);
    setCurrencyLoading(true);
    setTimeout(() => {
      setCurrencyLoading(false);
    }, 2000);
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
      <div className={classes.body}>
        <Container maxWidth="sm">
          <Grid container>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <motion.div
                  animate={currencySelected ? 'hide' : 'show'}
                  variants={cardHeaderVariants}
                >
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" color="textSecondary">
                      Your Currencies
                    </Typography>
                  </CardContent>
                </motion.div>
                <motion.div
                  animate={currencySelected ? 'show' : 'hide'}
                  variants={backBtnVariants}
                >
                  <CardContent className={classes.cardContent}>
                    <IconButton onClick={() => setCurrencySelected(null)}>
                      <ArrowBack />
                    </IconButton>
                  </CardContent>
                </motion.div>
                <List>
                  {!Array.isArray(currencies)
                    ? [1, 2, 3].map(item => (
                        <ListItemLoader
                          key={item}
                          className={classes.skeleton}
                        />
                      ))
                    : currencies.map(currency => {
                        if (
                          currencySelected &&
                          currency.id !== currencySelected
                        )
                          return null;
                        return (
                          <ProfileCurrencyItem
                            currency={currency}
                            onClick={handleSelectCurrency}
                            key={currency.id}
                            withDetails={currencySelected}
                            isLoadingDetails={isCurrencyLoading}
                          />
                        );
                      })}
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
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
