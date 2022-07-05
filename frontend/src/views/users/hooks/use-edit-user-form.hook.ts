import { useEnhancedFormik, UseEnhancedFormikInterface } from 'modules/forms/hooks';
import { useLocales } from 'modules/locale';
import { LocaleOptionInterface } from 'modules/locale/hooks';
import { useUserUpdate } from 'modules/users/hooks';
import { UserInterface } from 'modules/users/interfaces';
import { SyntheticEvent, useCallback, useMemo } from 'react';
import { useEditUserFormSchema } from 'views/users/hooks';

export interface EditUserFormValuesInterface {
  firstName: string;
  lastName: string;
  email: string;
  locale?: LocaleOptionInterface | null;
  timezone: string;
  optedInAt?: Date;
}

export interface UseEditUserFormInterface extends UseEnhancedFormikInterface<EditUserFormValuesInterface> {
  onLocaleChange: (event: SyntheticEvent, option: LocaleOptionInterface) => void;
  onTimezoneChange: (event: SyntheticEvent, option: string) => void;
  localeOptions: LocaleOptionInterface[];
}

export const useEditUserForm = (user: UserInterface, onSubmitSuccess: () => void): UseEditUserFormInterface => {
  const { updateUser } = useUserUpdate();
  const { localeOptions } = useLocales();

  const initialValues = useMemo(
    () => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      locale: (Boolean(user.locale) && localeOptions.find((l) => l.id === user.locale)) || null,
      timezone: user.timezone,
      optedInAt: user.optedInAt,
    }),
    [user.firstName, user.lastName, user.locale, user.timezone],
  );

  const onSubmit = useCallback(
    (formValues: EditUserFormValuesInterface) => {
      void updateUser(user.id, {
        ...formValues,
        locale: formValues.locale?.id,
      });

      onSubmitSuccess()
    },

    [user.id, updateUser],
  );

  const formik = useEnhancedFormik<EditUserFormValuesInterface>({
    enableReinitialize: true,
    initialValues,
    onSubmit,
    onSubmitSuccess,
    validationSchema: useEditUserFormSchema(),
  });

  const onLocaleChange = useCallback(
    (_: SyntheticEvent, locale: LocaleOptionInterface) => {
      void formik.setFieldValue('locale', locale);
    },
    [formik.setFieldValue],
  );

  const onTimezoneChange = useCallback(
    (_: SyntheticEvent, timezone: string) => {
      void formik.setFieldValue('timezone', timezone);
    },
    [formik.setFieldValue],
  );

  return {
    localeOptions,
    onLocaleChange,
    onTimezoneChange,
    ...formik,
  };
};
