import PropTypes from 'prop-types';
import Button from '../Button';

import { Overlay, Container, Footer } from './styles';

export default function Modal({ danger }) {
  return (
    <Overlay>
      <Container danger={danger}>
        <h1>Title</h1>
        <p>Body</p>

        <Footer>
          <button type="button" className="cancel-button">
            Cancel
          </button>

          <Button type="button" danger={danger}>
            Delete
          </Button>
        </Footer>
      </Container>
    </Overlay>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
