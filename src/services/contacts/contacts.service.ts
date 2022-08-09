import { makeAutoObservable, runInAction } from 'mobx';
import axios, { AxiosError } from 'axios';
import { ContactItem, ContactTableItem } from 'models/types';
import { contactApiUrls, defaultContact } from './contacts.data';

class ContactsService {
  public contacts: ContactItem[] | undefined = undefined;
  public contactsTable: ContactTableItem[] = [];
  public isCallDone = false;
  public error: string | undefined = undefined;
  public isAddContactDone = false;
  public previewContact: ContactItem = defaultContact;
  public previewLoading = false;

  constructor() {
    makeAutoObservable(this);
    axios.defaults.withCredentials = true;
  }

  async fetchContacts() {
    try {
      runInAction(() => (this.isCallDone = false));
      const result = await axios.get(contactApiUrls.contacts);
      if (result.status !== 200) {
        return console.log('result', result);
      }
      runInAction(() => {
        this.contacts = result.data;
        this.contactsTable = [];
        this.contacts?.map((item) => {
          this.contactsTable?.push({
            id: item.id,
            name:
              item.lastname.charAt(0).toUpperCase() +
              item.lastname.slice(1).toLowerCase() +
              ' ' +
              item.firstname.charAt(0).toUpperCase() +
              '.' +
              (item.patronymic
                ? ' ' + item.patronymic?.charAt(0).toUpperCase() + '.'
                : ''),
            phone_number: item.phone_number,
            email: item.email,
            booking_number: item.booking_number,
            cost: item.cost,
          });
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.isCallDone = true));
    }
  }

  async deleteContactById(id: string) {
    try {
      const params = new FormData();
      params.append('id', id);

      const result = await axios.post(contactApiUrls.deleteContact, params);

      if (result.status !== 200) {
        return console.log('result', result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addContact(
    contactName: string,
    firstname: string,
    lastname: string,
    patronymic: string | undefined,
    phoneNumber: string,
    extraPhoneNumber: string | undefined,
    email: string,
    extraEmail: string | undefined,
    loyalty: string,
    note: string | undefined
  ) {
    try {
      runInAction(() => {
        this.isAddContactDone = false;
      });

      const params = new FormData();
      params.append('contact_name', contactName);
      params.append('firstname', firstname);
      params.append('lastname', lastname);
      if (patronymic) {
        params.append('patronymic', patronymic);
      }
      params.append('phone_number', phoneNumber);
      if (extraPhoneNumber) {
        params.append('extra_phone_number', extraPhoneNumber);
      }
      params.append('email', email);
      if (extraEmail) {
        params.append('extra_email', extraEmail);
      }
      params.append('loyalty', loyalty);
      if (note) {
        params.append('note', note);
      }

      const result = await axios.post(contactApiUrls.addContact, params);

      if (result.status !== 200) {
        return console.log('result', result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.isAddContactDone = true));
    }
  }

  async fetchContactById(id: string) {
    try {
      runInAction(() => (this.previewLoading = false));
      const params = new FormData();
      params.append('id', id);

      const result = await axios.post(contactApiUrls.ContactById, params);

      if (result.status !== 200) {
        return console.log('result', result);
      }
      runInAction(() => {
        this.previewContact = result.data[0];
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.previewLoading = true));
    }
  }
}

export const contactsService = new ContactsService();
