import { QueryOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { UserInviteInterface } from 'modules/user-invites/interfaces';

export interface FetchUserInvitesActionVariablesInterface {}

export interface FetchUserInvitesRequestInterface extends QueryOptions {
  variables: FetchUserInvitesActionVariablesInterface;
}

export interface FetchUserInvitesResponseInterface {
  totalCount: number;
  data: UserInviteInterface[];
}

export const fetchUserInvitesAction = createAsyncThunk(
  'userInvites/fetch',
  (
    request: FetchUserInvitesRequestInterface,
    thunkApi,
  ): Promise<FetchUserInvitesResponseInterface> =>
    requestGql<FetchUserInvitesResponseInterface>(request, thunkApi, 'userInvites'),
);
