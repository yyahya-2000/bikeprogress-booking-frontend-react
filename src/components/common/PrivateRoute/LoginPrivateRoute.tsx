import { FC, useEffect } from 'react';
import { ContainerProps } from 'models/types';
import { usersService } from 'services/users/users.service';
import { Navigate } from 'react-router-dom';
import Spiner from '../Spiner';
import { observer } from 'mobx-react-lite';
import { routes } from 'routers';

const LoginPrivateRoute: FC<ContainerProps> = ({ children }) => {
  const { currentUser, isCallDone } = usersService;
  useEffect(() => {
    usersService.fetchCurrentUser();
  }, []);

  if (!isCallDone) {
    return <Spiner />;
  } else {
    return currentUser.email ? <Navigate to={routes.home} /> : <>{children}</>;
  }
};

export default observer(LoginPrivateRoute);
