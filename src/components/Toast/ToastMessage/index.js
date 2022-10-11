import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/svg/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/svg/icons/check-circle.svg';

export default function ToastMessage({
  message, onRemoveMessage,
}) {
  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container type={message.type} onClick={handleRemoveToast}>
      {message.type === 'danger'
        && <img src={xCircleIcon} alt="Error" />}
      {message.type === 'success'
        && <img src={checkCircleIcon} alt="Success" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    id: PropTypes.number.isRequired,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};
