import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useEditUserStyle = makeStyles((theme: Theme) => ({
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
  goBackBtn: {
    marginLeft: '-20px',
  },
  greyText: {
    color: theme.palette.grey[100],
    alignSelf: 'center',
    marginLeft: '1rem',
  },
  UnsetTextTrans: {
    textTransform: 'unset',
  }
}));

export default useEditUserStyle;
