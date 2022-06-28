import { makeAutoObservable, runInAction } from 'mobx';
import axios, { AxiosError } from 'axios';
import { UserItem } from 'models/types';
import { defaultUser, userApiUrlS } from './users.data';
//import { format } from "date-fns";

class UsersService {
  public currentUser: UserItem = defaultUser;
  public isCallDone = false;
  public error: string | undefined = undefined;
  constructor() {
    makeAutoObservable(this);
    axios.defaults.withCredentials = true;
  }

  async fetchCurrentUser() {
    try {
      runInAction(() => (this.isCallDone = false));

      const result = await axios.get(userApiUrlS.currentUser);
      if (result.status !== 200) {
        return console.log('result', result);
      }
      runInAction(() => {
        this.currentUser = result.data;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.isCallDone = true));
    }
  }

  async login(email: string, password: string) {
    try {
      runInAction(() => (this.isCallDone = false));
      const params = new FormData();
      params.append('email', email);
      params.append('password', password);

      const result = await axios.post(userApiUrlS.login, params);
      if (result.status !== 200) {
        runInAction(() => (this.error = 'Неправильный логин или пароль'));
        return console.log('result', result);
      }
    } catch (error) {
      runInAction(() => (this.error = 'Неправильный логин или пароль'));
      console.log(error);
    } finally {
      runInAction(() => (this.isCallDone = true));
    }
  }

  resetParams() {
    runInAction(() => (this.isCallDone = false));
  }
}

export const usersService = new UsersService();
