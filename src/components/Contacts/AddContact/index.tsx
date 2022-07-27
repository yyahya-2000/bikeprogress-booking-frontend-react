import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material';
import DrawerContainer from 'components/common/Drawer';
import { authValidations } from 'enums/authorization';
import { IAddContactState } from 'models/interfaces';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import useAddContactStyle from './AddContact.styles';
import { contactsService } from 'services/contacts/contacts.service';

const AddContactPage: FC = () => {
  const classes = useAddContactStyle();
  const navigate = useNavigate();
  const { isAddContactDone } = contactsService;
  const [checkboxContactName, setCheckboxContactName] = useState(false);
  const [showExtraPhone, setShowExtraPhone] = useState(false);
  const [showExtraEmail, setShowExtraEmail] = useState(false);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');

  const validationSchema = object().shape({
    contactName: string().required('Название контакта обязателно'),
    firstname: string().required('Имя обязателно'),
    lastname: string().required('Фамилия обязателно'),
    email: string()
      .required(authValidations.email.requiredMessage)
      .email(authValidations.email.invalidEmailMessage),
    extraEmail: string().email(authValidations.email.invalidEmailMessage),
    phoneNumber: string()
      .required('Номер телефона обязателен')
      .matches(
        authValidations.phoneNumber.pattern.regex,
        authValidations.phoneNumber.pattern.invalidMessage
      ),
    extraPhoneNumber: string().matches(
      authValidations.extraPhoneNumber.pattern.regex,
      authValidations.extraPhoneNumber.pattern.invalidMessage
    ),
    loyalty: string()
      .required('Лояльность обязателна')
      .length(11, 'Лояльность должна быть ровно 11 цифр')
      .matches(/^[0-9]+$/, 'Лояльность должна состоять только из цифр'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddContactState>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: IAddContactState) => {
    contactsService.addContact(
      data.contactName,
      data.firstname,
      data.lastname,
      data.patronymic,
      data.phoneNumber,
      data.extraPhoneNumber,
      data.email,
      data.extraEmail,
      data.loyalty,
      data.note
    );
    navigate(-1);
  };

  useEffect(() => {
    if (isAddContactDone) {
      navigate(-1);
    }
  }, [isAddContactDone]);

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
          Создание контакта
        </Typography>
        <Grid container spacing={2}>
          <Grid className={classes.flexBasis33} item>
            <FormControl
              error={errors.contactName ? true : undefined}
              sx={{ width: '100%', marginBottom: 2 }}
              variant='standard'
            >
              <InputLabel
                className={
                  (firstname || lastname) && checkboxContactName
                    ? 'MuiInputLabel-shrink css-1y9zt1k-MuiFormLabel-root-MuiInputLabel-root'
                    : ''
                }
                data-shrink={
                  (firstname || lastname) && checkboxContactName ? true : false
                }
                htmlFor='contactname'
              >
                Наименование контакта*
              </InputLabel>
              <Input
                {...register('contactName')}
                error={errors.contactName ? true : false}
                id='contactname'
                value={
                  checkboxContactName
                    ? firstname + (lastname ? ' ' + lastname : '')
                    : undefined
                }
              />
              <FormControlLabel
                label='По имени и фамилии'
                control={
                  <Checkbox
                    checked={checkboxContactName}
                    onClick={() => setCheckboxContactName(!checkboxContactName)}
                  />
                }
              />
              <FormHelperText id='component-error-text'>
                {errors.contactName?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Box width='100%' />
          <Grid className={classes.flexBasis33} item>
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
                onInput={(e) =>
                  setFirstName((e.target as HTMLInputElement).value)
                }
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
                onInput={(e) =>
                  setLastName((e.target as HTMLInputElement).value)
                }
              />
              <FormHelperText id='component-error-text'>
                {errors.lastname?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid className={classes.flexBasis33} item>
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
                endAdornment={
                  !showExtraPhone ? (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        color='primary'
                        size='small'
                        onClick={() => setShowExtraPhone(true)}
                      >
                        + Доп.
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
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
                endAdornment={
                  !showExtraEmail ? (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        color='primary'
                        size='small'
                        onClick={() => setShowExtraEmail(true)}
                      >
                        + Доп.
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
              />
              <FormHelperText id='component-error-text'>
                {errors.email?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          {showExtraPhone || showExtraEmail ? (
            <Grid className={classes.flexBasis33} item>
              {showExtraPhone ? (
                <FormControl
                  error={errors.extraPhoneNumber ? true : undefined}
                  sx={{ width: '100%', marginBottom: 2 }}
                  variant='standard'
                >
                  <InputLabel htmlFor='extraphonenumber'>
                    Дополнительный Телефон
                  </InputLabel>
                  <Input
                    id='extraphonenumber'
                    {...register('extraPhoneNumber')}
                    error={errors.extraPhoneNumber ? true : false}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          color='primary'
                          size='small'
                          onClick={() => setShowExtraPhone(false)}
                        >
                          Скрыть
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id='component-error-text'>
                    {errors.extraPhoneNumber?.message}
                  </FormHelperText>
                </FormControl>
              ) : null}
              {showExtraEmail ? (
                <FormControl
                  error={errors.extraEmail ? true : undefined}
                  sx={{ width: '100%', marginBottom: 2 }}
                  variant='standard'
                >
                  <InputLabel htmlFor='extraemail'>
                    Дополнительная почта
                  </InputLabel>
                  <Input
                    id='extraemail'
                    {...register('extraEmail')}
                    error={errors.extraEmail ? true : false}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          color='primary'
                          size='small'
                          onClick={(e) => setShowExtraEmail(false)}
                        >
                          Скрыть
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id='component-error-text'>
                    {errors.extraEmail?.message}
                  </FormHelperText>
                </FormControl>
              ) : null}
            </Grid>
          ) : null}
          <Box width='100%' />
          <Grid className={classes.flexBasis33} item>
            <FormControl
              error={errors.loyalty ? true : undefined}
              sx={{ width: '100%', marginBottom: 2 }}
              variant='standard'
            >
              <InputLabel htmlFor='contactname'>Лояльность*</InputLabel>
              <Input
                {...register('loyalty')}
                error={errors.loyalty ? true : false}
                id='loyalty'
              />
              <FormHelperText id='component-error-text'>
                {errors.loyalty?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Box width='100%' />
          <Grid className={classes.flexBasis33} item mt={3}>
            <FormControl
              sx={{ width: '100%', marginBottom: 2 }}
              variant='standard'
            >
              <InputLabel htmlFor='contactname'>
                Дополнительная информация
              </InputLabel>
              <Input {...register('note')} id='note' />
            </FormControl>
          </Grid>
        </Grid>
        <Grid mt={15}>
          <Button
            className={classes.saveBtn}
            type='submit'
            variant='contained'
            onClick={handleSubmit(onSubmit)}
            disabled={
              errors.email ||
              errors.extraEmail ||
              errors.phoneNumber ||
              errors.extraPhoneNumber ||
              errors.contactName ||
              errors.firstname ||
              errors.lastname ||
              errors.loyalty
                ? true
                : false
            }
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

export default observer(AddContactPage);
