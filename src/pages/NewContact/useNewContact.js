import { useRef } from 'react';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useNewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      await ContactsService.createContacts(contact);

      contactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contact created successfully!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'There was an error creating the contact!',
      });
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  };
}
