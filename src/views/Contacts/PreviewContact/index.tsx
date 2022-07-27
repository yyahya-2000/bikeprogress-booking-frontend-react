import { FC, Fragment } from 'react';
import Container from 'components/common/Container';
import PreviewContactPage from 'components/Contacts/AddContact';

const PreviewContact: FC = () => {
  return (
    <Fragment>
      <Container>
        <PreviewContactPage />
      </Container>
    </Fragment>
  );
};

export default PreviewContact;
