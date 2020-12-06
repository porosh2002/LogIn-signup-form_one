import { createSelector } from 'reselect';
const selectAccountMenu = state => state.AccountMenu;
export const AccountMenu = createSelector(
  [selectAccountMenu],
  accountmenu => accountmenu.account_menu
);
