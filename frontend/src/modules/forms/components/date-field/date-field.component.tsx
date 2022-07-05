import { TextField, TextFieldProps } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateFnsLocaleContext } from 'modules/date-time/contexts';
import React, { useContext } from 'react';

interface IProps extends Omit<DatePickerProps<Date>, 'renderInput'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderInput?: (props: TextFieldProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  textFieldProps?: TextFieldProps;
}

const maskMap = {
  en: '__/__/____',
  de: '__.__.____',
};

export const DateField: React.FC<IProps> = ({ textFieldProps, ...props }) => {
  const locale = useContext(DateFnsLocaleContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
      <DatePicker
        mask={maskMap[locale?.code]}
        renderInput={(params) => <TextField {...params} {...textFieldProps} />}
        {...props}
      />
    </LocalizationProvider>
  );
};
