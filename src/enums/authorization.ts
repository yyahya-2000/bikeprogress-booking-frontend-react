import { AuthValidations } from 'models/types';

export const authValidations: AuthValidations = {
  email: {
    requiredMessage: 'Электронная почта обязательна',
    invalidEmailMessage: 'Электронная почта недействительна',
  },
  password: {
    requiredMessage: 'Пароль обязателен',
    min: {
      value: 6,
      invalidMessage: 'Пароль должен быть не менее 6 символов',
    },
    max: {
      value: 40,
      invalidMessage: 'Пароль не должен превышать 40 символов',
    },
    pattern: {
      regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      invalidMessage:
        'Пароль должен содержать хотя бы одну цифру и одну заглавную букву',
    },
  },
  phoneNumber: {
    pattern: {
      regex:
        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
      invalidMessage: 'Номер телефона недействителен',
    },
  },
  errorAnswer: 'Неправильный логин или пароль',
};
