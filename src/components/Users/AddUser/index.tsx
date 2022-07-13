import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import DrawerContainer from 'components/common/Drawer';
import { authValidations } from 'enums/authorization';
import { IAddUserState } from 'models/interfaces';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup';
import useAddUserStyle from './AddUser.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { usersService } from 'services/users/users.service';
import { observer } from 'mobx-react-lite';

const AddUserPage: FC = () => {
  const classes = useAddUserStyle();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [randomPassword, setRandomPassword] = useState('');
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const { addUserError, isAddUserDone } = usersService;

  const validationSchema = object().shape({
    firstname: string().required('Имя обязателно'),
    lastname: string().required('Фамилия обязателно'),
    email: string()
      .required(authValidations.email.requiredMessage)
      .email(authValidations.email.invalidEmailMessage),
    password: string()
      .required(authValidations.password.requiredMessage)
      .min(
        authValidations.password.min.value,
        authValidations.password.min.invalidMessage
      )
      .max(
        authValidations.password.max.value,
        authValidations.password.max.invalidMessage
      )
      .matches(
        authValidations.password.pattern.regex,
        authValidations.password.pattern.invalidMessage
      ),
    passwordConfirmation: string().oneOf(
      [ref('password'), null],
      'Пароли должны совпадать'
    ),
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
  } = useForm<IAddUserState>({
    resolver: yupResolver(validationSchema),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: IAddUserState) => {
    usersService.addUser(
      data.firstname,
      data.lastname,
      data.phoneNumber,
      data.email,
      data.position,
      data.password
    );
  };

  useEffect(() => {
    if (isAddUserDone && addUserError.length === 0) {
      navigate(-1);
    }
  }, [isAddUserDone]);

  const generatePassword = (
    length = Math.floor(Math.random() * (8 - 6 + 1)) + 6,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
  ) => {
    const password = Array.from(crypto.getRandomValues(new Uint32Array(length)))
      .map((x) => wishlist[x % wishlist.length])
      .join('');

    if (!authValidations.password.pattern.regex.test(password)) {
      generatePassword();
    } else {
      setRandomPassword(password);
    }
  };

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
      <Box>
        <Typography
          variant='h4'
          component='div'
          gutterBottom
          className={classes.title}
          my={5}
        >
          Новый пользователь
        </Typography>
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
                defaultValue={0}
              >
                <MenuItem value={0}>Менеджер</MenuItem>
                <MenuItem value={1}>Администратор</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Box width='100%' />
          <Grid className={classes.flexBasis50} item mt={2}>
            <FormControl
              error={errors.password ? true : undefined}
              sx={{ width: '100%' }}
              variant='standard'
            >
              <InputLabel htmlFor='standard-adornment-password'>
                Задайте пароль*
              </InputLabel>
              <Input
                {...register('password')}
                id='standard-adornment-password'
                type={showPassword ? 'text' : 'password'}
                error={errors.password ? true : false}
                value={randomPassword}
                onInput={(e) =>
                  setRandomPassword((e.target as HTMLInputElement).value)
                }
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id='component-error-text'>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item display='flex'>
            <Button
              className={classes.cancelBtn}
              onClick={() => generatePassword()}
            >
              Сгенерировать пароль
            </Button>
          </Grid>
          <Box width='100%' />
          <Grid item className={classes.flexBasis50}>
            <FormControl
              error={errors.passwordConfirmation ? true : undefined}
              sx={{ width: '100%' }}
              variant='standard'
            >
              <InputLabel htmlFor='standard-adornment-password'>
                Повторите пароль*
              </InputLabel>
              <Input
                {...register('passwordConfirmation')}
                id='standard-adornment-passwordConfirmation'
                type={showPasswordConfirmation ? 'text' : 'password'}
                error={errors.passwordConfirmation ? true : false}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPasswordConfirmation}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPasswordConfirmation ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id='component-error-text'>
                {errors.passwordConfirmation?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        {addUserError ? (
          <Grid mt={3} color='red'>
            {addUserError.map((element, index) => (
              <Box key={index}>{element}</Box>
            ))}
          </Grid>
        ) : null}
        <Grid mt={15}>
          <Button
            className={classes.saveBtn}
            type='submit'
            variant='contained'
            onClick={handleSubmit(onSubmit)}
            disabled={errors.email ? true : false}
          >
            Сохранить
          </Button>
          <Button className={classes.cancelBtn} onClick={() => navigate(-1)}>
            Отмена
          </Button>
        </Grid>
      </Box>
    </DrawerContainer>
  );
};

export default observer(AddUserPage);
