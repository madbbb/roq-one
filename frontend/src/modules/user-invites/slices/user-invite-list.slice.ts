import { createSlice, current } from '@reduxjs/toolkit';
import { fetchUserInvitesAction, sendUserInvitesAction } from 'modules/user-invites/actions';
import { UserInviteInterface } from 'modules/user-invites/interfaces';

export interface UserInviteListStateInterface {
  isLoading: boolean;
  error: Error;
  userInvites: UserInviteInterface[];
  totalCount: number;
}

const initialState: UserInviteListStateInterface = {
  isLoading: false,
  error: null,
  userInvites: [],
  totalCount: 0,
}

const fetchUserInvitesReducerPending = (state = initialState) => {
  state.isLoading = true;
};

const fetchUserInvitesReducerError = (state = initialState, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const fetchUserInvitesReducerSuccess = (state = initialState, { payload: { data, totalCount } }) => {
  state.isLoading = false;
  state.error = null;
  state.totalCount = totalCount;
  state.userInvites = data;
};

const sendUserInvitesReducerSuccess = (state = initialState, { payload }) => {
  if (payload.success?.length > 0) {
    state.userInvites = [...payload.success, ...current(state.userInvites)];
  }
};

export const userInviteListSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserInvitesAction: (state, action) => {
      state.userInvites = action.payload;
    },
  },
  extraReducers: {
    [fetchUserInvitesAction.pending.type]: fetchUserInvitesReducerPending,
    [fetchUserInvitesAction.rejected.type]: fetchUserInvitesReducerError,
    [fetchUserInvitesAction.fulfilled.type]: fetchUserInvitesReducerSuccess,
    [sendUserInvitesAction.fulfilled.type]: sendUserInvitesReducerSuccess,
  },
});

export const {
  setUserInvitesAction,
} = userInviteListSlice.actions;

export {
  fetchUserInvitesAction,
}
