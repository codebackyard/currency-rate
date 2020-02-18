/**
 *
 * ProfileCurrencyItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

// @framer-motion
import { motion, useCycle } from 'framer-motion';

import { makeStyles } from '@material-ui/core/styles';

// @material-ui
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui/table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const useStyle = makeStyles(theme => ({
  listItem: {
    paddingRight: 32,
    paddingLeft: 32,
  },
  table: {
    marginTop: 16,
  },
  tableCell: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  detailsLoaderWrapper: {
    minHeight: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const currencies = [
  { id: 1, title: 'US Dollar', rate: 1 },
  { id: 2, title: 'UK Pound', rate: 0.94 },
  { id: 3, title: 'IR Rial', rate: 0.01 },
  { id: 4, title: 'Euro', rate: 0.97 },
  { id: 5, title: 'TR Lira', rate: 0.4 },
  { id: 6, title: 'BTC', rate: 7670 },
];

const animationVariants = {
  collapse: {
    height: 60,
  },
  expand: {
    height: 450,
  },
};

function ProfileCurrencyItem({
  currency: { id, title, rate },
  onClick,
  withDetails,
  isLoadingDetails,
}) {
  const classes = useStyle();

  const labelId = `currency-list-title-${id}`;

  // const [focusAnimate, toggleFocus] = useCycle({ height: 60 }, { height: 450 });

  const handleClick = () => {
    onClick(id);
  };
  return (
    <div>
      <motion.div
        onTap={handleClick}
        variants={animationVariants}
        animate={withDetails ? 'expand' : 'collapse'}
      >
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 0.05,
            type: 'spring',
            stiffness: 200,
            damping: 40,
          }}
        >
          <ListItem
            key={id}
            role={undefined}
            button
            component="a"
            className={classes.listItem}
          >
            <ListItemText id={labelId} primary={`${title}`} />
            <ListItemText
              primaryTypographyProps={{ variant: 'bold' }}
              primary={rate}
              style={{
                marginRight: 0,
                width: 'auto',
                flex: '0 0 auto',
                fontWeight: '900',
              }}
            />
          </ListItem>
        </motion.div>
        {withDetails ? (
          isLoadingDetails ? (
            <div className={classes.detailsLoaderWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <TableContainer>
              <Table className={classes.table} aria-label="Simple Table">
                <TableHead>
                  <TableRow>
                    <TableCell classes={{ root: classes.tableCell }}>
                      Currency
                    </TableCell>
                    <TableCell
                      classes={{ root: classes.tableCell }}
                      align="right"
                    >
                      Rate
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currencies.map(currency => (
                    <TableRow key={currency.id}>
                      <TableCell classes={{ root: classes.tableCell }}>
                        {currency.title}
                      </TableCell>
                      <TableCell
                        classes={{ root: classes.tableCell }}
                        align="right"
                      >
                        {currency.rate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
        ) : null}
      </motion.div>
    </div>
  );
}

ProfileCurrencyItem.propTypes = {
  currency: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
  }),
  onClick: PropTypes.func,
  withDetails: PropTypes.bool,
  isLoadingDetails: PropTypes.bool,
};

ProfileCurrencyItem.defaultProps = {
  onClick: () => {},
  withDetails: false,
  isLoadingDetails: false,
};

export default memo(ProfileCurrencyItem);
