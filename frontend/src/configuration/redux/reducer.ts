import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';
import pick from 'lodash/pick';
import auth from 'modules/auth/auth.slice';
import layout from 'modules/layout/layout.slice';
import messageCenter from 'modules/message-center/message-center.slice';
import notificationPreferences from 'modules/notification-preferences/notification-preferences.slice';
import notifications from 'modules/notifications/notifications.slice';
import theme from 'modules/theme/theme.slice';
import userFiles from 'modules/user-files/user-files.slice';
import userInvites from 'modules/user-invites/user-invites.slice';
import users from 'modules/users/users.slice';

export const appReducer = combineReducers({
  auth,
  notifications,
  notificationPreferences,
  messageCenter,
  theme,
  layout,
  userFiles,
  users,
  userInvites,
});

export type RootState = ReturnType<typeof appReducer>;

const cleanState = (state: RootState, action: AnyAction, excludeFromReset = ['']): RootState => {
  const cleanedState = pick(state, excludeFromReset) as RootState;
  return appReducer(cleanedState, action);
};

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'auth/logout/fulfilled') {
    return cleanState(state, action, ['theme']);
  }
  return appReducer(state, action);
};

// eslint-disable-next-line @roq/exports-should-follow-conventions
export default rootReducer;
