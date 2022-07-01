import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useAddUserStyle = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 600,
    color: theme.palette.common.black,
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
}));

export default useAddUserStyle;
