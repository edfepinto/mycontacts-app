import ToastMessage from '../ToastMessage';

import { Container } from './styles';

import useToastContainer from './useToastContainer';

export default function ToastContainer() {
  const {
    messages,
    handleRemoveMessage,
  } = useToastContainer();

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
