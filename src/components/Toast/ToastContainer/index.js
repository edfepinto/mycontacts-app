import { useState, useEffect } from 'react';
import { tostEventManager } from '../../../utils/toast';

import ToastMessage from '../ToastMessage';

import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    tostEventManager.on('addtoast', handleAddToast);

    return () => {
      tostEventManager.removeListener('addtoast');
    };
  }, []);

  function handleRemoveMessage(id) {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ));
  }

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
