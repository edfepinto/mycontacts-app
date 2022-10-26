import PropTypes from 'prop-types';

import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';

export default function Presentation({
  isLoading,
  contactName,
  contactFormRef,
  onSubmit,
}) {
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
        onSubmit={onSubmit}
      />
    </>
  );
}

Presentation.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  contactName: PropTypes.string.isRequired,
  contactFormRef: PropTypes.shape.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
