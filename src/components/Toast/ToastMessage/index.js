import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/svg/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/svg/icons/check-circle.svg';

export default function ToastMessage({ text, type }) {
  return (
    <Container type={type}>
      {type === 'danger'
        && <img src={xCircleIcon} alt="Error" />}
      {type === 'success'
        && <img src={checkCircleIcon} alt="Success" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
};

ToastMessage.defaultProps = {
  type: 'default',
};
