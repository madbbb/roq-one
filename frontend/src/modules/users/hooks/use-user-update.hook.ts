import { gql } from '@apollo/client'
import { requestGql } from 'modules/common/utils/request-gql';
import { updateUserAction } from 'modules/users/users.slice';
import { useDispatch } from 'react-redux';

export interface UserUpdateValuesInterface {
  firstName?: string;
  lastName?: string;
  timezone?: string;
  locale?: string;
}

export interface UseUserUpdateInterface {
  updateUser: (id: string, user: UserUpdateValuesInterface) => Promise<UserUpdateValuesInterface>;
}

export const useUserUpdate = (): UseUserUpdateInterface => {
  const dispatch = useDispatch();

  const updateUser = (id: string, user: UserUpdateValuesInterface) =>
    requestGql(
      {
        mutation: gql`mutation updateUser(
            $id: ID!,
            $user: UserUpdateDto!,
          ) {
            updateUser(
              id: $id
              user: $user
            ) {
              id
              email
              firstName
              lastName
              timezone
              locale
            }
          }
        `,
        variables: { id, user },
      },
      null,
      'updateUser'
    ).then(async (data) => {
      await dispatch(updateUserAction(data));
      return data;
    });

  return {
    updateUser,
  };
};
