import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useAddContactStyle = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 600,
    color: theme.palette.common.black,
  },
  flexBasis50: {
    flexBasis: '50%',
  },
  flexBasis33: {
    flexBasis: '33%',
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

export default useAddContactStyle;
