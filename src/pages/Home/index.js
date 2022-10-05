import { Link } from 'react-router-dom';

import {
  Container, Header, ListContainer, Card, InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/svg/icons/arrow.svg';
import edit from '../../assets/images/svg/icons/edit.svg';
import trash from '../../assets/images/svg/icons/trash.svg';

export default function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input
          type="text"
          placeholder="Search contact"
        />
      </InputSearchContainer>

      <Header>
        <strong>3 contacts</strong>
        <Link to="/new">New Contact</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Name</span>
            <img src={arrow} alt="ordernation button" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Eduardo Pinto</strong>
              <small>instagram</small>
            </div>
            <span>eduardo@email.com</span>
            <span>(54) 99999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={edit} alt="edit contact" />
            </Link>
            <button type="button">
              <img src={trash} alt="delete contact" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
