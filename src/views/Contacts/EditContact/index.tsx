import { FC, Fragment } from 'react';
import Container from 'components/common/Container';
import EditContactPage from 'components/Contacts/EditContact';

const EditContact: FC = () => {
  return (
    <Fragment>
      <Container>
        <EditContactPage />
      </Container>
    </Fragment>
  );
};

export default EditContact;