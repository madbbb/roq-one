import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { UserInviteStatusEnum } from 'modules/user-invites/enums';
import { UserInviteInterface } from 'modules/user-invites/interfaces';

export interface SendUserInvitesActionVariablesInterface {
  userInvites: {
    userInvites: UserInviteInterface[]
  };
}

export interface SendUserInvitesRequestInterface extends MutationOptions {
  variables: SendUserInvitesActionVariablesInterface;
}

interface SuccessInterface {
  email: string;
  firstName: string;
  lastName: string;
  status?: UserInviteStatusEnum;
}
interface ErrorInterface {
  email: string;
  error: string;
}

export interface SendUserInvitesResponseInterface {
  success: SuccessInterface[];
  errors: ErrorInterface[];
}

export const sendUserInvitesAction = createAsyncThunk(
  'userInvites/sendUserInvites',
  (
    request: SendUserInvitesRequestInterface,
    thunkApi,
  ): Promise<SendUserInvitesResponseInterface> =>
    requestGql<SendUserInvitesResponseInterface>(request, thunkApi, 'sendUserInvites'),
);
