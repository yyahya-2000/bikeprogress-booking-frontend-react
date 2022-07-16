import { Box, Button, Grid, Typography } from '@mui/material';
import DrawerContainer from 'components/common/Drawer';
import Spiner from 'components/common/Spiner';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useState } from 'react';
import { usersService } from 'services/users/users.service';
import { getParameterFromUrl } from 'utils';
import { useNavigate } from 'react-router-dom';
import usePreviewUserStyle from './PreviewUser.styles';
import { routes } from 'routers';
import ConfirmDialog from 'components/common/ConfirmDialog';

const PreviewUserPage: FC = () => {
  const classes = usePreviewUserStyle();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const idUser = getParameterFromUrl('id');
  const { currentUser, previewUser, previewLoading } = usersService;
  const navigate = useNavigate();

  useEffect(() => {
    if (idUser) {
      usersService.fetchUserById(idUser);
    }
  }, []);

  const deleteUser = useCallback(
    () => () => {
      setTimeout(() => {
        if (idUser) {
          usersService.deleteUserById(idUser);
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
              <Box>ID {previewUser.id}</Box>
              <Typography
                variant='h4'
                component='div'
                gutterBottom
                className={classes.title}
                my={5}
              >
                {previewUser.lastname.charAt(0).toUpperCase() +
                  previewUser.lastname.slice(1).toLowerCase() +
                  ' ' +
                  previewUser.firstname.charAt(0).toUpperCase() +
                  '.'}
              </Typography>
              <Grid container>
                <Grid className={classes.flexBasis30}>
                  <Typography className={classes.titleSection}>Имя</Typography>
                  <Typography>
                    {previewUser.firstname.charAt(0).toUpperCase() +
                      previewUser.firstname.slice(1).toLowerCase()}
                  </Typography>
                </Grid>
                <Grid className={classes.flexBasis30}>
                  <Typography className={classes.titleSection}>
                    Телефон
                  </Typography>
                  <Typography>{previewUser.phone_number}</Typography>
                </Grid>
                <Grid className={classes.flexBasis30}>
                  <Typography className={classes.titleSection}>
                    Допуск
                  </Typography>
                  <Typography>{previewUser.position}</Typography>
                </Grid>
              </Grid>
              <Grid container my={2}>
                <Grid className={classes.flexBasis30}>
                  <Typography className={classes.titleSection}>
                    Фамилия
                  </Typography>
                  <Typography>
                    {previewUser.lastname.charAt(0).toUpperCase() +
                      previewUser.lastname.slice(1).toLowerCase()}
                  </Typography>
                </Grid>
                <Grid className={classes.flexBasis30}>
                  <Typography className={classes.titleSection}>
                    Email
                  </Typography>
                  <Typography>{previewUser.email}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Button
                className={classes.UnsetTextTrans}
                onClick={() =>
                  navigate(routes.editUser + `?id=${previewUser.id}`)
                }
              >
                Редактировать данные
              </Button>
              <Button
                className={`${classes.UnsetTextTrans}  ${classes.blackColor}`}
                onClick={() =>
                  navigate(routes.adminChangePassword + `?id=${previewUser.id}`)
                }
              >
                Сменить пароль
              </Button>
              {currentUser.id !== previewUser.id ? (
                <Button
                  className={`${classes.UnsetTextTrans}  ${classes.blackColor}`}
                  onClick={() => setIsDialogOpen(true)}
                >
                  Удалить пользователя
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </DrawerContainer>
        <ConfirmDialog
          title='Удаление пользователя...'
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          onConfirm={deleteUser()}
        >
          Вы уверены, что хотите удалить этого пользователя?
        </ConfirmDialog>
      </>
    );
  }
};

export default observer(PreviewUserPage);
