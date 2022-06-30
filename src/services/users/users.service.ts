import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { UserItem } from 'models/types';
import { defaultUser, userApiUrlS } from './users.data';
//import { format } from "date-fns";

class UsersService {
  public currentUser: UserItem = defaultUser;
  public users: UserItem[] | undefined = undefined;
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

  async fetchAllUsers() {
    try {
      const result = await axios.get(userApiUrlS.allUsers);
      if (result.status !== 200) {
        return console.log('result', result);
      }
      runInAction(() => {
        this.users = result.data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  resetParams() {
    runInAction(() => (this.isCallDone = false));
  }
}

export const usersService = new UsersService();
