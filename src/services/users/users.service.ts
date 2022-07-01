import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { UserItem, UsersTable } from 'models/types';
import { defaultUser, userApiUrlS } from './users.data';
//import { format } from "date-fns";

class UsersService {
  public currentUser: UserItem = defaultUser;
  public users: UserItem[] | undefined = undefined;
  public usersTable: UsersTable[] = [];
  public isCallDone = false;
  public usersFetched = false;
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
      runInAction(() => (this.usersFetched = false));
      const result = await axios.get(userApiUrlS.allUsers);
      if (result.status !== 200) {
        return console.log('result', result);
      }
      runInAction(() => {
        this.users = result.data;
        this.usersTable = [];
        this.users?.map((item) => {
          this.usersTable?.push({
            id: item.id,
            user: `${item.lastname.toUpperCase()} ${item.firstname[0].toUpperCase()}.`,
          });
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.usersFetched = true));
    }
  }

  async addUser(
    firstname: string,
    lastname: string,
    phoneNumber: string,
    email: string,
    position: number,
    password: string
  ) {
    try {
      const params = new FormData();
      params.append('firstname', firstname);
      params.append('lastname', lastname);
      params.append('phone_number', phoneNumber);
      params.append('email', email);
      params.append('position', position === 0 ? 'Менеджер' : 'Администратор');
      params.append('password', password);
      const result = await axios.post(userApiUrlS.addUser, params);

      if (result.status !== 200) {
        return console.log('result', result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  resetParams() {
    runInAction(() => (this.isCallDone = false));
  }
}

export const usersService = new UsersService();
