import PropTypes from 'prop-types';

import magnifierQuestion from '../../../../assets/images/svg/magnifier-question.svg';

import { Container } from './styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img
        src={magnifierQuestion}
        alt="magnifying glass for result not found"
      />

      <span>
        No results found for
        {' '}
        <strong>{searchTerm}</strong>
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
