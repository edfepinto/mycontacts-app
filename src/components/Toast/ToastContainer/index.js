import { useEffect } from 'react';

import useAnimetedList from '../../../hooks/useAnimetedList';
import { tostEventManager } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';

import { Container } from './styles';

export default function ToastContainer() {
  const {
    items: messages,
    setItems: setMessages,
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
  } = useAnimetedList();

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    tostEventManager.on('addtoast', handleAddToast);

    return () => {
      tostEventManager.removeListener('addtoast');
    };
  }, [setMessages]);

  console.log({ messages, pendingRemovalItemsIds });

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={pendingRemovalItemsIds.includes(message.id)}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}
