import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useConfirmationModalStyles = makeStyles((theme: Theme) => ({
  confirmModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('sm')]: {
      width: 305,
    },
    [theme.breakpoints.up('sm')]: {
      width: 420,
    },
    width: 305,
    padding: '1.5rem',
    wordWrap: 'break-word',
    boxShadow: '0 1rem 1.5rem rgba(0, 0, 0, 0.14), 0 0.375rem 1.875rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem rgba(0, 0, 0, 0.2)',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: 0.25,
    background: theme.palette.background.default,
  },
  confirmMessage: {
    marginBottom: '1rem',
    color: theme.palette.text.primary,
  },
  confirmTitle: {
    marginBottom: '1rem',
  }
}));
