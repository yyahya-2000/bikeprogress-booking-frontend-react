import { Box, Button, Stack } from '@mui/material';
import ConfirmDialog from 'components/common/ConfirmDialog';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useState } from 'react';
import DrawerContainer from 'components/common/Drawer';
import {
  DataGrid,
  GridActionsCellItem,
  GridRenderCellParams,
  GridRowId,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import useContactsStyle from './Contacts.styles';
import { useNavigate } from 'react-router-dom';
import { contactsService } from 'services/contacts/contacts.service';
import { ContactTableItem } from 'models/types';
import { contactNotFound } from 'enums';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { routes } from 'routers';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CopyToClipboard from 'components/common/CopyToClipboard';

const ContactsPage: FC = () => {
  const classes = useContactsStyle();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idUserToDelete, setIdUserToDelete] = useState<GridRowId>();
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);
  const { contactsTable, isCallDone } = contactsService;
  const [rows, setRows] = useState<ContactTableItem[]>([]);

  useEffect(() => {
    contactsService.fetchContacts();
  }, []);

  useEffect(() => {
    setRows(contactsTable.map((row) => row));
  }, [contactsTable]);

  const deleteContact = useCallback(
    (idContactToDelete_: GridRowId | undefined) => () => {
      setTimeout(() => {
        if (idContactToDelete_) {
          contactsService.deleteContactById(idContactToDelete_.toString());
          contactsService.fetchContacts();
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
        <GridToolbarQuickFilter placeholder='Поиск контакта...' />
        <Button variant='contained' onClick={() => navigate(routes.addContact)}>
          Новый Контакт
        </Button>
      </Box>
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 65 },
    { field: 'name', headerName: 'ФАМИЛИЯ И.О.', flex: 0.2 },
    {
      field: 'phone_number',
      headerName: 'ТЕЛЕФОН',
      flex: 0.2,
      renderCell: (params: GridRenderCellParams<string>) => (
        <CopyToClipboard>
          {({ copy }) => (
            <>
              <GridActionsCellItem
                icon={
                  <ContentCopyOutlinedIcon color='primary' fontSize='small' />
                }
                label='Просмотр'
                onClick={() => {
                  if (params.value) {
                    navigator.clipboard.writeText(params.value);
                  }
                }}
              />
              {params.value}
            </>
          )}
        </CopyToClipboard>
      ),
    },
    {
      field: 'email',
      headerName: 'ПОЧТА',
      flex: 0.2,
      renderCell: (params: GridRenderCellParams<string>) => (
        <CopyToClipboard>
          {({ copy }) => (
            <>
              <GridActionsCellItem
                icon={
                  <ContentCopyOutlinedIcon color='primary' fontSize='small' />
                }
                label='Просмотр'
                onClick={() => {
                  if (params.value) {
                    navigator.clipboard.writeText(params.value);
                  }
                }}
              />
              {params.value}
            </>
          )}
        </CopyToClipboard>
      ),
    },
    { field: 'booking_number', headerName: 'БРОНЕЙ ВСЕГО', flex: 0.2 },
    { field: 'cost', headerName: 'СУММА ПОКУПОК, РУБ', flex: 0.2 },
    {
      field: 'actions',
      type: 'actions',
      width: 110,
      getActions: (params: { id: GridRowId }) => [
        <GridActionsCellItem
          icon={<RemoveRedEyeOutlinedIcon />}
          label='Просмотр'
          onClick={() => navigate(routes.previewContact + `?id=${params.id}`)}
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
                  {contactNotFound}
                  <SentimentDissatisfiedOutlinedIcon />
                </Stack>
              ),
            }}
            isCellEditable={() => false}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            loading={!isCallDone}
          />
        </Box>
      </DrawerContainer>
      <ConfirmDialog
        title='Удаление контакта...'
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onConfirm={deleteContact(idUserToDelete)}
      >
        Вы уверены, что хотите удалить этого контакта?
      </ConfirmDialog>
    </>
  );
};

export default observer(ContactsPage);
