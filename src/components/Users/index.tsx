import Box from '@mui/material/Box';
import DrawerContainer from 'components/common/Drawer';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Stack } from '@mui/material';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { userNotFound } from 'enums';
import useUsersStyle from './Users.styles';
import { usersService } from 'services/users/users.service';
import { UsersTable } from 'models/types';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 1,
        pb: 0,
        justifyContent: 'space-between',
        display: 'flex',
      }}
    >
      <GridToolbarQuickFilter placeholder='Поиск пользователя...' />
      <Button variant='contained'>Новый пользователь</Button>
    </Box>
  );
}

const UsersPage: FC = () => {
  const classes = useUsersStyle();
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState<UsersTable[]>([]);
  const { users } = usersService;

  useEffect(() => {
    usersService.fetchAllUsers();
  }, []);

  useEffect(() => {
    users?.map((item) => {
      setRows([
        ...rows,
        {
          id: item.id,
          user: `${item.lastname.toUpperCase()} ${item.firstname[0].toUpperCase()}.`,
        },
      ]);
    });
  }, [users]);

  const deleteUser = useCallback(
    (id: GridRowId) => () => {
      // setTimeout(() => {
      //   setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      // });
    },
    []
  );

  const editUser = useCallback(
    (id: GridRowId) => () => {
      // setTimeout(() => {
      //   setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      // });
    },
    []
  );

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'user', headerName: 'ФАМИЛИЯ И.', flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params: { id: GridRowId }) => [
        <GridActionsCellItem
          icon={<DeleteOutlinedIcon />}
          label='Delete'
          onClick={deleteUser(params.id)}
        />,
        <GridActionsCellItem
          icon={<EditOutlinedIcon />}
          label='Toggle Admin'
          onClick={editUser(params.id)}
        />,
      ],
    },
  ];

  return (
    <DrawerContainer>
      <Box sx={{ height: '90vh', width: 1 }}>
        <DataGrid
          className={classes.root}
          columns={columns}
          rows={rows}
          disableColumnMenu
          components={{
            Toolbar: QuickSearchToolbar,
            NoResultsOverlay: () => (
              <Stack height='100%' alignItems='center' justifyContent='center'>
                {userNotFound}
                <SentimentDissatisfiedOutlinedIcon />
              </Stack>
            ),
          }}
          isCellEditable={() => false}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          loading={!users}
        />
      </Box>
    </DrawerContainer>
  );
};

export default observer(UsersPage);
