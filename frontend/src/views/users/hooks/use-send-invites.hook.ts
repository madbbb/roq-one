import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { UserInviteInterface } from 'modules/user-invites';
import { sendUserInvitesAction, SendUserInvitesResponseInterface } from 'modules/user-invites/actions';
import { useDispatch } from 'react-redux';

export interface UseSendInvitesInterface {
  sendInvites: (userInvites: UserInviteInterface[]) => Promise<SendUserInvitesResponseInterface>;
}

interface UseSendInvitesHookParams {
  userId: string;
}

export const useSendInvites = ({ userId }: UseSendInvitesHookParams): UseSendInvitesInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const sendInvites = async (userInvites: UserInviteInterface[]) => {
    const result = await dispatch(
      sendUserInvitesAction({
        mutation: gql`
          mutation CreateUserInvites($userInvites: UserInvitesCreateDto!) {
            sendUserInvites(userInvites: $userInvites) {
              success {
                id
                email
                firstName
                lastName
                status
                createdAt
              }
              errors {
                error
                email
              }
            }
          }
        `,
        variables: {
          userInvites: { userInvites: userInvites.map((invite) => ({ ...invite, createdByUserId: userId })) },
        },
      }),
    );
    return result.payload as SendUserInvitesResponseInterface
  }

  return {
    sendInvites,
  };
};
