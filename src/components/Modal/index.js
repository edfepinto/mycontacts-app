import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import ReactPortal from '../ReactPortal';

import Button from '../Button';

import { Overlay, Container, Footer } from './styles';

export default function Modal({
  danger,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible,
  isLoading,
}) {
  const [shouldRender, setShouldRender] = useState(visible);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (visible) setShouldRender(true);

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const overlayRefElement = overlayRef.current;

    if (!visible && overlayRefElement) {
      overlayRefElement.addEventListener(
        'animationend',
        handleAnimationEnd,
      );
    }

    return () => {
      if (overlayRefElement) {
        overlayRefElement.removeEventListener(
          'animationend',
          handleAnimationEnd,
        );
      }
    };
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <ReactPortal containerId="modal-root">
      <Overlay
        isLeaving={!visible}
        ref={overlayRef}
      >
        <Container
          danger={danger}
          isLeaving={!visible}
        >
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>

            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  isLoading: false,
};
