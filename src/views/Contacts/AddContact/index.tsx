import { FC, Fragment } from 'react';
import Container from 'components/common/Container';
import AddContactPage from 'components/Contacts/AddContact';

const AddContact: FC = () => {
  return (
    <Fragment>
      <Container>
        <AddContactPage />
      </Container>
    </Fragment>
  );
};

export default AddContact;
