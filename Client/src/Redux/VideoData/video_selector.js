import { createSelector } from 'reselect';
const selectVideo = state => state.VideoReducer;
const AccountMenu = createSelector(
  [selectVideo],
  videoData => videoData.video
);
export default AccountMenu