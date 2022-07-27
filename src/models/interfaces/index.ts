import { TooltipProps } from '@mui/material';

export interface ILoginState {
  password: string;
  email: string;
}

export interface IAddUserState {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  position: number;
  password: string;
  passwordConfirmation: string;
}

export interface IAdminChangePasswordState {
  password: string;
  passwordConfirmation: string;
}

export interface IEditUserState {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  position: number;
}

export interface IAddContactState {
  contactName: string;
  firstname: string;
  lastname: string;
  patronymic: string | undefined;
  phoneNumber: string;
  extraPhoneNumber: string | undefined;
  email: string;
  extraEmail: string | undefined;
  loyalty: string;
  note: string | undefined;
}
