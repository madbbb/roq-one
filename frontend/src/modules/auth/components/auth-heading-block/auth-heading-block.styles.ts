import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useAuthHeadingBlockStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(5),
    },
  },
}));
