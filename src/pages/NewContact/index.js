import { useRef } from 'react';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

export default function NewContact() {
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

  return (
    <>
      <PageHeader title="New Contact" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Create"
        onSubmit={handleSubmit}
      />
    </>
  );
}
