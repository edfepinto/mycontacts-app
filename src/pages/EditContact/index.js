import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import toast from '../../utils/toast';

import ContactsService from '../../services/ContactsService';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactsById(id);
        contactFormRef.current.setFieldsValues(contact);
        setIsLoading(false);
        setContactName(contact.name);
      } catch {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contact not found',
        });
      }
    }

    loadContact();
  }, [id, history]);

  function handleSubmit() {

  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading
          ? 'Loading...'
          : `Edit ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Save changes"
        onSubmit={handleSubmit}
      />
    </>
  );
}
