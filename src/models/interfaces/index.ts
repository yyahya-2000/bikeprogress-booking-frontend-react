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