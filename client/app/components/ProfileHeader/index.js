/**
 *
 * ProfileHeader
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// @material
import { fade, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import CircularProgress from '@material-ui/core/CircularProgress';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function ProfileHeader({ currencies, addCurrency, removeCurrency }) {
  const [selectedCurrency, setSelectedCurrency] = useState({ title: '' });
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'mobile-menu';

  const handleProfileMenuOpen = () => {};
  const handleMobileMenuOpen = () => {};

  const handleAutocompleteChange = (e, value) => {
    setAutocompleteLoading(true);

    setTimeout(() => {
      setSelectedCurrency({ title: '' });
      setAutocompleteLoading(false);

      addCurrency(value.id);
    }, 700);
  };

  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Currency Rate
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Autocomplete
              blurOnSelect
              clearOnEscape
              loading={autocompleteLoading}
              value={selectedCurrency}
              onChange={handleAutocompleteChange}
              options={currencies}
              getOptionLabel={option => option.title}
              renderInput={params => (
                <InputBase
                  {...params}
                  placeholder="Search…"
                  inputProps={{
                    'aria-label': 'search',
                    ...params.inputProps,
                  }}
                  ref={params.InputProps.ref}
                  className={classes.inputBase}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  endAdornment={
                    autocompleteLoading ? (
                      <CircularProgress
                        color="secondary"
                        size={24}
                        style={{ marginRight: 10, marginLeft: '-34px' }}
                      />
                    ) : null
                  }
                />
              )}
            />
          </div>
          <div style={{ flexGrow: 1 }} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit"> */}
            {/*   <Badge badgeContent={4} color="secondary"> */}
            {/*     <MailIcon /> */}
            {/*   </Badge> */}
            {/* </IconButton> */}
            <Button style={{ color: '#fff', marginRight: 10 }} size="small">
              <AttachMoneyIcon />
              Currency
            </Button>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={7} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ProfileHeader.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
    }),
  ).isRequired,
  addCurrency: PropTypes.func.isRequired,
  removeCurrency: PropTypes.func.isRequired,
};

export default memo(ProfileHeader);
