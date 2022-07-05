import { useTranslation } from 'modules/common/hooks';
import { yup } from 'modules/common/validation';

export const useEditUserFormSchema = (): yup.AnyObjectSchema => {
  const { t } = useTranslation();
  return yup.object({
    firstName: yup.string().trim().required(t('input.first-name.validation.required')),
    lastName: yup.string().trim().required(t('input.last-name.validation.required')),
    locale: yup.object().required(t('input.locale.validation.required')),
    timezone: yup.string().trim().optional().nullable(),
  });
};
