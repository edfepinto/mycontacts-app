import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactsService.createContacts(contact);

      toast({
        type: 'success',
        text: 'Contact registered successfully!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'There was an error registering the contact!',
      });
    }
  }

  return (
    <>
      <PageHeader title="New Contact" />
      <ContactForm
        buttonLabel="Register"
        onSubmit={handleSubmit}
      />
    </>
  );
}
