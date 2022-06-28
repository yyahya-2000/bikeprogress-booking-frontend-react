import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useLoginStyle = makeStyles((theme: Theme) => ({
  paper: {
    padding: 20,
    height: 474,
    width: 430,
    margin: "4rem auto",
    position: 'relative',
    backgroundColor: `${theme.palette.grey[50]} !important`,
  },
  title: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    fontWeight: '600 !important',
  },
  submitBtn: {
   backgroundColor: theme.palette.primary.main,
   position: 'absolute!important' as any,
   bottom: 20,
   marginLeft: 'auto !important',
   marginRight: 'auto !important',
   left: 0,
   right: 0,
   maxWidth: 100,
  }
}));

export default useLoginStyle;
