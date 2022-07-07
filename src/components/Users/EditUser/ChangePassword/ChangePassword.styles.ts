import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useChangePasswordStyle = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  greyText: {
    color: theme.palette.grey[100],
    alignSelf: 'center',
    marginLeft: '1rem',
  },
  flexBasis50: {
    flexBasis: '50%',
  },
  cancelBtn: {
    marginLeft: '2rem',
  },
  saveBtn: {
    minWidth: '200px',
  },
  goBackBtn: {
    marginLeft: '-20px',
  },
}));

export default useChangePasswordStyle;
