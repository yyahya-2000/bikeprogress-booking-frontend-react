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
import AddUser from 'views/Users/AddUser';
import EditUser from 'views/Users/EditUser';
import PreviewUser from 'views/Users/PreviewUser';
import AdminChangePassword from 'views/Users/EditUser/ChangePassword';
import Contacts from 'views/Contacts';
import AddContact from 'views/Contacts/AddContact';
import EditContact from 'views/Contacts/EditContact';
import PreviewContact from 'views/Contacts/PreviewContact';

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
          path={routes.addUser}
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.editUser}
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.adminChangePassword}
          element={
            <PrivateRoute>
              <AdminChangePassword />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.previewUser}
          element={
            <PrivateRoute>
              <PreviewUser />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.contacts}
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.addContact}
          element={
            <PrivateRoute>
              <AddContact />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.editContact}
          element={
            <PrivateRoute>
              <EditContact />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.previewContact}
          element={
            <PrivateRoute>
              <PreviewContact />
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
