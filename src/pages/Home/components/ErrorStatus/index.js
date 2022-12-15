import PropTypes from 'prop-types';

import { Container } from './styles';

import sad from '../../../../assets/images/svg/sad.svg';

import Button from '../../../../components/Button';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img
        src={sad}
        alt="sad smile because of an error that occurred"
      />
      <div className="details">
        <strong>There was an error getting your contacts!</strong>
        <Button type="button" onClick={onTryAgain}>
          Try again
        </Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
