import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import DrawerContainer from 'components/common/Drawer';
import { authValidations } from 'enums/authorization';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { usersService } from 'services/users/users.service';
import useEditUserStyle from './EditUser.styles';
import { getParameterFromUrl } from 'utils';
import { observer } from 'mobx-react-lite';
import Spiner from 'components/common/Spiner';
import { IEditUserState } from 'models/interfaces';

const EditUserPage: FC = () => {
  const classes = useEditUserStyle();
  const navigate = useNavigate();
  const idUser = getParameterFromUrl('id');
  const { previewUser, previewLoading, isEditUserDone, editUserError } =
    usersService;

  const validationSchema = object().shape({
    firstname: string().required('Имя обязателно'),
    lastname: string().required('Фамилия обязателно'),
    email: string()
      .required(authValidations.email.requiredMessage)
      .email(authValidations.email.invalidEmailMessage),
    phoneNumber: string()
      .required('Номер телефона обязателен')
      .matches(
        authValidations.phoneNumber.pattern.regex,
        authValidations.phoneNumber.pattern.invalidMessage
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditUserState>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (idUser) {
      usersService.fetchUserById(idUser);
    }
  }, []);

  const onSubmit = (data: IEditUserState) => {
    if (idUser) {
      usersService.editUser(
        idUser,
        data.firstname,
        data.lastname,
        data.phoneNumber,
        data.email,
        data.position
      );
      usersService.fetchUserById(idUser);
    }
  };

  useEffect(() => {
    if (isEditUserDone && editUserError.length === 0) {
      navigate(-1);
    }
  }, [isEditUserDone]);

  if (!previewLoading) {
    return (
      <DrawerContainer>
        <Spiner />
      </DrawerContainer>
    );
  } else {
    return (
      <DrawerContainer>
        <Box>
          <Button
            className={classes.goBackBtn}
            variant='text'
            onClick={() => navigate(-1)}
          >
            {'< НАЗАД'}
          </Button>
        </Box>
        <Box display='flex' my={5}>
          <Typography
            variant='h4'
            component='div'
            gutterBottom
            className={classes.title}
          >
            Редактирование данных
          </Typography>
          <Typography component='div' gutterBottom className={classes.greyText}>
            {'ID ' + idUser}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid className={classes.flexBasis50} item>
            <FormControl
              error={errors.firstname ? true : undefined}
              sx={{ width: '100%', marginBottom: 2 }}
              variant='standard'
            >
              <InputLabel htmlFor='firstname'>Имя*</InputLabel>
              <Input
                {...register('firstname')}
                error={errors.firstname ? true : false}
                id='firstname'
                defaultValue={previewUser.firstname}
              />
              <FormHelperText id='component-error-text'>
                {errors.firstname?.message}
              </FormHelperText>
            </FormControl>
            <FormControl
              error={errors.lastname ? true : undefined}
              sx={{ width: '100%', marginBottom: 2 }}
              variant='standard'
            >
              <InputLabel htmlFor='lastname'>Фамилия*</InputLabel>
              <Input
                {...register('lastname')}
                error={errors.lastname ? true : false}
                id='lastname'
                defaultValue={previewUser.lastname}
              />
              <FormHelperText id='component-error-text'>
                {errors.lastname?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid className={classes.flexBasis50} item>
            <FormControl
              error={errors.phoneNumber ? true : undefined}
              sx={{ width: '100%', marginBottom: 2 }}
              variant='standard'
            >
              <InputLabel htmlFor='phonenumber'>Телефон*</InputLabel>
              <Input
                id='phonenumber'
                {...register('phoneNumber')}
                error={errors.phoneNumber ? true : false}
                defaultValue={previewUser.phone_number}
              />
              <FormHelperText id='component-error-text'>
                {errors.phoneNumber?.message}
              </FormHelperText>
            </FormControl>
            <FormControl
              error={errors.email ? true : undefined}
              sx={{ width: '100%', marginBottom: 2 }}
              variant='standard'
            >
              <InputLabel htmlFor='email'>Ввидите почту*</InputLabel>
              <Input
                id='email'
                {...register('email')}
                error={errors.email ? true : false}
                defaultValue={previewUser.email}
              />
              <FormHelperText id='component-error-text'>
                {errors.email?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid mt={2} item>
            <FormControl variant='standard' sx={{ minWidth: 120 }}>
              <InputLabel id='position-select-label'>Допуск</InputLabel>
              <Select
                labelId='position-select-label'
                id='position-select'
                {...register('position')}
                label='Допуск'
                defaultValue={previewUser.position === 'Администратор' ? 1 : 0}
              >
                <MenuItem value={0}>Менеджер</MenuItem>
                <MenuItem value={1}>Администратор</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {editUserError ? (
          <Grid mt={3} color='red'>
            {editUserError.map((element, index) => (
              <Box key={index}>{element}</Box>
            ))}
          </Grid>
        ) : null}
        <Grid mt={15}>
          <Button
            className={`${classes.UnsetTextTrans}  ${classes.saveBtn}`}
            type='submit'
            variant='contained'
            onClick={handleSubmit(onSubmit)}
            disabled={errors.email ? true : false}
          >
            Сохранить
          </Button>
          <Button
            className={`${classes.UnsetTextTrans}  ${classes.cancelBtn}`}
            onClick={() => navigate(-1)}
          >
            Отмена редактирования
          </Button>
        </Grid>
      </DrawerContainer>
    );
  }
};

export default observer(EditUserPage);
