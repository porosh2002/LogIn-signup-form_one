import { createSelector } from 'reselect';
const selectVideo = state => state.VideoFile;
const AccountMenu = createSelector(
  [selectVideo],
  videoData => videoData.video
);
export default AccountMenu