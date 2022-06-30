import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useDrawerContainerStyle = makeStyles((theme: Theme) => ({
  sidbar: {
    '& .MuiDrawer-paperAnchorLeft.MuiDrawer-paperAnchorDockedLeft': {
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiListItem-root.Mui-selected': {
      backgroundColor: 'rgb(0 0 0 / 23%)',
    },
    '& li.MuiListItem-root:hover': {
      backgroundColor: 'rgb(0 0 0 / 30%)',
    },
  },
  whiteColor: {
    color: theme.palette.common.white,
  },
}));

export default useDrawerContainerStyle;
