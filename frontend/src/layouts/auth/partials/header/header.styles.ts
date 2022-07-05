import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeEnum } from 'modules/theme/enums';

export const useHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'center',
    [theme.breakpoints.between('sm', 'md')]: {
      margin: 0,
    }
  },
  backWrapper: {
    [theme.breakpoints.between('sm', 'md')]: {
      margin: theme.spacing(3, 4, 1)
    },
  },
  logoWrapper: {
    paddingTop: theme.spacing(1),
    [theme.breakpoints.between('sm', 'md')]: {
      backgroundColor: theme.palette.grey[900],
    },
  },
  logo: {
    width: 'auto',
    height: 24,
    [theme.breakpoints.between('sm', 'md')]: {
      width: 'auto',
      height: 24,
    },
  },
  languageSwitcherWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.between('sm', 'md')]: {
      margin: theme.spacing(3, 4, 1),
    },
  },
  languageSwitcherMenuWrapper: {
    backgroundColor: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.background.paper : '#45536a',
    border: theme.palette.mode === ThemeEnum.LIGHT ? '2px solid #f8fafc' : 'unset',
    boxSizing: 'border-box',
    borderRadius: '10px',
  },
}));
