import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { authApiUrlS } from './auth.data';
//import { format } from "date-fns";

class AuthService {
  public isCallDone = false;
  public error: string | undefined = undefined;
  constructor() {
    makeAutoObservable(this);
    axios.defaults.withCredentials = true;
  }

  async login(email: string, password: string) {
    try {
      runInAction(() => (this.isCallDone = false));
      const params = new FormData();
      params.append('email', email);
      params.append('password', password);

      const result = await axios.post(authApiUrlS.login, params);
      console.log(result);
      if (result.status !== 200) {
        runInAction(() => (this.error = 'Неправильный логин или пароль'));
        return console.log('result', result);
      }
    } catch (error) {
      runInAction(() => (this.error = 'Неправильный логин или пароль'));
      console.log(error);
    } finally {
      runInAction(() => (this.isCallDone = true));
      console.log(this.error);
    }
  }

  resetParams() {
    runInAction(() => (this.isCallDone = false));
  }
}

export const authService = new AuthService();
