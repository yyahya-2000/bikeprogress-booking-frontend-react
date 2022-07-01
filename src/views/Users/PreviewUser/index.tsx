import { FC, Fragment } from 'react';
import Container from 'components/common/Container';
import PreviewUserPage from 'components/Users/PreviewUser';

const PreviewUser: FC = () => {
  return (
    <Fragment>
      <Container>
        <PreviewUserPage />
      </Container>
    </Fragment>
  );
};

export default PreviewUser;