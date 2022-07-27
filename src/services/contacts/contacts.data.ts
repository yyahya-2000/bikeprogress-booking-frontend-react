import { ContactItem } from 'models/types';
import getOrigin from 'utils/getOrigin';

export const defaultContact: ContactItem = {
  id: '',
  contact_name: '',
  firstname: '',
  lastname: '',
  patronymic: undefined,
  phone_number: '',
  extra_phone_number: undefined,
  email: '',
  extra_email: undefined,
  loyalty: '',
  note: undefined,
  booking_number: 0,
  cost: 0,
};

export const contactApiUrls = {
  contacts: getOrigin() + 'api/contacts',
  addContact: getOrigin() + 'api/contact/add',
  ContactById: getOrigin() + 'api/contact/read',
  editContact: getOrigin() + 'api/contact/edit',
  deleteContact: getOrigin() + 'api/contact/delete',
};
