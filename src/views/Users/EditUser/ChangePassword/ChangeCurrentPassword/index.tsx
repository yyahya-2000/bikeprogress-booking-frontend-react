import { FC, Fragment } from 'react';
import Container from 'components/common/Container';
import ChangeCurrentPasswordPage from 'components/Users/EditUser/ChangePassword/ChangeCurrentPassword';

const ChangeCurrentPassword: FC = () => {
  return (
    <Fragment>
      <Container>
        <ChangeCurrentPasswordPage />
      </Container>
    </Fragment>
  );
};

export default ChangeCurrentPassword;
