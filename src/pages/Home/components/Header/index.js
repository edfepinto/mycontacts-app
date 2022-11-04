/* eslint-disable no-nested-ternary */

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Header({
  hasError,
  qtyOfContacts,
  qtyOfFilteredContacts,
}) {
  const alignment = hasError
    ? 'flex-end'
    : (
      qtyOfContacts > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <Container justifyContent={alignment}>
      {
        (!hasError && qtyOfContacts > 0) && (
          <strong>
            {qtyOfFilteredContacts}
            {qtyOfFilteredContacts === 1 ? ' contact' : ' contacts'}
          </strong>
        )
      }
      <Link to="/new">New Contact</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
};
