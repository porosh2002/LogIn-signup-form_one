import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import userSET from './user/reducers';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};
const rootReducer = combineReducers({
  user:userSET,
});
export default persistReducer(persistConfig, rootReducer);