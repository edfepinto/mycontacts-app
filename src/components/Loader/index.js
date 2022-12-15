import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';

import useAnimetedUnmount from '../../hooks/useAnimetedUnmount';

import { Overlay } from './styles';

export default function Loader({ isLoading }) {
  const { shouldRender, animetedElementRef } = useAnimetedUnmount(isLoading);

  if (!shouldRender) return null;

  return (
    <ReactPortal containerId="loader-root">
      <Overlay
        isLeaving={!isLoading}
        ref={animetedElementRef}
      >
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
