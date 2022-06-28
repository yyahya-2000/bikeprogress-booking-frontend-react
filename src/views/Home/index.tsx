import { FC, Fragment } from 'react';
import HomePage from 'components/Home';
import Container from 'components/common/Container';

const Home: FC = () => {
  return (
    <Fragment>
      <Container>
        <HomePage />
      </Container>
    </Fragment>
  );
};

export default Home;
