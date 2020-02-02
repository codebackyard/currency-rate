import { createSelector } from 'reselect';
import { get } from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the registerPage state domain
 */

const selectRegisterPageDomain = state => state.registerPage || initialState;

/**
 * Other specific selectors
 */

const selectEmail = state =>
  get(state, 'registerPage.email', initialState.email);
const selectPassword = state =>
  get(state, 'registerPage.password', initialState.password);
const selectPasswordConf = state =>
  get(state, 'registerPage.passwordConf', initialState.passwordConf);

/**
 * Default selector used by RegisterPage
 */

const makeSelectRegisterPage = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate,
  );
export const makeSelectEmail = () =>
  createSelector(
    selectEmail,
    substate => substate,
  );
export const makeSelectPassword = () =>
  createSelector(
    selectPassword,
    substate => substate,
  );
export const makeSelectPasswordConf = () =>
  createSelector(
    selectPasswordConf,
    substate => substate,
  );

export default makeSelectRegisterPage;
export { selectRegisterPageDomain };
