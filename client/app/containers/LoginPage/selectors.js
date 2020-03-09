import { createSelector } from 'reselect';
import { get } from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

const selectLoginEmail = state =>
  get(state, 'loginPage.email', initialState.email);
const selectLoginPassword = state =>
  get(state, 'loginPage.password', initialState.password);
const selectLoginAuth = state =>
  get(state, 'loginPage.auth', initialState.auth);

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(selectLoginPageDomain, substate => substate);

export const makeSelectLoginEmail = () =>
  createSelector(selectLoginEmail, substate => substate);

export const makeSelectLoginPassword = () =>
  createSelector(selectLoginPassword, substate => substate);

export const makeSelectAuth = () =>
  createSelector(selectLoginAuth, substate => substate);

export default makeSelectLoginPage;
export { selectLoginPageDomain };
