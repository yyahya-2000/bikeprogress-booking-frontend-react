import { FC, Fragment } from 'react';
import Container from 'components/common/Container';
import UsersPage from 'components/Users';

const Users: FC = () => {
  return (
    <Fragment>
      <Container>
        <UsersPage />
      </Container>
    </Fragment>
  );
};

export default Users;
