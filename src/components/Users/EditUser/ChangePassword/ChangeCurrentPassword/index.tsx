import { useNavigate } from 'react-router-dom';
import DrawerContainer from 'components/common/Drawer';
import { FC, useState } from 'react';
import { getParameterFromUrl } from 'utils';
import { yupResolver } from '@hookform/resolvers/yup';
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
  Typography,
} from '@mui/material';
import { object, ref, string } from 'yup';
import { authValidations } from 'enums/authorization';
import { useForm } from 'react-hook-form';
import { IAdminChangePasswordState } from 'models/interfaces';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { usersService } from 'services/users/users.service';
import { observer } from 'mobx-react-lite';
import useChangePasswordStyle from '../ChangePassword.styles';

const ChangeCurrentPasswordPage: FC = () => {
  const navigate = useNavigate();
  const classes = useChangePasswordStyle();
  const idUser = getParameterFromUrl('id');
  const { currentUser } = usersService;
  const [showPassword, setShowPassword] = useState(false);
  const [randomPassword, setRandomPassword] = useState('');
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const validationSchema = object().shape({
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
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAdminChangePasswordState>({
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

  const onSubmit = (data: IAdminChangePasswordState) => {
    if (idUser) {
      usersService.adminReastPassword(idUser, data.password);
      navigate(-1);
    }
  };

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
      <Box display='flex' my={5}>
        <Typography
          variant='h4'
          component='div'
          gutterBottom
          className={classes.title}
        >
          Смена пароля
        </Typography>
        <Typography component='div' gutterBottom className={classes.greyText}>
          {'ID ' + idUser}
        </Typography>
      </Box>
      <Grid container>
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
      <Grid mt={30}>
        <Button
          className={classes.saveBtn}
          type='submit'
          variant='contained'
          onClick={handleSubmit(onSubmit)}
          disabled={errors.password ? true : false}
        >
          Сохранить
        </Button>
        <Button className={classes.cancelBtn} onClick={() => navigate(-1)}>
          Отмена
        </Button>
      </Grid>
    </DrawerContainer>
  );
};

export default observer(ChangeCurrentPasswordPage);
