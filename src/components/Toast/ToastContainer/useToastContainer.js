import { useState, useEffect, useCallback } from 'react';

import { tostEventManager } from '../../../utils/toast';

export default function useToastContainer() {
  const [messages, setMessages] = useState([]);
  const [pendingRemovalMessagesIds, setPendingRemovalMessagesIds] = useState([]);

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
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setPendingRemovalMessagesIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setMessages(
      (prevState) => prevState.filter((message) => message.id !== id),
    );

    setPendingRemovalMessagesIds(
      (prevState) => prevState.filter((messageId) => messageId !== id),
    );
  }, []);

  console.log({ messages, pendingRemovalMessagesIds });

  return {
    messages,
    handleRemoveMessage,
    pendingRemovalMessagesIds,
    handleAnimationEnd,
  };
}
