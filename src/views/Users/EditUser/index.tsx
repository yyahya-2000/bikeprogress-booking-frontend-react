import { FC, Fragment } from 'react';
import Container from 'components/common/Container';
import EditUserPage from 'components/Users/EditUser';

const EditUser: FC = () => {
  return (
    <Fragment>
      <Container>
        <EditUserPage />
      </Container>
    </Fragment>
  );
};

export default EditUser;