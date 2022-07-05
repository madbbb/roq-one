import { configureStore } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { loadState, saveState, StateInterface } from 'configuration/redux/local-store';
import reducer from 'configuration/redux/reducer';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import { AuthStateInterface } from 'modules/auth';
import { LayoutStateInterface } from 'modules/layout/layout.slice';
import { MessageCenterStateInterface } from 'modules/message-center';
import { NotificationPreferencesStateInterface } from 'modules/notification-preferences/notification-preferences.slice';
import { NotificationsStateInterface } from 'modules/notifications/notifications.slice';
import { ThemeStateInterface } from 'modules/theme/theme.slice';
import { UserFilesStateInterface } from 'modules/user-files/user-files.slice';
import { UserInvitesStateInterface } from 'modules/user-invites/user-invites.slice';
import { UsersStateInterface } from 'modules/users/users.slice';

export interface StoreInterface {
  auth: AuthStateInterface;
  notifications: NotificationsStateInterface;
  notificationPreferences: NotificationPreferencesStateInterface;
  messageCenter: MessageCenterStateInterface;
  theme: ThemeStateInterface;
  layout: LayoutStateInterface;
  userFiles: UserFilesStateInterface;
  users: UsersStateInterface;
  userInvites: UserInvitesStateInterface;
}

const persistedState = loadState();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState: persistedState,
});

let currentState: StateInterface = {
  theme: {},
  layout: {},
};

store.subscribe(() => {
  const newState = pick(store.getState(), Object.keys(currentState)) as StateInterface;

  if (!isEqual(currentState, newState)) {
    saveState(newState);
  }

  currentState = newState;
});

export type AppDispatch = typeof store.dispatch;

// eslint-disable-next-line @roq/exports-should-follow-conventions
export default store;
