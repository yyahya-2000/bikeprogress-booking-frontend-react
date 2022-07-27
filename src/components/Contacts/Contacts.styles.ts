import { makeStyles } from '@mui/styles';

const useContactsStyle = makeStyles(() => ({
  root: {
    '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus': {
      outline: 0,
    },
  },
}));

export default useContactsStyle;
