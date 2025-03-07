import { createSlice } from '@reduxjs/toolkit';
import { OrderEnum } from 'modules/common/enums';
import { ComplexError } from 'modules/common/types';
import { activateUserAction, deactivateUserAction, fetchUsersAction } from 'modules/users/actions';
import { UsersSortEnum } from 'modules/users/enums';
import { UserInterface } from 'modules/users/interfaces';

export interface UserListStateInterface {
  isLoading: boolean;
  error: ComplexError | null;
  users: UserInterface[];
  totalCount: number;
  limit: number;
  offset: number;
  currentPage: number;
  order: {
    sort: UsersSortEnum;
    order: OrderEnum;
  };
}

const initialState: UserListStateInterface = {
  isLoading: false,
  error: null,
  users: [],
  totalCount: 0,
  limit: 20,
  offset: 0,
  currentPage: 0,
  order: {
    sort: UsersSortEnum.CREATED_AT,
    order: OrderEnum.ASC,
  },
};

const fetchUsersReducerPending = (state = initialState) => {
  state.isLoading = true;
};

const fetchUsersReducerError = (state = initialState, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const fetchUsersReducerSuccess = (state = initialState, { payload: { data, totalCount } }) => {
  state.isLoading = false;
  state.error = null;
  state.totalCount = totalCount;
  state.users = data;
};

const changeUserActiveStatusReducerSuccess = (state = initialState, { payload: { id, active } }) => {
  const idx = state.users.findIndex(user => user.id === id);
  state.users[idx].active = active;
};

export const userListSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersAction: (state, action) => {
      state.users = action.payload;
    },
    setUsersRowsCount: (state, { payload }) => {
      const { rowsCount } = payload;
      state.limit = rowsCount;
    },
    setUsersPagination: (state, { payload }) => {
      const { currentPage, limit } = payload;
      state.offset = currentPage * limit;
      state.currentPage = currentPage;
      state.limit = limit;
    },
    setUsersOrder: (state, { payload }) => {
      const { sort, order } = payload;
      state.order.sort = sort;
      state.order.order = order;
    },
  },
  extraReducers: {
    [fetchUsersAction.pending.type]: fetchUsersReducerPending,
    [fetchUsersAction.rejected.type]: fetchUsersReducerError,
    [fetchUsersAction.fulfilled.type]: fetchUsersReducerSuccess,
    [activateUserAction.fulfilled.type]: changeUserActiveStatusReducerSuccess,
    [deactivateUserAction.fulfilled.type]: changeUserActiveStatusReducerSuccess,
  },
});

export const { setUsersAction, setUsersPagination, setUsersRowsCount, setUsersOrder } = userListSlice.actions;

export { fetchUsersAction };
