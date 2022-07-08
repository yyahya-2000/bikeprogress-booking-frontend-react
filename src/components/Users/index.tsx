import Box from '@mui/material/Box';
import DrawerContainer from 'components/common/Drawer';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { userNotFound } from 'enums';
import useUsersStyle from './Users.styles';
import { usersService } from 'services/users/users.service';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ConfirmDialog from 'components/common/ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routers';
import { UsersTable } from 'models/types';

const UsersPage: FC = () => {
  const classes = useUsersStyle();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idUserToDelete, setIdUserToDelete] = useState<GridRowId>();
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);
  const { usersTable, usersFetched } = usersService;
  const [rows, setRows] = useState<UsersTable[]>([]);
  useEffect(() => {
    usersService.fetchAllUsers();
  }, []);

  useEffect(() => {
    setRows(usersTable.map((row) => row));
  }, [usersTable]);

  const deleteUser = useCallback(
    (idUserToDelete_: GridRowId | undefined) => () => {
      setTimeout(() => {
        if (idUserToDelete_) {
          usersService.deleteUserById(idUserToDelete_.toString());
          usersService.fetchAllUsers();
        }
      });
    },
    []
  );

  const QuickSearchToolbar = () => {
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
        <Button variant='contained' onClick={() => navigate(routes.addUser)}>
          Новый пользователь
        </Button>
      </Box>
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'user', headerName: 'ФАМИЛИЯ И.', flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      width: 110,
      getActions: (params: { id: GridRowId }) => [
        <GridActionsCellItem
          icon={<RemoveRedEyeOutlinedIcon />}
          label='Просмотр'
          onClick={() => navigate(routes.previewUser + `?id=${params.id}`)}
        />,
        <GridActionsCellItem
          icon={<EditOutlinedIcon />}
          label='Отредоктировать'
          onClick={() => navigate(routes.editUser + `?id=${params.id}`)}
        />,
        <GridActionsCellItem
          onClick={() => {
            setIsDialogOpen(true);
            setIdUserToDelete(params.id);
          }}
          icon={<DeleteOutlinedIcon />}
          label='Удалить'
        />,
      ],
    },
  ];

  return (
    <>
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
                <Stack
                  height='100%'
                  alignItems='center'
                  justifyContent='center'
                >
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
            loading={!usersFetched}
          />
        </Box>
      </DrawerContainer>
      <ConfirmDialog
        title='Удаление пользователя...'
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onConfirm={deleteUser(idUserToDelete)}
      >
        Вы уверены, что хотите удалить этого пользователя?
      </ConfirmDialog>
    </>
  );
};

export default observer(UsersPage);
