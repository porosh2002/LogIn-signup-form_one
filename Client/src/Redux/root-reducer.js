import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import userSET from './user/reducers';
import AccountMenu from './AccountMenu/reducers'
import VideoReducer from './VideoData/reducers'
import NotificationMenu from './NotificationMenu/reducers'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};
const rootReducer = combineReducers({
  user:userSET,
  AccountMenu:AccountMenu,
  NofMenu: NotificationMenu,
  VideoFile:VideoReducer
});
export default persistReducer(persistConfig, rootReducer);