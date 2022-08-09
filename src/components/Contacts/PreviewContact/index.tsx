import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useState } from 'react';
import DrawerContainer from 'components/common/Drawer';
import { getParameterFromUrl } from 'utils';
import { useNavigate } from 'react-router-dom';
import { contactsService } from 'services/contacts/contacts.service';
import usePreviewContactStyle from './PreviewContact.styles';
import Spiner from 'components/common/Spiner';
import { Box, Button, Grid, Typography } from '@mui/material';
import { routes } from 'routers';
import ConfirmDialog from 'components/common/ConfirmDialog';

const PreviewContactPage: FC = () => {
  const classes = usePreviewContactStyle();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const idContact = getParameterFromUrl('id');
  const { previewContact, previewLoading } = contactsService;
  const navigate = useNavigate();
  useEffect(() => {
    if (idContact) {
      contactsService.fetchContactById(idContact);
    }
  }, []);

  const deleteContact = useCallback(
    () => () => {
      setTimeout(() => {
        if (idContact) {
          contactsService.deleteContactById(idContact);
          navigate(-1);
        }
      });
    },
    []
  );

  if (!previewLoading) {
    return (
      <DrawerContainer>
        <Spiner />
      </DrawerContainer>
    );
  } else {
    return (
      <>
        <DrawerContainer>
          <Grid className={classes.root}>
            <Grid>
              <Box mb={3}>
                <Button
                  className={classes.goBackBtn}
                  variant='text'
                  onClick={() => navigate(-1)}
                >
                  {'< НАЗАД'}
                </Button>
              </Box>
              <Box>ID {previewContact.id}</Box>
              <Typography
                variant='h4'
                component='div'
                gutterBottom
                className={classes.title}
                my={5}
              >
                {previewContact.lastname.charAt(0).toUpperCase() +
                  previewContact.lastname.slice(1).toLowerCase() +
                  ' ' +
                  previewContact.firstname.charAt(0).toUpperCase() +
                  '.' +
                  (previewContact.patronymic
                    ? ' ' +
                      previewContact.patronymic?.charAt(0).toUpperCase() +
                      '.'
                    : '')}
              </Typography>
              <Grid container>
                <Grid className={classes.flexBasis30}>
                  <Typography className={classes.titleSection}>Имя</Typography>
                  <Typography>
                    {previewContact.firstname.charAt(0).toUpperCase() +
                      previewContact.firstname.slice(1).toLowerCase()}
                  </Typography>
                </Grid>
                <Grid className={classes.flexBasis30}>
                  <Typography className={classes.titleSection}>
                    Телефон
                  </Typography>
                  <Typography>{previewContact.phone_number}</Typography>
                </Grid>
                {/* <Grid className={classes.flexBasis30}>
                  <Typography className={classes.titleSection}>
                    Допуск
                  </Typography>
                  <Typography>{previewContact.position}</Typography>
                </Grid> */}
              </Grid>
              <Grid container my={2}>
                <Grid className={classes.flexBasis30}>
                  <Typography className={classes.titleSection}>
                    Фамилия
                  </Typography>
                  <Typography>
                    {previewContact.lastname.charAt(0).toUpperCase() +
                      previewContact.lastname.slice(1).toLowerCase()}
                  </Typography>
                </Grid>
                <Grid className={classes.flexBasis30}>
                  <Typography className={classes.titleSection}>
                    Email
                  </Typography>
                  <Typography>{previewContact.email}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Button
                className={classes.UnsetTextTrans}
                onClick={() =>
                  navigate(routes.editContact + `?id=${previewContact.id}`)
                }
              >
                Редактировать данные
              </Button>
              <Button
                className={`${classes.UnsetTextTrans}  ${classes.blackColor}`}
                onClick={() => setIsDialogOpen(true)}
              >
                Удалить контакт
              </Button>
            </Grid>
          </Grid>
        </DrawerContainer>
        <ConfirmDialog
          title='Удаление пользователя...'
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          onConfirm={deleteContact()}
        >
          Вы уверены, что хотите удалить этого пользователя?
        </ConfirmDialog>
      </>
    );
  }
};

export default observer(PreviewContactPage);
