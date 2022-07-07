import { FC, Fragment } from 'react';
import Container from 'components/common/Container';
import AdminChangePasswordPage from 'components/Users/EditUser/ChangePassword';

const AdminChangePassword: FC = () => {
  return (
    <Fragment>
      <Container>
        <AdminChangePasswordPage />
      </Container>
    </Fragment>
  );
};

export default AdminChangePassword;