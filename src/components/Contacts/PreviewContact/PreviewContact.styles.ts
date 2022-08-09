import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const usePreviewContactStyle = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  goBackBtn: {
    marginLeft: '-20px',
  },
  flexBasis30: {
    flexBasis: '30%',
  },
  titleSection: {
    color: theme.palette.grey[100],
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '90vh',
  },
  UnsetTextTrans: {
    textTransform: 'unset',
  },
  blackColor: {
    color: theme.palette.text.primary,
  },
}));

export default usePreviewContactStyle;
