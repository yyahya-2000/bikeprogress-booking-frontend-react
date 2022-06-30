import getOrigin from 'utils/getOrigin';

export const authApiUrlS = {
  currentUser: getOrigin() + 'api/user',
  login: getOrigin() + 'api/login',
};
