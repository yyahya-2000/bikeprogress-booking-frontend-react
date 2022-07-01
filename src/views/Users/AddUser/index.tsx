import { FC, Fragment } from 'react';
import Container from 'components/common/Container';
import AddUserPage from 'components/Users/AddUser';

const AddUser: FC = () => {
  return (
    <Fragment>
      <Container>
        <AddUserPage />
      </Container>
    </Fragment>
  );
};

export default AddUser;
