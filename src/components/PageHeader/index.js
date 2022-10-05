import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import arrow from '../../assets/images/svg/icons/arrow.svg';

import { Container } from './styles';

export default function PageHeader({ title }) {
  return (
    <Container>
      <Link to="/">
        <img src={arrow} alt="come back" />
        <span>Come Back</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
