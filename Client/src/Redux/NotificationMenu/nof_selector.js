import { createSelector } from 'reselect';
const selectNotificationMenu = state => state.NofMenu;
export const NotificationMenu = createSelector(
  [selectNotificationMenu],
  notificationmenu => notificationmenu.notification_menu
);
