import { UserItem } from 'models/types';
import getOrigin from 'utils/getOrigin';

export const defaultUser: UserItem = {
  id: '',
  firstname: '',
  lastname: '',
  password: '',
  email: '',
  phone_number: '',
  position: '',
  created_at: undefined,
  updated_at: undefined,
};

export const userApiUrlS = {
  currentUser: getOrigin() + 'api/user',
  allUsers: getOrigin() + 'api/users',
  addUser: getOrigin() + 'api/user/add',
  userById: getOrigin() + 'api/user/read',
  adminResetPassword: getOrigin() + 'api/user/edit/admin-reset-password',
  editUser: getOrigin() + 'api/user/edit',
  deleteUser: getOrigin() + 'api/user/delete'
};
