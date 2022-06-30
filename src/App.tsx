import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { routes } from 'routers';
import { useMediaQuery } from '@mui/material';
import ScreenFormat from 'components/common/StubsAndBugs/ScreenFormat';
import Home from 'views/Home';
import PrivateRoute from 'components/common/PrivateRoute';
import Login from 'views/Login';
import LoginPrivateRoute from 'components/common/PrivateRoute/LoginPrivateRoute';
import Users from 'views/Users';

const App: FC = () => {
  const isNonScreen = useMediaQuery('(max-width:319px)');

  if (isNonScreen) {
    return <ScreenFormat />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.home}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.users}
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.login}
          element={
            <LoginPrivateRoute>
              <Login />
            </LoginPrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default observer(App);
