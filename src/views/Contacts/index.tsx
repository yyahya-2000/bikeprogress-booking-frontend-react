import { FC, Fragment } from 'react';
import ContactsPage from 'components/Contacts';
import Container from 'components/common/Container';

const Contacts: FC = () => {
  return (
    <Fragment>
      <Container>
        <ContactsPage />
      </Container>
    </Fragment>
  );
};

export default Contacts;
