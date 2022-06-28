import { FC, Fragment } from 'react';
import Container from 'components/common/Container';
import LoginPage from 'components/Login';

const Login: FC = () => {
  return (
    <Fragment>
      <Container>
        <LoginPage />
      </Container>
    </Fragment>
  );
};

export default Login;
