import { useEffect } from 'react';

import useAnimetedList from '../../../hooks/useAnimetedList';
import { tostEventManager } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';

import { Container } from './styles';

export default function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem,
    renderList,
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

  return (
    <Container>
      {renderList((message, { isLeaving, animetedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animetedRef={animetedRef}
        />
      ))}
    </Container>
  );
}
