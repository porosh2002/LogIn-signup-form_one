import { createSelector } from 'reselect';
const selectAccountMenu = state => state.VideoReducer;
export const AccountMenu = createSelector(
  [selectAccountMenu],
  videoData => videoData.video
);
