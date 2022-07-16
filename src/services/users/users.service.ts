import { makeAutoObservable, runInAction } from 'mobx';
import axios, { AxiosError } from 'axios';
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
  public previewUser: UserItem = defaultUser;
  public previewLoading = false;
  public addUserError: String[] = [];
  public isAddUserDone = false;
  public isEditUserDone = false;
  public editUserError: String[] = [];

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

  async fetchUserById(id: string) {
    try {
      runInAction(() => (this.previewLoading = false));
      if ( id === '-1')
      {
        runInAction(() => {
          this.previewUser = this.currentUser;
          this.previewLoading = true;
        });
        return;
      }
      const params = new FormData();
      params.append('id', id);

      const result = await axios.post(userApiUrlS.userById, params);

      if (result.status !== 200) {
        return console.log('result', result);
      }
      runInAction(() => {
        this.previewUser = result.data[0];
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.previewLoading = true));
    }
  }

  async deleteUserById(id: string) {
    try {
      const params = new FormData();
      params.append('id', id);

      const result = await axios.post(userApiUrlS.deleteUser, params);

      if (result.status !== 200) {
        return console.log('result', result);
      }
    } catch (error) {
      console.log(error);
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
      runInAction(() => {
        this.isAddUserDone = false;
        this.addUserError = [];
      });

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
    } catch (error: AxiosError | any) {
      if (error.response.status === 422) {
        runInAction(() => {
          if (error.response.data.email) {
            this.addUserError.push('Электронная почта уже была использована');
          }
          if (error.response.data.phone_number) {
            this.addUserError.push('Номер телефон уже был использован');
          }
        });
      }
      console.log(error);
    } finally {
      runInAction(() => (this.isAddUserDone = true));
    }
  }

  async adminReastPassword(id: string, newPassword: string) {
    try {
      const params = new FormData();
      params.append('id', id);
      params.append('new-password', newPassword);

      const result = await axios.post(userApiUrlS.adminResetPassword, params);
      if (result.status !== 200) {
        return console.log('result', result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async editUser(
    id: string,
    firstname: string,
    lastname: string,
    phoneNumber: string,
    email: string,
    position: number
  ) {
    try {
      runInAction(() => {
        this.isEditUserDone = false;
        this.editUserError = [];
      });

      const params = new FormData();
      params.append('id', id);
      params.append('firstname', firstname);
      params.append('lastname', lastname);
      params.append('phone_number', phoneNumber);
      params.append('email', email);
      params.append('position', position === 0 ? 'Менеджер' : 'Администратор');

      const result = await axios.post(userApiUrlS.editUser, params);
      if (result.status !== 200) {
        return console.log('result', result);
      }
    } catch (error: AxiosError | any) {
      if (error.response.status === 422) {
        runInAction(() => {
          if (error.response.data.email) {
            this.editUserError.push('Электронная почта уже была использована');
          }
          if (error.response.data.phone_number) {
            this.editUserError.push('Номер телефон уже был использован');
          }
        });
      }
      console.log(error);
    } finally {
      runInAction(() => (this.isEditUserDone = true));
    }
  }
  async logout() {
    try {
      const result = await axios.post(userApiUrlS.logout);
      console.log(result);
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

  resetAddUserParams() {
    runInAction(() => {
      this.addUserError = [];
      this.isAddUserDone = false;
    });
  }

  resetEditUserParams() {
    runInAction(() => {
      this.editUserError = [];
      this.isEditUserDone = false;
    });
  }
}

export const usersService = new UsersService();
