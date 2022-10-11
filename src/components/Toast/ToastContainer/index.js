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

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  );
}
