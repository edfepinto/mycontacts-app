import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/svg/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/svg/icons/check-circle.svg';

export default function ToastMessage({
  message,
  onRemoveMessage,
  isLeaving,
  animetedRef,
}) {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animetedRef}
    >
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
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animetedRef: PropTypes.shape().isRequired,
};
