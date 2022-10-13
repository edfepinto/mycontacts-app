import PropTypes from 'prop-types';

import Spinner from '../Spinner';

import { Overlay } from './styles';
import ReactPortal from '../ReactPortal';

export default function Loader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <ReactPortal containerId="loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
