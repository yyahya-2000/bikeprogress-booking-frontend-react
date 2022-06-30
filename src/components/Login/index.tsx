import { observer } from 'mobx-react-lite';
import { Fragment, useState } from 'react';
import { FC } from 'react';
import useLoginStyle from './Login.styles';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ILoginState } from 'models/interfaces';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Typography,
} from '@mui/material';
import { authService } from 'services/auth/auth.service';
import { authValidations } from 'enums/authorization';
import { Navigate } from 'react-router-dom';
import { routes } from 'routers';

const LoginPage: FC = () => {
  const classes = useLoginStyle();
  const { error, isCallDone } = authService;
  const [frontError, setFrontError] = useState('');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const validationSchema = object().shape({
    email: string()
      .required(authValidations.email.requiredMessage)
      .email(authValidations.email.invalidEmailMessage),
    password: string().required(authValidations.password.requiredMessage),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginState>({
    resolver: yupResolver(validationSchema),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: ILoginState) => {
    const regex = authValidations.password.pattern.regex;

    if (
      data.password.length < authValidations.password.min.value ||
      data.password.length > authValidations.password.max.value ||
      !regex.test(data.password)
    ) {
      setFrontError(authValidations.errorAnswer);
      return;
    }
    authService.login(data.email, data.password);
  };

  if (isCallDone && !error) {
    return <Navigate to={routes.home} />;
  }

  return (
    <Fragment>
      <Paper elevation={10} className={classes.paper}>
        <Box p={5}>
          <Typography
            variant='h5'
            component='div'
            gutterBottom
            className={classes.title}
            mb={5}
          >
            Вход в приложение
          </Typography>
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
          <FormControl
            error={errors.password ? true : undefined}
            sx={{ width: '100%' }}
            variant='standard'
          >
            <InputLabel htmlFor='standard-adornment-password'>
              Ввидите пароль*
            </InputLabel>
            <Input
              {...register('password')}
              id='standard-adornment-password'
              type={showPassword ? 'text' : 'password'}
              error={errors.password ? true : false}
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
          <FormControl error sx={{ marginTop: 3 }}>
            <FormHelperText sx={{ m: 0 }} id='component-error-text'>
              {frontError || error}
            </FormHelperText>
          </FormControl>
          <Button
            className={classes.submitBtn}
            type='submit'
            variant='contained'
            onClick={handleSubmit(onSubmit)}
            disabled={errors.email ? true : false}
          >
            Войти
          </Button>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default observer(LoginPage);
