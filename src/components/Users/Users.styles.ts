import { makeStyles } from '@mui/styles';

const useUsersStyle = makeStyles(() => ({
  root: {
    '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus':
      {
        outline: 0,
      },
  },
}));

export default useUsersStyle;
