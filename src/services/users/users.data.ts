import { UserItem } from 'models/types';
import getOrigin from 'utils/getOrigin';

export const defaultUser: UserItem = {
  id: '',
  firstname: '',
  lastname: '',
  password: '',
  email: '',
  phoneNumebr: '',
  position: '',
  createdAt: undefined,
  updatedAt: undefined,
};

export const userApiUrlS = {
  currentUser: getOrigin() + 'api/user',
  allUsers: getOrigin() + 'api/users',
};
