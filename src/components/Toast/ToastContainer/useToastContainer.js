import { useState, useEffect, useCallback } from 'react';

import { tostEventManager } from '../../../utils/toast';

export default function useToastContainer() {
  const [messages, setMessages] = useState([]);

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
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ));
  }, []);

  return {
    messages,
    handleRemoveMessage,
  };
}
