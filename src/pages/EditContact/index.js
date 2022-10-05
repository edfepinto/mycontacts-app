import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function EditContact() {
  return (
    <>
      <PageHeader title="Edit Contact" />
      <ContactForm buttonLabel="Save changes" />
    </>
  );
}
